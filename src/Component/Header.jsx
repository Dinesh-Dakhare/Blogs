import React, { useContext, useState } from "react";
import { NavLink,useNavigate } from "react-router-dom";
import { AuthContext } from "../assets/authContext.jsx";
import { BsBell } from "react-icons/bs";

import UserNavigationPanel from "./UserNavigationPanel.jsx";
function Header() {
  const navigation =useNavigate()
  const {
    userAuth,
    userAuth: { token, profile_img },
  } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const handleDropDown = () => {
    setIsOpen(!isOpen);
  };
  const handleSearchInput = (e)=>{
let query= e.target.value
navigation(`/search/${query}`)

  }
  return (
    <section className="font-medium text-center text-xl text-white bg-[#2C2D42] px-10 h-[4rem] flex gap-5 justify-between justify-item-center items-center ">
      <div>
        <NavLink to={"/"}>Blogger</NavLink>
      </div>

      <div>
        <ul className="flex gap-5">
          <div><input type="text"className="rounded-xl px-2 placeholder:text-sm" placeholder="Search" onKeyDown={handleSearchInput}/></div>
          <h1>|</h1>
          {token ? (
            <>
              <NavLink to={"/dashboard/notification"} className="mt-2">
                <BsBell />
              </NavLink>
              <NavLink
                to={"/dashboard/profile"}
                className="mt=[2px] bg-black w-8 h-8 rounded-full relative "
                onClick={handleDropDown}
              >
                <div>
                  <img
                    src={profile_img}
                    alt="profile img"
                    className="rounded-full"
                  />
                  <UserNavigationPanel value={isOpen} />
                </div>
              </NavLink>
            </>
          ) : (
            <>
              <NavLink to={"/login"}>Login</NavLink>
              <NavLink to={"/Register"}>Register</NavLink>
            </>
          )}
        </ul>
      </div>
    </section>
  );
}

export default Header;
