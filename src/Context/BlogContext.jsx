import { createContext, useContext, useState } from "react";

const BlogContext = createContext();

export const BlogContextProvider = ({ children }) => {
  const blogStructure = {
    title: "",
    banner:'',
    content: "",
    tags: [],
    des: "",
    author: { personal_info: {} },
  };
  const [blog, setBlog] = useState(blogStructure);
  return (
    <BlogContext.Provider value={{ blog, setBlog }}>
      {children}
    </BlogContext.Provider>
  );
};

const useBlog = () => useContext(BlogContext);

export default useBlog;
