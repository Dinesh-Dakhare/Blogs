import React, { useCallback, useContext, useState, useEffect } from "react";
import axios from "axios";
import blogBanner from "../Image/blogBanner.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Tags from "../Component/Tags.jsx";
import useBlog from "../Context/BlogContext.jsx";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../assets/authContext.jsx";
function BlogForm2() {
  const navigate = useNavigate();
  let {
    blog,
    blog: { title, banner, des, content, tags },
    setBlog,
  } = useBlog();
  const {
    userAuth: { token },
  } = useContext(AuthContext);
  let tagLimit = 10;
  const [taglimit, setTagLimit] = useState(tagLimit);
  const { blog_id } = useParams();

  // for enter key on title
  const handleTitleKeyDown = (e) => {
    if (e.keyCode == 13) {
      e.preventDefault();
    }
  };
  //for remove scroll bar
  const handleTitleChange = (e) => {
    let input = e.target;
    input.style.height = "auto";
    input.style.height = input.scrollHeight + "px";
    setBlog({ ...blog, title: e.target.value });
  };
  //}
  // taglimit useState is use because it is and condition and i need global variable to click the statement.
  const handleTags = (e) => {
    if (e.keyCode === 188 || e.keyCode === 13) {
      e.preventDefault();
      let tag = e.target.value.trim();
      if (tags.length < taglimit && !tags.includes(tag) && tag.length) {
        setBlog({ ...blog, tags: [...tags, tag] });
        e.target.value = "";
      }
    }
  };

  //form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title) toast.error("title is required");
    if (!des) toast.error("description is required");
    if (!tags) toast.error("tags is required");

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("des", des);
    formData.append("banner", banner);
    formData.append("tags", tags);
    formData.append("Id", blog_id);

    let loadingToast = toast.loading("Publishing....");
    try {
      const res = await axios.post(
        "http://localhost:5000/api/v1/blog/createBlog",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res) {
        toast.dismiss(loadingToast);
        toast.success("blog create sucessfully");
        setTimeout(() => {
          navigate("/");
        }, 500);
        setBlog(" ");
      }
    } catch (error) {
      toast.dismiss(loadingToast);
      console.log(error);
    }
  };
  const getBlogData = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/v1/blog/getBlog",
        { blog_id: blog_id }
      );
      if (data) {
        setBlog({
          title: data.blog.title,
          des: data.blog.des,
          content: data.blog.content,
          tags: data.blog.tags,
          // banner: data.blog.banner,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (blog_id) {
      getBlogData();
    }
  }, []);

  return (
    <section>
      <form
        action=""
        className=" mx-auto max-w-[900px] w-full mt-5"
        onSubmit={handleSubmit}
      >
        <div className=" relative aspect-video border-2 shadow-lg border-black">
          <label htmlFor="imgInput">
            {banner && (
              <img
                src={URL.createObjectURL(banner)}
                alt="img for blog"
                className="z-20"
              />
            )}
            {!banner && (
              <img src={blogBanner} alt="img for blog" className="z-20" />
            )}
            {/* {banner ? (
              <img
                src={URL.createObjectURL(banner)}
              
                alt="img for blog"
                className="z-20"
              />
            ) : (
              <img src={blogBanner} alt="img for blog" className="z-20" />
            )} */}
            <input
              id="imgInput"
              type="file"
              name="banner"
              hidden
              accept=".jpg,.png,.jpeg"
              onChange={(e) => setBlog({ ...blog, banner: e.target.files[0] })}
            />
          </label>
        </div>
        <textarea
          id=""
          placeholder="Blog Title"
          className="text-4xl p-2 shadow-md border-2 font-medium w-full outline-none resize-none mt-10 leading-tight"
          onKeyDown={handleTitleKeyDown}
          onChange={handleTitleChange}
          value={title}
          required
        ></textarea>
        <hr className="w-full opacity-10 my-5" />
        <div id="text-editor">
          <textarea
            type="text"
            placeholder="Content..."
            value={content}
            onChange={(e) => setBlog({ ...blog, content: e.target.value })}
            className="bg-gray-200 w-full h-[20rem]  rounded-md p-5 hover:bg-opacity-50 hover:border-2 text-black"
          />
        </div>
        <div>
          <label htmlFor="Description">
            Description about your Blog
            <textarea
              id="Description"
              placeholder="Description"
              type="text"
              defaultValue={des}
              className="bg-gray-200 w-full h-[20rem] shadow-md  rounded-md p-5 hover:bg-opacity-50 hover:border-2 text-black"
              onChange={(e) => setBlog({ ...blog, des: e.target.value })}
            />
          </label>
        </div>
        <div className="bg-gray-200 p-5 my-5">
          <label htmlFor="tags" className="text-xl shadow-md ">
            Tags
            <input
              type="text"
              id="tags"
              className="bg-gray-100 w-full rounded-xl shadow-md p-[1rem] mb-5 "
              onKeyDown={handleTags}
              max="8"
            />
            <h1></h1>
          </label>
          <div className="flex space-x-3">
            {tags &&
              tags.map((tag, i) => {
                return <Tags value={tag} key={i} />;
              })}
          </div>
        </div>
        <div>
          <button className="bg-black text-white p-2 rounded-xl w-28 mb-5">
            Publish
            <ToastContainer position="top-center" />
          </button>
        </div>
      </form>
    </section>
  );
}

export default BlogForm2;
