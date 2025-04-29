import { nanoid } from "nanoid";
import multer from "multer";
import { AppError } from "../utility/appError.js";
import { catchAsync } from "./../utility/catchAsync.js";
import Blog from "../Model/Blog.js";
import User from "../Model/User.js";
import Notification from "../Model/Notification.js";
import Comment from "../Model/Comment.js";

const multerStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./multerImg");
  },
  filename: function (req, file, cb) {
    const ext = file.mimetype.split("/")[1];
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + "." + ext);
  },
});

const multerFilter = (req, file, cd) => {
  if (file.mimetype.startsWith("image")) {
    cd(null, true);
  } else {
    cd(new AppError("not an imgae!,404"), true);
  }
};
const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

export const uploadBanner = upload.single("banner");

export const createBlog = catchAsync(async (req, res, next) => {
  let { title, des, content, tags, draft, Id } = req.body;

  tags = Array.isArray(tags) ? tags : tags.split(",");
  const banner = req.file.filename;
  const author = req.user.id;
  let blog_id =
    Id ||
    title
      .replace(/[^a-zA-Z0-9]/g, " ")
      .replace(/\s+/g, "-")
      .trim() + nanoid();

  if (Id) {
    await Blog.findOneAndUpdate(
      { blog_id },
      { title, des, content, tags, banner, draft: draft ? draft : false },
      { new: true }
    )
      .then(() => {
        return res.status(200).json({ id: blog_id });
      })
      .catch((err) => {
        return res
          .status(500)
          .json({ error: "Failed to update total posts number" });
      });
  } else {
    const newBlog = new Blog({
      blog_id,
      title,
      des,
      content,
      tags,
      banner,
      author,
      draft: Boolean(draft),
    });
    // to update total post in user schema
    await newBlog.save().then((blog) => {
      let increment = draft ? 0 : 1;
      User.findOneAndUpdate(
        { _id: author },
        {
          $inc: { "account_info.total_posts": increment },
          $push: { blogs: blog._id },
        }
      )
        .then((user) => {
          return res.status(200).json({ id: blog.blog_id }, 200);
        })
        .catch((err) => {
          return next(new AppError("failed to update total post number"), 500);
        });
    });
  }
});
export const allLatestBlogsCount = catchAsync(async (req, res, next) => {
  const count = await Blog.countDocuments({ draft: false });
  res.status(201).json({
    count,
    status: "success",
    message: "sucessfully get the blog count",
  });
});
export const getBlog = catchAsync(async (req, res, next) => {
  let { page, blog_id } = req.body;
  let blogLimit = 5;
  let blog;
  if (blog_id) {
    blog = await Blog.findOne({ blog_id })
      .populate(
        "author",
        "personal_info.profile_img personal_info.username personal_info.fullname -_id"
      )
      .sort({ publishedAt: -1 })
      .select(
        "blog_id title des banner content activity tags publishedAt -_id "
      )
      .skip((page - 1) * blogLimit)
      .limit(blogLimit);
  } else {
    blog = await Blog.find()
      .populate(
        "author",
        "personal_info.profile_img personal_info.username personal_info.fullname -_id"
      )
      .sort({ publishedAt: -1 })
      .select("blog_id title des banner activity tags publishedAt -_id ")
      .skip((page - 1) * blogLimit)
      .limit(blogLimit);
  }
  const count = await Blog.countDocuments({ draft: false });
  const totalPage = Math.ceil(count / blogLimit);
  const pageNumbers = Array.from(
    { length: totalPage },
    (_, index) => index + 1
  );
  res.status(201).json({
    length: blog.length,
    status: "success",
    message: "hello",
    blog,
    pageNumbers,
  });
});

export const getTrending = catchAsync(async (req, res, next) => {
  const trending = await Blog.find()
    .populate("author", "personal_info.username personal_info.fullname -_id")
    .sort({
      "activity.total_read": -1,
      "activity.total_likes": -1,
      publishedAt: -1,
    })
    .select("blog_id title publishedAt -_id")
    .limit(5);
  res.status(201).json({
    status: "success",
    message: "hello",
    trending,
  });
});

export const getCategory = catchAsync(async (req, res, next) => {
  let { tag, query, author, elimidate } = req.body;

  let findQuery;

  if (tag) {
    findQuery = {
      tags: { $in: [tag] },
      blog_id: { $ne: elimidate },
      draft: false,
    };
  } else if (query) {
    findQuery = { draft: false, title: new RegExp(query, "i") };
  } else if (author) {
    findQuery = { draft: false, author };
  }

  const category = await Blog.find(findQuery)
    .populate(
      "author",
      "personal_info.profile_img personal_info.username personal_info.fullname -_id"
    )
    .sort({ publishedAt: -1 })
    .select("blog_id title des banner activity tags publishedAt -_id ")
    .limit(5);
  res.status(201).json({
    length: category.length,
    status: "success",
    message: "get-Category",
    category: category,
  });
});

