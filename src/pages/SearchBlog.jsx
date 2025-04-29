import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { BsPerson } from "react-icons/bs";
import axios from "axios";
import NavigationComponent from "../Component/NavigationComponent.jsx";
import Loader from "../Component/Loader.jsx";
import NoDataMessage from "../Component/NoDataMessage.jsx";
import BlogPostCart from "../Component/BlogPostCart.jsx";
import UserCard from "../Component/UserCard.jsx";

function SearchBlog() {
  const [blog, setBlog] = useState(null);
  const [user, setUser] = useState(null);

  // const [page, setTotalPages] = useState(1);
  let { query } = useParams();
  const getCategoryBlog = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/v1/blog/search-blogs",
        { query }
      );
      if (res) {
        setBlog(res.data.category);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getUser = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/v1/user/getuser",
        { query }
      );
      if (data) {
        setUser(data.user);
        console.log(data.user);
        
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCategoryBlog();
    getUser();
  }, [query]);

  return (
    <>
      <section className="w-full p-24 flex gap-5">
        <div className="w-10/12 space-y-2">
          <NavigationComponent
            className="relative"
            route={[`search Result for "${query}"`, "Account Matched"]}
            defaultTab={["Account Matched"]}
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

            {user == null ? (
              <Loader />
            ) : user.length ? (
              user.map((user, i) => {
                return <UserCard content={user} key={i} />;
              })
            ) : (
              <NoDataMessage />
            )}
          </NavigationComponent>
        </div>
        <div className="w-4/12 min-w-[40% lg:min-w-[350px] max-w-min max-md:hidden">
          <div className="space-y-3 h-[17rem]">
            <div className="flex ms-2 items-center gap-5 ">
              <h1 className="text-xl font-medium">User related to search</h1>
              <BsPerson className="text-xl" />
            </div>
            <div className="flex gap-7 flex-wrap">
              {user == null ? (
                <h1>null</h1>
              ) : user.length ? (
                user.map((user, i) => {
                  return <UserCard content={user} key={i} />;
                })
              ) : (
                <NoDataMessage />
              )}
            </div>
          </div>

          {/* <div>
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
          </div> */}
        </div>
      </section>
      {/* <div className="flex justify-center">
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
      </div> */}
    </>
  );
}

export default SearchBlog;
