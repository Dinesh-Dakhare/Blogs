import { AppError } from "../utility/appError.js";
import { promisify } from "util";
import { catchAsync } from "../utility/catchAsync.js";
import User from "../Model/User.js";
import jwt from "jsonwebtoken";
const protectRoute = catchAsync(async (req, res, next) => {
  //   let token;
  //   if (
  //     req.headers.authorization &&
  //     req.headers.authorization.startsWith("Bearer")
  //   ) {
  //     token = req.headers.authorization.split(" ")[1];
  //   }
  //   if (!token) {
  //     return next(
  //       new AppError("You are not login in please login to get access", 401)
  //     );
  //   }
  //   // const decoded = await promisify(jwt.verify)(token, process.env.SECRET_KEY);
  //   // console.log(decoded);
  //   // next();

  // //   jwt.verify(token, process.env.SECRET_KEY);
  // next()
  let token;
  if (
    req.headers.authorization ||
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(
      new AppError("you are not logged in please login to get access", 401)
    );
  }

  const decoded = await promisify(jwt.verify)(token, process.env.SECRET_KEY);
  console.log(decoded);

  const freshUser = await User.findById(decoded.id);
  console.log(freshUser);
  // check if user still exists
  if (!freshUser) {
    next(
      new AppError("The user belonging to this token does no longer exist", 401)
    );
  }
  // check if user changed password after the token was issued  

   
  req.user = freshUser;

  next();
});

export { protectRoute };
