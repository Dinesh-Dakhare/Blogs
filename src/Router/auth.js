import express from "express";
import { userRegister, userLogin } from "../Controller/userAuth.js";
const router = express.Router();

const auth = router.post("/register", userRegister).post("/login", userLogin);

export default auth;
