import axios from "axios";
import React, { useEffect, useState, useContext, createContext } from "react";
import { NavLink, useParams } from "react-router-dom";
import { createDate, dayMonthYear } from "../assets/date";
import { BsHeart } from "react-icons/bs";
import { BsFillHeartFill } from "react-icons/bs";
import { BiMessageRounded } from "react-icons/bi";
import BlogPostCart from "../Component/BlogPostCart.jsx";
import Loader from "../Component/Loader.jsx";
import { AuthContext } from "../assets/authContext.jsx";
import Comment, { fetchComment } from "../Component/Comment.jsx";
export const blog = {
  title: "",
  des: "",
  content: [],
  author: { personal_info: {} },
  banner: "",
  publishedAt: "",
  activity: { total_likes: " " },
};
export const BlogPageContext = createContext({});
function BLogs() {
  const [singleBlog, setSingleBlog] = useState(blog);
  const [similarBlog, setSimilarBlog] = useState([]);
  const [likeBlog, setLikeBlog] = useState(false);
  const [commentsWrapper, setCommentsWrapper] = useState(false);
  const [totalComment, setTotalComment] = useState(0);
  const [loading, setLoading] = useState(true);
  const [totalParentCommentsLoaded, setTotalParentCommentsLoaded] = useState(0);

  const {
    userAuth: { token },
    setUserAuth,
  } = useContext(AuthContext);
  const {
    _id,
    title,
    des,
    activity: { total_likes, total_comments },
    content,
    author: {
      personal_info: { fullname, username, profile_img },
    },
    banner,
    publishedAt,
  } = singleBlog;
  const { blogId } = useParams();

  const getSingleBlog = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/v1/blog/blogs",
        {
          blog_id: blogId,
        }
      );
      if (data.blog) {
   
      
        
        setSingleBlog(data.blog);
        getSimilarData(data.blog.tags[0], blogId);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getSimilarData = async (tags, blog_id) => {
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/v1/blog/search-blogs",
        {
          tag: tags,
          elimidate: blog_id,
        }
      );
      if (data.category) {
        setSimilarBlog(data.category);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleLike = async () => {
    if (token) {
      setLikeBlog((preLike) => !preLike);
      try {
     
        const { data } = await axios.post(
          "http://localhost:5000/api/v1/blog/likeblog",
          {
            _id,
            likeBlog,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } catch (error) {
        console.log(error);
      }
      
    } else {
      console.log("please login to like this post");
    }
  };
  const getLike = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/v1/blog/getlikeblog",
        {
          _id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (data) {
        setLikeBlog(data.result);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSingleBlog();
    if (token) {
      getLike();
    }
  }, [blogId, token]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <section className="px-14 py-8 space-y-10">
          <BlogPageContext.Provider
            value={{ singleBlog, setSingleBlog, setTotalParentCommentsLoaded }}
          >
            <Comment
              commentsWrapper={commentsWrapper}
              setCommentsWrapper={setCommentsWrapper}
              title={title}
            />
            <div className="space-y-10 text-3xl font-medium">
              <img
                src={`../multerimg/${banner}`}
                className=" m-auto w-4/6"
                alt="Blog_img"
              />
              <h1 className="flex justify-center">{title}</h1>
            </div>
            <div className="flex justify-between h-14 items-center mx-[15rem]">
              <NavLink
                to={`/user/${username}`}
                className="flex space-x-2 h-14 items-center"
              >
                <img className="w-10 rounded-full" src={profile_img} alt="" />
                <div>
                  <h1>{fullname}</h1>
                  <h2>@{username}</h2>
                </div>
              </NavLink>
              <h3>{dayMonthYear(publishedAt)}</h3>
            </div>
            <div className="flex space-x-5 items-center mx-[15rem]">
              <button
                className="flex items-center  gap-3 "
                onClick={handleLike}
              >
                {!likeBlog ? <BsFillHeartFill /> : <BsHeart />}
              
                <p className="text-lg">{total_likes}</p>
              </button>
              <button className="flex justify-center items-center gap-3" onClick={(e) => setCommentsWrapper((prev) => !prev)}>
                <BiMessageRounded />
                <h1>{total_comments}</h1>
              </button>
              {token ? (
                <NavLink to={`/blog/edit/${blogId}`}>Edit</NavLink>
              ) : (
                " "
              )}
              
            </div>
            <div className="px-[14.5rem]">{content}</div>
            <div className="px-20">
              {similarBlog.length ? <h1>Similar Blog</h1> : " "}
              {similarBlog.length
                ? similarBlog.map((blogs, i) => {
                    return (
                      <BlogPostCart
                        key={i}
                        content={blogs}
                        auth={blogs.author.personal_info}
                      />
                    );
                  })
                : " "}
            </div>
          </BlogPageContext.Provider>
        </section>
      )}
    </>
  );
}

export default BLogs;
