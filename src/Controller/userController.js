import User from "../Model/User.js";
import { catchAsync } from "../utility/catchAsync.js";

export const getUser = catchAsync(async (req, res, next) => {
  const { query } = req.body;

  const user = await User.find({
    "personal_info.username": new RegExp(query, "i"),
  })
    .limit(50)
    .select(
      "personal_info.fullname personal_info.username personal_info.profile_img -_id"
    );
  res.status(200).json({
    success: true,
    message: " message get successfully",
    user,
  });
});

export const getuserprofile = catchAsync(async (req, res, next) => {
  const { username } = req.body;
 console.log(username);
 

  const user = await User.findOne({
    "personal_info.username": username,
  }).select("-personal_info.password _id -updatedAt -blogs -google_auth");
  res.status(200).json({
    success: true,
    message: " message get successfully",
    user,
  });
});
