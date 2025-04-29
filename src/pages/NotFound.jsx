import React from "react";
import NotFoundImg from "../Image/404.png";
import { NavLink } from "react-router-dom";
function NotFound() {
  return (
    <>
      <div>
        <div className="flex justify-center items-center">
        <div>
        <img src={NotFoundImg} alt="" />
        <div className="flex justify-center items-center">
        <h1 className="font-medium">PAGE NOT FOUND</h1>

        </div>
        <h1 className="text-sm">
          the page you are looking for is not exit.Please Head back to <NavLink to={"/"} className="text-blue-700 ">home page.</NavLink> 
        </h1>
        </div>
        </div>
      </div>
      <div className="flex justify-center items-center mt-[12rem] pb-5">
        <div>
        <img src="" alt="" />
        <div className="flex justify-center items-center">
          <h1 className="text-xl font-semibold">Blog</h1>
          <p className="mt-1">count</p>
        </div>
        <h1 className="text-sm">read millions of stories around the world</h1>
        </div>
      </div>
    </>
  );
}

export default NotFound;
