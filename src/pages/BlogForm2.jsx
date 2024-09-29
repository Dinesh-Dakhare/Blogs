import React, { useCallback, useState } from "react";
import axios from "axios";
import blogBanner from "../Image/blogBanner.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Tags from "../Component/Tags.jsx";
import useBlog from "../Context/BlogContext.jsx";
import { useNavigate } from "react-router-dom";

function BlogForm2() {
  const navigate = useNavigate();
  let {
    blog,
    blog: { title, banner, des, content, tags },
    setBlog,
  } = useBlog();

  const tagLimit = 10;

  //{
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
  const handleTags = (e) => {
    if (e.key == "," || e.key == "Enter") {
      e.preventDefault();
      let tag = e.target.value;
      if (tags.length < tagLimit) {
        if (!tags.includes(tag) && tag.length) {
          setBlog({ ...blog, tags: [...tags, tag] });
        }
        e.target.value = " ";
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

    console.log(formData);

    try {
      const res = await axios.post(
        "http://localhost:5000/api/v1/blog/createBlog",
        formData
      );
      console.log(res);

      if (res) {
        toast.success("blog create sucessfully");
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <section>
      <form
        action=""
        className=" mx-auto max-w-[900px] w-full mt-5"
        onSubmit={handleSubmit}
      >
        <div className=" relative aspect-video border-2 shadow-lg border-black">
          <label htmlFor="imgInput">
            {banner ? (
              <img
                src={URL.createObjectURL(banner)}
                alt="img for blog"
                className="z-20"
              />
            ) : (
              <img src={blogBanner} alt="img for blog" className="z-20" />
            )}
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
          required
        ></textarea>
        <hr className="w-full opacity-10 my-5" />
        <div id="text-editor">
          <textarea
            type="text"
            placeholder="Content..."
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
              // onChange={(e) => setDes(e.target.value)}
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
