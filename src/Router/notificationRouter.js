import express from "express";
import {
  getNewNotification,
  getNotification,
} from "../Controller/notificationController.js";
import { protectRoute } from "../middleware/protect.js";

const notification = express.Router();

notification.route("/new-notification").get(protectRoute, getNotification);
notification.route("/get-notification").post(protectRoute, getNewNotification);

export default notification;
