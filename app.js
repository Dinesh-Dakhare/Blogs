import auth from "./src/router/auth.js";
import express from "express";
import connectDb from "./src/database/db.js";
import cors from "cors";
import { errorController } from "./src/Controller/errorController.js";
import router from "./src/Router/blogRouter.js";
import user from "./src/Router/userRouter.js";
import notification from "./src/Router/notificationRouter.js";

//---------------------------------------------- config

const app = express();

app.use(express.json());

app.use(cors());

connectDb();

//-----------------------------------------------routes
app.use("/api/v1/auth", auth);
app.use("/api/v1/blog", router);
app.use("/api/v1/user", user);
app.use("/api/v1/notification",notification)
app.use(errorController);
export default app;
