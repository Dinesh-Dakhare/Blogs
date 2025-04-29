import React, { useContext, useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../assets/authContext.jsx";
import { BsBell } from "react-icons/bs";

import UserNavigationPanel from "./UserNavigationPanel.jsx";
import axios from "axios";
function Header() {
  const navigation = useNavigate();
  const {
    userAuth,
    userAuth: { token, profile_img, new_notificaiton },
    setUserAuth,
  } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const handleDropDown = () => {
    setIsOpen(!isOpen);
  };
  const handleSearchInput = (e) => {
    let query = e.target.value;
    navigation(`/search/${query}`);
  };

  useEffect(() => {
    const getNotification = async () => {
      const res = await axios.get(
        "http://localhost:5000/api/v1/notification/new-notification",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.status === 200) {
        setUserAuth({ ...userAuth, ...res.data });

      }
    };
    getNotification();
    console.log("🎶" + new_notificaiton);
  }, [token]);

  return (
    <section className="font-medium text-center text-xl text-white bg-[#2C2D42] px-10 h-[4rem] flex gap-5 justify-between justify-item-center items-center ">
      <div>
        <NavLink to={"/"}>Blogger</NavLink>
      </div>

      <div>
        <ul className="flex gap-5">
          <div>
            <input
              type="text"
              className="rounded-xl px-2 placeholder:text-sm text-black text-sm py-1 w-[15rem]"
              placeholder="Search"
              onKeyDown={handleSearchInput}
            />
          </div>
          <h1>|</h1>
          {token ? (
            <>
              <NavLink
                to={"/settings/dashboard/notification"}
                className="mt-2 relative"
              >
                {new_notificaiton ? (
                  <>
                    <BsBell />
                    <span className="bg-red-700 h-2 w-2 rounded-full z-50 absolute top-0"></span>
                  </>
                ) : (
                  <>
                    <BsBell />
                  </>
                )}
              </NavLink>
              <NavLink
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
