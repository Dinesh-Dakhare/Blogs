import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../assets/authContext.jsx";
import { profileDataStructure } from "./UserProfile.jsx";
import { IoPersonOutline } from "react-icons/io5";
import { IoMailOutline } from "react-icons/io5";
import { CiAt } from "react-icons/ci";
import axios from "axios";
export const profileStructure = {
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
function EditProfile() {
  const {
    userAuth: { token, username },
  } = useContext(AuthContext);
  const [profile, setProfile] = useState(profileStructure);
  let {
    personal_info: {
      username: profile_username,
      fullname,
      bio,
      profile_img,
      email,
    },
  } = profile;

  let bioLimit = 150;
  const [charactersLeft, setCharactersLeft] = useState(bioLimit);
  const getuserprofile = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/v1/user/getuserprofile",

        { username: username }
      );
      if (data) {
        setProfile(data.user);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleCharacterLeft = (e) => {
    setCharactersLeft(bioLimit - e.target.value.length);
  };
  useEffect(() => {
    if (token) {
      getuserprofile();
    }
  }, [token]);
  return (
    <>
      <section className=" lg:flex space-x-[12rem]">
        <div className="flex justify-center relative lg:justify-start max-md:justify-center">
          <label
            htmlFor="uploading"
            className="relative block w-48 h-48 rounded-full overflow-hidden"
          >
            <div className="w-full h-full absolute top-0 left-0 flex justify-center items-center text-white bg-slate-400 opacity-0 hover:opacity-100 cursor-pointer">
              Uploading img
            </div>
            <img src={profile_img} />
          </label>
          <input type="file" id="uploading" accept="jpeg,.png,.jpg" hidden />
          <button className="absolute top-[15rem] left-6 h-10 px-10 rounded-full bg-slate-300 border-2 border-slate-700">
            upload
          </button>
        </div>
        <form action="" className="w-full mt-5 border-4 p-2 space-y-5 max-lg:mt-32">
          {/* username email adress */}
          <div className="flex space-x-10">
            <div className="w-1/2 relative">
              <IoPersonOutline className="absolute top-3 left-2" />
              <input
                type="text"
                value={fullname}
                className="py-2 pl-8 pr-2 w-full  bg-slate-100 focus:outline-none  rounded-md"
                readOnly
              />
            </div>
            <div className="w-1/2 relative">
              <IoMailOutline className="absolute top-[13px] left-2" />
              <input
                type="text"
                value={profile_username}
                className="py-2 pl-8  w-full bg-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md"
              />
            </div>
          </div>
          <div className="relative">
            <CiAt className="absolute top-[13px] left-2" />
            <input
              type="text"
              id="usernameID"
              value={email}
              className="py-2 pl-8 pr-2  w-full bg-slate-100 focus:outline-none  rounded-md"
              readOnly
            />
            <label htmlFor="usernameID">
              Username will use to search user and will be visible to all users
            </label>
          </div>
          <div>
            <textarea
              name=""
              id="bioId"
              className="w-full bg-slate-200 h-[12rem] placeholder:pl-2  p-2 "
              placeholder="Bio"
              onChange={handleCharacterLeft}
            ></textarea>
            <label htmlFor="bioId">{charactersLeft} worlds left</label>
          </div>
        </form>
      </section>
    </>
  );
}

export default EditProfile;
