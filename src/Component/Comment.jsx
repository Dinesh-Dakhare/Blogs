import React from "react";
import { RxCross1 } from "react-icons/rx";
import CommentField from "./CommentField.jsx";
import axios from "axios";

export const fetchComment = async ({
  skip = 0,
  blog_id,
  setParentCommentCountFun,
  comment_array = null,
}) => {
  let res;

  const { data } = await axios.get(
    "http://localhost:5000/api/v1/blog/get-blog-comment",
    {
      blog_id,
      skip,
    }
  );
  if (data) {
    data.map((comment) => {
      comment.childrenLevel = 0;
      setParentCommentCountFun((preVal) => preVal + data.length);
    });
  }
  if (comment_array == null) {
    res = { result: data };
  } else {
    res = { result: [...comment_array, ...data] };
  }
};
function Comment({ commentsWrapper, setCommentsWrapper, title }) {
  return (
    <div
      className={`max-sm:w-full fixed ${
        commentsWrapper ? "top-0 sm:right-0" : "top-[100%] sm:right-[-100%]"
      } duration-700 max-sm:right-0 sm:top-0 w-[30%] min-w-[350px] h-full z-50 bg-white shadow-2xl p-8 px-16 overflow-y-auto overflow-x-hidden`}
    >
      <div className="relative">
        <h1 className="text-x1 font-medium">Comments</h1>

        <p
          className="text-1g mt-2 w-[70%] text-dark-grey
line-clamp-1"
        >
          {title}
        </p>

        <button
          onClick={() => setCommentsWrapper((prev) => !prev)}
          className="absolute top-0 right-0 flex justify-center
items-center w-12 h-12 rounded-full bg-grey"
        >
          <RxCross1 className="fi fi-br-cross text-2x1 mt-1 bg-slate-200 rounded-full" />
        </button>
        <hr className="border-gray-500 my-8 w-[120%] -ml-10" />
        <CommentField action={"Comment"} />
      </div>
    </div>
  );
}

export default Comment;
