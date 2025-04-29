import express from "express";
import {
  userRegister,
  userLogin,
  changePassword,
} from "../Controller/userAuth.js";
import { protectRoute } from "../middleware/protect.js";
const router = express.Router();

const auth = router.post("/register", userRegister).post("/login", userLogin);
router.route("/change-password").post(protectRoute, changePassword);

export default auth;
