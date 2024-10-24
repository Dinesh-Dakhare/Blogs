import { nanoid } from "nanoid";
import blogSchema from "../Model/Blog.js";
import multer from "multer";
import { AppError } from "../utility/appError.js";
import { catchAsync } from "./../utility/catchAsync.js";
import Blog from "../Model/Blog.js";
import User from "../Model/User.js";

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
  let { title, des, content, tags, draft } = req.body;
  tags = Array.isArray(tags) ? tags : tags.split(",");
  const banner = req.file.filename;
  const author = req.user.id;
  let blog_id =
    title
      .replace(/[^a-zA-Z0-9]/g, " ")
      .replace(/\s+/g, "-")
      .trim() + nanoid();

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
  let { page } = req.body;
  let blogLimit = 5;

  const blog = await Blog.find()
    .populate(
      "author",
      "personal_info.profile_img personal_info.username personal_info.fullname -_id"
    )
    .sort({ publishedAt: -1 })
    .select("blog_id title des banner activity tags publishedAt -_id ")
    .skip((page - 1) * blogLimit)
    .limit(blogLimit);
  const count = await Blog.countDocuments({ draft: false });
  const totalPage =  Math.ceil(count / blogLimit)
  const pageNumbers = Array.from({ length: totalPage }, (_, index) => index + 1);
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
  let { tag } = req.body;

  let findQuery = { tags: { $in: [tag] }, draft: false };

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
