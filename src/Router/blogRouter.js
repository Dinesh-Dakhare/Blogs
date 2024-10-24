import express from "express";
import {
  allLatestBlogsCount,
  createBlog,
  getBlog,
  getCategory,
  getTrending,
  uploadBanner,
} from "./../Controller/blogController.js";
import { protectRoute } from "../middleware/protect.js";
const router = express.Router();

router.route("/createBlog").post(protectRoute, uploadBanner, createBlog);
router.route("/getBlog").post(getBlog);
router.route("/all-latest-blogs-count").post(allLatestBlogsCount);
router.route("/trending").get(getTrending);
router.route("/search-blogs").post(getCategory);

export default router;
