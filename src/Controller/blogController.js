import { nanoid } from "nanoid";
import blogSchema from "../Model/Blog.js";
import multer from "multer";
import { AppError } from "../utility/appError.js";
import { catchAsync } from "./../utility/catchAsync.js";
import Blog from "../Model/Blog.js";

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
  const { title, des, content, tags } = req.body;
  const banner = req.file.filename;

  let blog_id =
    title
      .replace(/[^a-zA-Z0-9]/g, " ")
      .replace(/\s+/g, "-")
      .trim() + nanoid();
  const blog = await blogSchema.create({
    blog_id,
    title,
    des,
    content,
    tags,
    banner,
  });
  res.status(201).json({
    status: "success",
    message: "blog create successfully",
    data: {
      blog,
    },
  });
});

export const getBlog = catchAsync(async (req, res, next) => {
  const blog = await Blog.find({});

  res.status(201).json({
    status: "success",
    message: "hello",
    blog,
  });
});


