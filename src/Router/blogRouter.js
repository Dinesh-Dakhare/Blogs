import express from "express";
import {
  createBlog,
  getBlog,
  uploadBanner,
} from "./../Controller/blogController.js";
import { protectRoute } from "../middleware/protect.js";
const router = express.Router();

router.route("/createBlog").post(protectRoute, uploadBanner, createBlog);
router.route("/getBlog").get(getBlog);
export default router;
