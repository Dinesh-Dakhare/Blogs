import React from "react";
import { NavLink } from "react-router-dom";

import { CiHeart } from "react-icons/ci";
import { createDate } from "../assets/date.js";
function BlogPostCart({ content, auth }) {
  const {
    blog_id,
    des,
    title,
    tags,
    banner,
    activity: { total_likes },
    publishedAt,
  } = content;


  const { fullname, username, profile_img } = auth;
  return (
    <NavLink
      to={`/blog/${blog_id}`}
      className="w-full m-2 space-y-3 flex gap-16 "
    >
      <div className="w-[35rem]">
        <div className="flex gap-2 items-center ">
          <img
            src={profile_img}
            alt="profle image"
            className="w-4  h-4 rounded-full "
          />
          <p>
            {fullname}@{username}
          </p>
          <p>{createDate(publishedAt)}</p>
        </div>
        <h1 className="font-semibold text-xl">{title}</h1>
        <p className="line-clamp-2 m leading-7 md:max-[1100px]:hidden max-sm:hidden">
          {des}
        </p>
        <div className="flex items-center space-x-2">
          <span>{tags[0]}</span>
          <span className="flex items-center ">
            <CiHeart className="me-2" />
            {total_likes}
          </span>
        </div>
      </div>
      <div>
        <img
          src={`../multerimg/${banner}`}
          alt="main img"
          className="aspect-square h-32 w-36  "
        />
      </div>
    </NavLink>
  );
}
export default BlogPostCart;
