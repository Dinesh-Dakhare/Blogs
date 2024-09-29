import React from "react";
import { BsXLg } from "react-icons/bs";
import useBlog from "../Context/BlogContext.jsx";

function Tags({ value }) {
  let {blog,
    blog: { tags },
    setBlog,
  } = useBlog();
  const handleCancelTags = () => {
    tags = tags.filter((t) => t != value);
    setBlog({ ...blog, tags });
  };
  return (
    <div>
      <div className=" p-2 space-x-2 relative border-2 border-black bg-slate-200 rounded-full h-10 flex items-center ">
        <p className="">{value}</p>
        <BsXLg
          className="text-[1rem] mt-1 cursor-pointer "
          onClick={handleCancelTags}
        />
      </div>
    </div>
  );
}

export default Tags;
