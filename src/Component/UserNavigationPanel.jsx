import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { BsFileEarmarkText } from "react-icons/bs";
import { AuthContext } from "../assets/authContext.jsx";
import { removeFromSession } from "../assets/sessionData.js";
function UserNavigationPanel({value}) {
  const {
    userAuth: { username },
    setUserAuth,
  } = useContext(AuthContext);
  const signoutUser = () => {
    removeFromSession("user");
    setUserAuth({ token: null });
  };
  return (
    <div className={`bg-white flex-col justify-start items-center p-1  w-[9rem] border rounded-lg absolute right-0 top-14 shadow-xl ${value?'block':'hidden'}`}>
      <NavLink className="flex  gap-2 hover:bg-slate-300 items-center p-2" to={'/blog/edit'}>
        <BsFileEarmarkText className="text-black" />
        <p className="text-stone-700 ">write</p>
      </NavLink>
      <NavLink
        to={`/user/${username}`}
        className="hover:bg-slate-300 text-black font-normal me-16"
      >
        Profile
      </NavLink>
      <br />
      <NavLink
        to={`/settings/dashboard/blogs`}
        className="hover:bg-slate-300 text-black font-normal me-[1.7rem]"
      >
        Dashboard
      </NavLink>
      <br />
      <NavLink
        to={"/settings"}
        className="hover:bg-slate-300 text-black font-normal me-16"
      >
        setting
      </NavLink>

      <NavLink onClick={signoutUser}>
        <button className="text-black pt-1 hover:bg-slate-300">
          <h1 className="me-12 ">Sign out</h1>
          <p className="me-8">{username}</p>
        </button>
      </NavLink>
     
    </div>
  );
}

export default UserNavigationPanel;
