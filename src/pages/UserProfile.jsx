import React, { useState, useEffect, useContext } from "react";
import { NavLink, useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../assets/authContext.jsx";
import Loader from "../Component/Loader";
import UserAbout from "../Component/UserAbout.jsx";
import MinimalCart from "../Component/MinimalCart.jsx";
import BlogPostCart from "../Component/BlogPostCart.jsx";

export const profileDataStructure = {
  personal_info: {
    fullname: "",
    username: "",
    profile_img: "",
    bio: "",
  },
  account_info: {
    total_posts: 0,
    total_blogs: 0,
  },
  social_linkks: {},
  joinedAt: " ",
};
function UserProfile() {
  const {
    userAuth,
    userAuth: { username },
  } = useContext(AuthContext);
  const { id: profileId } = useParams();
  const [userProfile, setUserProfile] = useState(profileDataStructure);
  const [loading, setLoading] = useState(true);
  const [author, setAuthor] = useState();
  const {
    personal_info: { fullname, username: profile_username, profile_img, bio },
    account_info: { total_posts, total_reads },
    social_links,
    joinedAt,
  } = userProfile;
  const getUserProfile = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/v1/user/getuserprofile",
        { username: profileId }
      );
      if (data) {
        setUserProfile(data.user);
        getBlog({user_id:data.user._id});
        console.log({user_id:data.user._id});
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getBlog = async ({user_id}) => {
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/v1/blog/search-blogs",
        { author:user_id }
      );
      if (data) {
        setAuthor(data.category)
        console.log(data.category);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    resetData();
    getUserProfile();
  }, [profileId]);
  const resetData = () => {
    setUserProfile(profileDataStructure);
    setLoading(false);
  };
  return (
    <section className="flex w-full p-24">
      <div>
      {
    author?author.map((author,i)=>{
      return<BlogPostCart
      key={i}
      content={author}
      auth={author.author.personal_info}
    />
    }):<Loader/>
  }
      </div>

      {loading ? (
        <Loader />
      ) : (
        <section className="p-5">
          <div className="flex flex-row-reverse p-2 m-10 ">
            <div className=" space-y-2 flex-col  justify-items-center border w-[22rem] p-6">
              <img
                src={profile_img}
                alt="Profile-Img"
                className="w-48 h-48 rounded-full"
              />
              <h1>@{profile_username}</h1>
              <h2>{fullname}</h2>
              <div className="flex space-x-2">
                <p>Read:{total_reads}</p>
                <p>Blog:{total_posts}</p>
              </div>
              <div className="pt-4">
                {username === profile_username ? (
                  <NavLink className="border py-2 px-10 rounded-full border-slate-700 hover:text-blue-800 hover:border-blue-700">
                    Edit
                  </NavLink>
                ) : (
                  " "
                )}
              </div>
              <UserAbout
                bio={bio}
                joinedAt={joinedAt}
                social_links={social_links}
              />
            </div>
          </div>
        </section>
      )}
    </section>
  );
}

export default UserProfile;
