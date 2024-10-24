import jwt from "jsonwebtoken";
import { nanoid } from "nanoid";
import User from "../Model/User.js";
import { AppError } from "../utility/appError.js";
import bcrypt from "bcrypt";
let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // regex for email
let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/; // regex for password
const catchAsync = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};

const checkUsername = async (email) => {
  let username = email.split("@")[0];
  let userExist = await User.findOne({ "personal_info.username": username });
  userExist ? (username += nanoid().substring(0, 5)) : "";
  return username;
};

export const userRegister = catchAsync(async (req, res, next) => {
  const { fullname, email, password } = req.body;

  if (!emailRegex.test(email)) {
    return next(new AppError("Please enter valid email", 403));
  }
  if (!passwordRegex.test(password)) {
    return next(
      new AppError(
        "Password should be 6 to 20 characters long with a numeric, 1 lowercase and 1 uppercase letters",
        403
      )
    );
  }
  let username = await checkUsername(email);
  const hashedpassword = await bcrypt.hash(password, 12);
  const user = await User.create({
    personal_info: {
      fullname,
      email,
      password: hashedpassword,
      username,
    },
  });
  const token = await user.generateToken(user._id);
  res.status(201).send({
    success: true,
    message: "user Register Successfully",
    token,
    user: {
      fullname: user.personal_info.fullname,
      username: user.personal_info.username,
      profile_img: user.personal_info.profile_img,
    },
  });

  //-------------------------L O G I N  C O N T R O L L E R----------------------
});
export const userLogin = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new AppError("Email and Password are not Valid!", 400));
  }
  const user = await User.findOne({ "personal_info.email": email });

  if (
    !user ||
    !(await user.camparePassword(password, user.personal_info.password))
  ) {
    return next(new AppError("incorrect password", 403));
  }
  const token = user.generateToken(user._id);
  res.status(200).json({
    message: "user login successfully",
    success: true,
    user: {
      token:token,
      fullname: user.personal_info.fullname,
      username: user.personal_info.username,
      profile_img: user.personal_info.profile_img,
    },
  });
});
