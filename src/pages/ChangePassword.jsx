import React, { useContext, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { IoLockClosedOutline } from "react-icons/io5";
import { FaEye, FaEyeSlash, FaLock } from "react-icons/fa";
import { AuthContext } from "../assets/authContext";
function ChangePassword() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const {
    userAuth: { token },
  } = useContext(AuthContext);
  let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/; // regex for password

  const handleSumbit = async (e) => {
    e.preventDefault();

    if (!currentPassword.length || !newPassword.length) {
      return toast.error("Fill all the inputs");
    }
    if (
      !passwordRegex.test(currentPassword) ||
      !passwordRegex.test(newPassword)
    ) {
      return toast.error(
        "Password should be 6 to 20 characters long with a numeric, 1 lowercase and 1 uppercase letters"
      );
    }
    let loadingToast = toast.loading("Updating.....");
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/v1/auth/change-password",
        {
          currentPassword,
          newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (data) {
        toast.dismiss(loadingToast);
        toast.success(data.message);
        setCurrentPassword("");
        setNewPassword("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form action="" className="w-[50rem] max-md:w-[40rem]  border-2 p-2 ">
      <ToastContainer />
      <h1 className="max-md:hidden font-semibold text-2xl p-2">
        Change Password
      </h1>
      <div className="mb-4 relative">
        <IoLockClosedOutline className="absolute left-3 top-[0.90rem] text-gray-500" />
        <input
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          type={showCurrentPassword ? "text" : "password"}
          className="border-4 w-full pl-10 pr-10 py-2 rounded-md bg-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 "
          placeholder="Current Password"
        />
        <button
          className="absolute right-3 top-[0.90rem] text-gray-500 hover:text-gray-700"
          type="button"
          onClick={() => setShowCurrentPassword(!showCurrentPassword)}
        >
          {showCurrentPassword ? <FaEyeSlash /> : <FaEye />}
        </button>
      </div>
      <div className="mb-4 relative">
        <IoLockClosedOutline className="absolute left-3 top-[0.90rem] text-gray-500" />
        <input
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          type={showNewPassword ? "text" : "password"}
          className="border-4 w-full pl-10 pr-10 py-2 rounded-md bg-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 "
          placeholder="New Password"
        />
        <button
          className="absolute right-3 top-[0.90rem] text-gray-500 hover:text-gray-700"
          type="button"
          onClick={() => setShowNewPassword(!showNewPassword)}
        >
          {" "}
          {showNewPassword ? <FaEyeSlash /> : <FaEye />}
        </button>
      </div>
      <button
        onClick={handleSumbit}
        className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        type="submit"
      >
        Change Password
      </button>
    </form>
  );
}

export default ChangePassword;
