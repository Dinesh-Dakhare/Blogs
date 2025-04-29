import React from "react";
import { NavLink } from "react-router-dom";

function userCard({ content }) {
  const {
    personal_info: { fullname, username, profile_img },
  } = content;
  return (
    <NavLink to={`/user/${username}`}>
      <div className="p-2  border-2 flex gap-4 items-center rounded-lg w-[20rem]">
        <img src={profile_img} alt="" className="h-10 rounded-full" />
        <div className="">
          <p>@{username}</p>
          <p>{fullname}</p>
        </div>
       
      </div>
    </NavLink>
  );
}

export default userCard;
