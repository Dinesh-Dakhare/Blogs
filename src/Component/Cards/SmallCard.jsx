import React from "react";
import blogBanner from "../../Image/blogBanner.png";
function SmallCard() {
  return (
    <div className="flex p-5 ">
      <img src={blogBanner} alt="" className=" w-[10rem]  bg-black" />
      <div className="">
        <h1>title</h1>
        <p>date</p>
      </div>
    </div>
  );
}

export default SmallCard;
