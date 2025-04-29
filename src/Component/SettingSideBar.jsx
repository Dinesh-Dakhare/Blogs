import React, { useContext, useRef, useState } from "react";
import { IoDocumentsOutline } from "react-icons/io5";
import { IoIosNotificationsOutline } from "react-icons/io";
import { IoLockClosedOutline } from "react-icons/io5";
import { FaBarsStaggered } from "react-icons/fa6";
import { CiUser } from "react-icons/ci";
import { TfiWrite } from "react-icons/tfi";
import { Navigate, NavLink, Outlet } from "react-router-dom";
import { AuthContext } from "../assets/authContext";
import { useEffect } from "react";
function SettingSideBar() {
  const {
    userAuth: { token },
  } = useContext(AuthContext);

  let page = location.pathname.split("/")[2];
  const [pageState, setStatePage] = useState(page); //page.replace("-", " "
  const [showShideNav, setShowSideNav] = useState(false);

  const activeTabLine = useRef(); // hr
  const sideBarIconTab = useRef(); // bars
  const pageStateTab = useRef();

  const changePageState = (e) => {
    let { offsetWidth, offsetLeft } = e.target;
    activeTabLine.current.style.width = offsetWidth + "px";
    activeTabLine.current.style.width = offsetLeft + "px";

    if (e.target == sideBarIconTab.current) {
      setShowSideNav(true);
    } else {
      setShowSideNav(false);
    }
  };
  useEffect(() => {
    setShowSideNav(false);
    pageStateTab.current.click();
  }, [pageState]);
  return token === null ? (
    <Navigate to="/register" />
  ) : (
    <>
      <section className="relative flex gap-10 py-0 m-0 max-md:flex-col p-24 ">
        <div className="sticky top-[80px] z-30 font-medium text-xl border-2 w-[22rem] ">
          <div className="md:hidden bg-white py-1 border-b border-grey flex flex-nowrap overflow-x-auto ">
            <button ref={sideBarIconTab} onClick={changePageState}>
              <FaBarsStaggered className="pointer-events-none" />
            </button>
            <button ref={pageStateTab} onClick={changePageState}>
              {pageState}
            </button>
            <hr
              ref={activeTabLine}
              className="absolute bottom-0 duration-500"
            />
          </div>
          <div
            className={
              "min-w-[200px] min-h-[calc(100vh-80px)] md:sticky top-24 overflow-y-auto p-6 md:pr-0 md:border-grey md:border-r absolute max-md:top-[64px] bg-white max-md:w-[calc(100%+80px)] max-md:px-16 max-md:-ml-7 duration-500 " +
              (!showShideNav
                ? "max-md:opacity-0 max-md:pointer-events-auto"
                : "opacity-100 pointer-events-auto")
            }
          >
            <h1 className="text-x1 text-dark-grey mb-3">Dashboard</h1>
            <hr className=" border-grey -ml-6 mb-8 mr-6" />
            <div className="space-y-10">
              <div >
                <NavLink
                  to={"/settings/dashboard/blogs"}
                  onClick={(e) => setPage(e.target.innerText)}
                  className=" text-dark-grey hover:text-black flex items-center gap-2"
                >
                  <IoDocumentsOutline />
                  Blog
                </NavLink>
              </div>
              <div>
                <NavLink
                  to={"/settings/dashboard/notification"}
                  onClick={(e) => setPage(e.target.innerText)}
                  className="sidebar-link flex items-center gap-2"
                >
                  <IoIosNotificationsOutline />
                  Notification
                </NavLink>
              </div>
              <div>
                <NavLink
                  to={"/dashboard/write"}
                  onClick={(e) => setPage(e.target.innerText)}
                  className="sidebar-link flex items-center gap-2"
                >
                  <TfiWrite />
                  Write
                </NavLink>
              </div>
            </div>

            <h1 className="text-x1 text-dark-grey mb-3 mt-10">Setting</h1>
            <hr className=" border-grey -ml-6 mb-8 mr-6" />
            <div className="space-y-10">
              <div>
                <NavLink
                  to={"/settings/edit-profile"}
                  onClick={(e) => setPage(e.target.innerText)}
                  className=" text-dark-grey hover:text-black flex items-center gap-2"
                >
                  <CiUser />
                  Edite Profile
                </NavLink>
              </div>
              <div>
                <NavLink
                  to={"/settings/change-password"}
                  onClick={(e) => setPage(e.target.innerText)}
                  className="sidebar-link flex items-center gap-2"
                >
                  <IoLockClosedOutline />
                  Change Password
                </NavLink>
              </div>
            </div>
          </div>
        </div>
        <div className=" mt-5 w-full ">
          <Outlet />
        </div>
      </section>
    </>
  );
}

export default SettingSideBar;
