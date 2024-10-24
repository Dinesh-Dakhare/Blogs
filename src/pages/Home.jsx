import React, { useEffect, useState } from "react";
import axios from "axios";
import NavigationComponent from "../Component/NavigationComponent.jsx";
import BlogPostCart from "../Component/BlogPostCart.jsx";
import MinimalCart from "../Component/MinimalCart.jsx";
import Loader from "../Component/Loader.jsx";
import MinimalCartSmall from "../Component/MinimalCartSmall.jsx";
import { activeTabRef } from "../Component/NavigationComponent.jsx";
import NoDataMessage from "../Component/NoDataMessage.jsx";
import { BsGraphUpArrow } from "react-icons/bs";
// import { FilterPagination } from "../Component/FilterPagination.js";
function Home() {
  const [blog, setBlog] = useState(null);
  const [trending, setTrending] = useState(null);
  const [headerState, setHeaderState] = useState("home");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState();


  const categories = [
    "mindfulness",
    "relationships",
    "technology",
    "climate change",
    "adventure",
    "music",
    "romantic",
  ];

  const getBlog = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/v1/blog/getBlog",
        {
          page,
        }
      );
      if (data) {
        setBlog(data.blog);
        setTotalPages(data.pageNumbers);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getTrendingBlog = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/v1/blog/trending");
      if (res) {
        setTrending(res.data.trending);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleTagsFilter = async (e) => {
    let category = e.target.innerText;

    setBlog(null);
    if (headerState == category) {
      setHeaderState("home");
      return;
    }
    setHeaderState(category);
  };
  const getCategoryBlog = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/v1/blog/search-blogs",
        { tag: headerState }
      );
      if (res) {
        setBlog(res.data.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handlePagenation = (el) => {
 
    setPage(el);
  };
  const handlePreviewsPage = () => {
setPage(page-1)
    
  };
  const handleNextPage = ()=>{
    setPage(page+1)
  }
  useEffect(() => {
    activeTabRef.current.click();
    if (headerState == "home") {
      getBlog();
    } else {
      getCategoryBlog();
    }
    if (!trending) {
      getTrendingBlog();
    }
  }, [headerState, page]);

  return (
    <>
      <section className="w-full p-24 flex gap-5">
        <div className="w-10/12">
          <NavigationComponent
            className="relative"
            route={[headerState, "Trending"]}
            defaultTab={["Trending"]}
          >
            {blog == null ? (
              <Loader />
            ) : blog.length ? (
              blog.map((blogs, i) => {
                return (
                  <BlogPostCart
                    key={i}
                    content={blogs}
                    auth={blogs.author.personal_info}
                  />
                );
              })
            ) : (
              <NoDataMessage message="No Blog Published" />
            )}

            {trending == null ? (
              <h1>null</h1>
            ) : trending.length ? (
              trending.map((trend, i) => {
                return (
                  <MinimalCart
                    key={i}
                    content={trend}
                    auth={trend.author.personal_info}
                    index={i}
                  />
                );
              })
            ) : (
              <NoDataMessage />
            )}
          </NavigationComponent>
        </div>
        <div className="w-4/12">
          <div className="space-y-3 h-[17rem]">
            <h1 className="text-xl font-medium">Stories of the world</h1>
            <div className="flex gap-7 flex-wrap">
              {categories.map((category, i) => {
                return (
                  <button
                    onClick={handleTagsFilter}
                    className={
                      "p-2 space-x-2  border-2 border-black bg-slate-200 rounded-full h-10 flex items-center" +
                      (headerState == category ? "text-red-800 shadow-xl" : " ")
                    }
                    key={i}
                  >
                    {category}
                  </button>
                );
              })}
            </div>
          </div>
          <div>
            <h1 className="text-2xl font-medium flex gap-5 items-center">
              <p>Tending</p>
              <BsGraphUpArrow />
            </h1>
            {trending == null ? (
              <h1>null</h1>
            ) : trending.length ? (
              trending.map((trend, i) => {
                return (
                  <MinimalCartSmall
                    key={i}
                    content={trend}
                    auth={trend.author.personal_info}
                    index={i}
                  />
                );
              })
            ) : (
              <NoDataMessage />
            )}
          </div>
        </div>
      </section>
      <div className="flex justify-center">
        <button onClick={handlePreviewsPage}>left</button>
        {totalPages &&
          totalPages.map((el, i) => {
            return (
              <button
                className="p-3 border-2 m-2"
                key={i}
                onClick={() => handlePagenation(el)}
              >
                {el}
              </button>
            );
          })}
        <button onClick={handleNextPage}>right</button>
      </div>
    </>
  );
}

export default Home;
