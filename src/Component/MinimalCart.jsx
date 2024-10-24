import React from "react";
import createDate from "../assets/date.js";
function MinimalCart({ content, auth, index }) {
  const { blog_id, title, publishedAt } = content;
  const { fullname, username, profile_img } = auth;
  return (
    <div className="w-[35rem] m-2 space-y-2 flex gap-10 justify-center items-center ">
      <div>
        <p className="text-[5rem]">
          {index < 10 ? "0" + (index + 1) : index + 1}
        </p>
      </div>

      <div className="w-[35rem]">
        <div className="flex gap-2 items-center ">
          <p>
            {fullname}@{username}
          </p>
          <p>{createDate(publishedAt)}</p>
        </div>
        <h1 className="font-semibold text-xl">{title}</h1>
      </div>
    </div>
  );
}

export default MinimalCart;
