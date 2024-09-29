import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../assets/authContext.jsx";
import { BsBell } from "react-icons/bs";

import UserNavigationPanel from "./UserNavigationPanel.jsx";
function Header() {
  const {
    userAuth,
    userAuth: { token, profile_img },
  } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const handleDropDown = () => {
    setIsOpen(!isOpen);
  };
  return (
    <section className="font-medium text-center text-xl text-white bg-[#2C2D42] px-10 h-[4rem] flex gap-5 justify-between justify-item-center items-center ">
      <div>
        <NavLink to={"/"}>Blogger</NavLink>
      </div>
      <nav>
        <ul className="flex gap-5 ml-[8rem]">
          <NavLink to={"/business"}>Business</NavLink>
          <NavLink to={"/entertainment"}>Entertainment</NavLink>
          <NavLink to={"/finance"}>Finance</NavLink>
          <NavLink to={"/life"}>Life</NavLink>
          <NavLink to={"/political"}>Political</NavLink>
          <NavLink to={"/sport"}>Sport</NavLink>
          <NavLink to={"/health"}>Health</NavLink>
        </ul>
      </nav>
      <div>
        <ul className="flex gap-5">
          <h1>Q</h1>
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
                  <UserNavigationPanel value={isOpen}/>
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
