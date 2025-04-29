import axios from "axios";
import React, { useState, useContext } from "react";
import { useEffect } from "react";
import { AuthContext } from "../assets/authContext.jsx";
import UserBLogs from "../Component/UserBLogs.jsx";
import Loader from "../Component/Loader";
import NoDataMessage from "../Component/NoDataMessage.jsx";
const Dashboard = () => {
  const {
    userAuth: { token },
  } = useContext(AuthContext);
  const [userBlogs, setUserBlogs] = useState(null);

  const getUserBlog = async () => {
    console.log("H E L L O");

    const res = await axios.get(
      "http://localhost:5000/api/v1/blog/getAuthorBlog",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (res.status === 200) {
      setUserBlogs(res.data.blog.blogs);
    }
  };
  useEffect(() => {
    if (token) {
      getUserBlog();
    }
  }, []);

  return (
    <>
      {userBlogs === null ? (
        <Loader />
      ) : userBlogs.length ? (
        userBlogs.map((elem, i) => {
          return <UserBLogs key={i} elem={elem} />;
        })
      ) : (
        <NoDataMessage message="No Blog Published" />
      )}
    </>
  );
};

export default Dashboard;
