import React from "react";
import { NavLink } from "react-router-dom";
import { FaPen } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const UserBLogs = ({ elem }) => {
  if (!elem) {
    return null;
  }
  const {
    title,
    des,
    blog_id,
    publishedAt,
    activity: { total_likes, total_comments, total_reads },
    tags,
    banner,
  } = elem;
  return (
    <NavLink
      to={`/blog/${blog_id}`}
      className="w-full m-2 space-y-3 flex gap-16 border-2 p-2 justify-between"
    >
      <div className=" flex space-x-5 items-center">
        <img
          src={`../../multerimg/${banner}`}
          alt="main img"
          className="aspect-square h-42 w-36 "
        />
        <div className="space-x-2 p-2 ">
          <button className="text-2xl border-2 p-2 rounded-full hover:border-green-700 hover:shadow-md hover:shadow-green-800">
            <FaPen />
          </button>
          <button className="text-2xl border-2 p-2 rounded-full hover:border-red-900 hover:shadow-md hover:shadow-red-800">
            <MdDelete />
          </button>
        </div>
      </div>
      <div className="flex space-x-20 w-[24rem] items-center justify-end ">
        <div className="flex-col justify-items-center space-y-2 ">
          <h1 className="text-2xl font-semibold">{total_likes}</h1>
          <h3 className="text-xl font-medium">Likes</h3>
        </div>
        <div className="flex-col justify-items-center space-y-2 ">
          <h1 className="text-2xl font-semibold">{total_comments}</h1>
          <h3 className="text-xl font-medium">Comments</h3>
        </div>
        <div className="flex-col justify-items-center  space-y-2 ">
          <h1 className="text-2xl font-semibold">{total_reads}</h1>
          <h3 className="text-xl font-medium">Reads</h3>
        </div>
      </div>
    </NavLink>
  );
};

export default UserBLogs;
