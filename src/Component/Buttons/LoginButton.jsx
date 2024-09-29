import React from "react";

function LoginButton({ view }) {
  return (
    <button
      className=" transition duration-150 ease-in-out border-2 border-gray-800 p-2
    w-[20rem] hover:bg-gray-800 hover:text-white hover:rounded-xl shadow-gray-800"
    >
      {view}
    </button>
  );
}

export default LoginButton;
