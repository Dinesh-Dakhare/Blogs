import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../assets/authContext.jsx";
import { BlogPageContext } from "../pages/BLogs.jsx";
import axios from "axios";
function CommentField({ action }) {
  const [comment, setComment] = useState("");
  const [newCommentArr, setNewCommentArr] = useState([]);
  const {
    userAuth: { token, username, fullname, profile_img },
    setUserAuth,
  } = useContext(AuthContext);
  const {
    singleBlog,
    singleBlog: {
      _id,
      author: { _id: blog_author },
      comments,
      activity,
      activity: { total_comments, total_parent_comments },
    },
    setSingleBlog,
    setTotalParentCommentsLoaded,
  } = useContext(BlogPageContext);
  const handlerCommant = async () => {
    if (!token) {
      return alert("please  first login to command...");
    }
    if (!comment.length) {
      return alert("write something to leave a comment...");
    }
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/v1/blog/add-comment",
        {
          _id,
          comment,
          blog_author,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (data) {
        console.log(data);
        setComment(" ")
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleGetComment = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/v1/blog/get-blog-comment",
        {
          blog_id: _id,
        }
      );
      if (data) {
        console.log(data.comment);
        setNewCommentArr(data.comment);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleGetComment();
  }, [comment]);
  return (
    <div className="">
      {newCommentArr.map((data) => {
        const {_id,comment,commentedAt,commented_by:{personal_info:{profile_img}}}=data
        return (
          <>
            <div className="mb-4  border-2 rounded-2xl p-2" key={_id}>
             {
              console.log(data)
              
             }
              <div className="flex items-center">
                <img
                  src={profile_img}
                  alt={fullname}
                  className="w-8 h-8 rounded-full mr-2"
                />
                <div>
                  <span className="font-semibold">{fullname}</span>

                  <span className="text-gray-500">{commentedAt}</span>
                </div>
              </div>
              <p className="mt-2">{comment}</p>
            </div>
            <div className="flex items-center mt-2"></div>
          </>
        );
      })}
      <div className="fixed bottom-0 p-4 w-[25rem]">
        <div className="flex items-center border rounded-2xl p-2">
          <img
            src={profile_img} // Replace with actual image path
            alt="Profile Image"
            className="w-8 h-8 rounded-full mr-2"
          />
          <input
            type="text"
            placeholder="Add a comment..."
            className="flex-grow mr-2 border-none"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button className="bg-blue-500 hover:bg-blue-700  rounded-full p-2" onClick={handlerCommant}></button>
        </div>
      </div>
    </div>
  );
}

export default CommentField;
