import express from "express";
import {
  allLatestBlogsCount,
  createBlog,
  getBlog,
  getCategory,
  getTrending,
  uploadBanner,
  getBlogAndUpadate,
  likeBlog,
  getLikeBlog,
  commentBlog,
  getBlogComment,
  getAuthorBlog,
} from "./../Controller/blogController.js";
import { protectRoute } from "../middleware/protect.js";
const router = express.Router();

router.route("/createBlog").post(protectRoute, uploadBanner, createBlog);
router.route("/getBlog").post(getBlog);
router.route("/getAuthorBlog").get(protectRoute,getAuthorBlog);
router.route("/all-latest-blogs-count").post(allLatestBlogsCount);
router.route("/trending").get(getTrending);
router.route("/search-blogs").post(getCategory);
router.route("/blogs").post(getBlogAndUpadate);
router.route("/likeblog").post(protectRoute, likeBlog);
router.route("/getlikeblog").post(protectRoute, getLikeBlog);
router.route("/add-comment").post(protectRoute, commentBlog);
router.route("/get-blog-comment").post(getBlogComment);

export default router;
