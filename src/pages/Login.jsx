import React, { useContext, useState } from "react";
import LoginButton from "../Component/Buttons/LoginButton";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { storeInSession } from "../assets/sessionData.js";
import { AuthContext } from "../assets/authContext.jsx";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const {
    userAuth: { token },
    setUserAuth,
  } = useContext(AuthContext);
  const loginHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/v1/auth/login", {
        email,
        password,
      });
      if (res.ok) {
        res.status(200).json({ message: "user login successfully" });
      }
      storeInSession("user", JSON.stringify(res.data.user));
      setUserAuth(res.data.user);
      if (token) navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <section>
      <div className="flex justify-center  items-center py-20">
        <div className="flex flex-col space-y-10 w-[45rem] mr-[9rem]">
          <div>
            <p className="text-4xl font-medium">
              Welcome back, there is the latest news today!!
            </p>
          </div>
          <div className=" p-4 flex gap-5 "></div>
        </div>

        <div className="  border-2 shadow-l border-black flex gap-6 p-10 w-[25rem] flex-col rounded-xl">
          <h1 className="m-auto text-3xl font-bold">Login</h1>
          <form action="" onSubmit={loginHandler}>
            <div>
              <label htmlFor="email" className="text-xl ">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border-2 border-black w-[20rem]  p-2 h-12 rounded-xl"
                placeholder="Enter Email"
              />
            </div>
            <div>
              <label htmlFor="password" className="text-xl ">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border-2 border-black w-[20rem] h-12 p-2 rounded-xl"
                placeholder="Enter Password"
              />
            </div>
            <div className="flex justify-between">
              <div
                className="
         flex"
              >
                {/* <input type="checkbox" /> */}
                <p className="px-3">Remember me?</p>
              </div>
              <div>
                <p>Forgot password</p>
              </div>
            </div>
            <div>
              <LoginButton view={"Login"} />
              <p className="my-4 flex justify-center">
                Don't have acount?Register now
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Login;