export const getBlogAndUpadate = catchAsync(async (req, res, next) => {
  const { blog_id } = req.body;

  const increment = 1;

  const blog = await Blog.findOneAndUpdate(
    { blog_id },
    { $inc: { "activity.total_reads": increment } }
  )
    .populate(
      "author",
      "personal_info.fullname personal_info.username personal_info.profile_img"
    )
    .select("title des content banner activity publishedAt blog_id tags");
  const authorUsername = blog.author.personal_info.username;
  await User.findOneAndUpdate(
    { "personal_info.username": authorUsername },
    { $inc: { "account_info.total_reads": increment } }
  );
  res.status(200).json({
    success: true,
    message: " Blog get successfully",
    blog,
  });
});

//Update the like_blog

export const likeBlog = catchAsync(async (req, res, next) => {
  const { id } = req.user;

  const { _id, likeBlog } = req.body;

  let likecount;

  const blog = await Blog.findByIdAndUpdate(
    { _id },
   
    { $inc: { "activity.total_likes": (likecount = likeBlog ? 1 : -1) } },

    { new: true }
  )
    .populate(
      "author",
      "personal_info.fullname personal_info.username personal_info.profile_img"
    )
    .select("title des content banner activity publishedAt blog_id tags");
  if (likeBlog) {
    let like = new Notification({
      type: "like",
      blog: _id,
      notification_for: blog.author,
      user: id,
    });
    await like.save();
    res.status(201).json({
      success: true,
      message: "like the Blog",
      result: true,
    });
  } else {
    like = await Notification.findOneAndDelete({
      user: id,
      type: "like",
      blog: _id,
    });
    res.status(204).json({
      success: true,
      message: "dislike the Blog",
      result: false,
    });
  }
  // res.status(200).json({
  //   success: true,
  //   message: " like the Blog successfully",
  //   blog,
  // });
});

export const getLikeBlog = catchAsync(async (req, res, next) => {
  const { id } = req.user;
  const { _id } = req.body;
  // console.log(_id);
  let like;

  const result = await Notification.findOne({
    user: id,
    type: "like",
    blog: _id,
  });
  if (result) {
    like = true;
  } else {
    like = false;
  }
  // console.log(result);

  res.status(200).json({
    success: true,
    isLiked: like,
  });
});

export const commentBlog = catchAsync(async (req, res, next) => {
  const { id } = req.user;
  const { _id, comment, blog_author } = req.body;
  console.log("❤️" + _id);

  if (!comment.length) {
    return res.status(403).json({ error: "write something to leave" });
  }
  let commentObj = new Comment({
    blog_id: _id,
    blog_author,
    comment,
    commented_by: id,
  });

  await commentObj.save();

  await Blog.findOneAndUpdate(
    { _id },
    {
      $push: { comments: commentObj._id },
      $inc: { "activity.total_comments": 1 },
      "activity.total_parent_comments": 1,
    }
  );

  let notificationObj = {
    type: "comment",
    blog: _id,
    notification_for: blog_author,
    user: id,
    comment: commentObj._id,
  };
  await new Notification(notificationObj).save();

  res.status(200).json({
    success: true,
    message: "comment added successfully",
    comment: commentObj.comment,
    commentedAt: commentObj.commentedAt,
    children: commentObj.children,
    commentObj,
  });
});

export const getBlogComment = catchAsync(async (req, res, next) => {
  const { skip, blog_id } = req.body;
  let maxLimit = 5;

  const comment = await Comment.find({ blog_id })
    .populate(
      "commented_by",
      "personal_info.username personal_info.fullname personal_info.profile_img"
    )
    .skip(skip)
    .limit(maxLimit)
    .sort({ commentedAt: -1 });
  res.status(200).json({
    success: true,
    message: "comment get successfully",
    comment,
  });
});


export const getAuthorBlog = catchAsync(async(req,res,next)=>{

  const {id}=req.user
  /* The statement `console.log(""+id);` is converting the `id` variable to a string and then logging
  it to the console. This is a common way to ensure that the value of `id` is concatenated as a
  string before being output to the console. */
  console.log("👍"+id);
  
  const blog = await User.findOne({_id:id}).populate("blogs")
res.status(200).json({
  success: true,
  message: "Get Author Blog successfully",
  blog,
})

})