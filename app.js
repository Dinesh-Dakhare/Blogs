import auth from "./src/router/auth.js";
import express from "express";
import connectDb from "./src/database/db.js";
import cors from "cors";
import { errorController } from "./src/Controller/errorController.js";
import router from "./src/Router/blogRouter.js";
//---------------------------------------------- config

const app = express();

app.use(express.json());

app.use(cors());

connectDb();

//-----------------------------------------------routes
app.use("/api/v1/auth", auth);
app.use("/api/v1/blog", router);

app.use(errorController);
export default app;
