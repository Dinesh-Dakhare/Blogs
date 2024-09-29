import React from "react";
import { useEffect } from "react";

import { contextEdite } from "../pages/Editor.jsx";
import NavHeader from "./NavHeader.jsx";
import EditorJS from "@editorjs/editorjs";
import { tools } from "./ToolsEditor.jsx";
function BlogEditor() {
  const {
    blog,
    blog: { title, banner, content, tags, des },
    setBlog,
  } = contextEdite();

  useEffect(() => {
    let editor = new EditorJS({
      holderId: "text-editor",
      data: "",
      tools: tools,
      placeholder: "let's write an awesome story",
    });
  }, []);

  const handleBlogImg = (e) => {
    let img = e.target.files[0];
    setBlog({ banner: { img } });
    console.log(banner);
  };
  const handleTitleKeyDown = (e) => {
    if (e.keyCode == 13) {
      e.preventDefault();
    }
  };
  const handleTitleChange = (e) => {
    let input = e.target;
    input.style.height = "auto";
    input.style.height = input.scrollHeight + "px";
    setBlog({ ...blog, title: input.value });
  };

  return (
    <>
      <NavHeader />
      <section>
        <main className=" mx-auto max-w-[900px] w-full">
          <div className=" relative aspect-video border-4 border-black">
            <label htmlFor="imgInput">
              <img src={demo} alt="img for blog" className="z-20" />
              <input
                id="imgInput"
                type="file"
                accept=".jpg,.png,.jpeg"
                hidden
                onChange={handleBlogImg}
              />
            </label>
          </div>
          <textarea
            name=""
            id=""
            placeholder="Blog Title"
            className="text-4xl font-medium w-full outline-none resize-none mt-10 leading-tight"
            onKeyDown={handleTitleKeyDown}
            onChange={handleTitleChange}
          ></textarea>
          <hr className="w-full opacity-10 my-5" />
          <div id="text-editor"></div>
          {/* <h1>hello:{title.length?title:"new blog"}</h1> */}
        </main>
      </section>
    </>
  );
}

export default BlogEditor;
