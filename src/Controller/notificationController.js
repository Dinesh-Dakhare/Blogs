import Notification from "../Model/Notification.js";
import { catchAsync } from "../utility/catchAsync.js";
export const getNotification = catchAsync(async (req, res, next) => {
  const { id } = req.user;
  const notification = await Notification.exists({
    notification_for: id,
    seen: false,
    user: { $ne: id },
  });
  if (notification) {
    return res.status(200).json({
      new_notificaiton: true,
    });
  } else {
    return res.status(200).json({
      new_notificaiton: false,
    });
  }
});

export const getNewNotification = catchAsync(async (req, res, next) => {
  const { id } = req.user;
  const { page, filter, deletedDocCount } = req.body;

  console.log("user Id" + id);

  let maxLimit = 10;

  let findQuery = {
    notification_for: id,
    user: { $ne: id },
  };
  let skipDocs = (page - 1) * maxLimit;

  if (filter !== "all") {
    findQuery.type = filter;
  }

  if (deletedDocCount) {
    skipDocs -= deletedDocCount;
  }

  const notification = await Notification.find(findQuery)
    .skip(skipDocs)
    .limit(maxLimit)
    .populate("blog", "title blog_id")
    .populate(
      "user",
      "personal_info.fullname personal_info.username personal_info.profile_img"
    )
    .populate("comment", "comment")
    .populate("replied_on_comment", "comment")
    .populate("reply", "comment")
    .sort({ createdAt: -1 })
    .select("createdAt type seen reply");

  res.status(200).json({
    message: "get notification successfully",
    notification,
  });
});
