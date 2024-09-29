import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../Component/Buttons/Button";
import Card from "../Component/Card";
import political from "../Image/political.jpg";
import entertainment from "../Image/entertainment.jpg";
import sport from "../Image/sport.jpg";
import LoginButton from "../Component/Buttons/LoginButton";
import axios from "axios";
import {ToastContainer,toast} from 'react-toastify'
function Register() {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/api/v1/auth/register",
        { fullname, email, password }
      );
      console.log(res);
      if (res.ok) {
        res.status(200).json({
          message: "user created successfully",
          success: true,
        });
      }
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className=" flex items-center justify-center flex-col">
        <div className="p-8 flex flex-col justify-center items-center">
          <p className="text-4xl font-medium p-4">
            Let's join as Blogger friends
          </p>

          <p className="w-[20rem]">
            Lorem ipsum dolor ea inventore, fuga modi tenetur est reiciendis
            eaque laudantium voluptatibus. Temporibus!
          </p>
        </div>
        <div className="border-2 shadow-l border-black flex gap-6 p-10 w-[25rem] flex-col rounded-xl">
          <h1 className="m-auto text-3xl font-bold">Register</h1>
          <form onSubmit={submitHandler}>
            <div>
              <label htmlFor="username" className="text-xl ">
                fullname
              </label>
              <input
                type="text"
                name="fullname"
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
                className="border-2 border-black w-[20rem] p-2  h-12 rounded-xl"
                placeholder="Enter username"
              />
            </div>
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
                placeholder="Confirm  Password"
              />
            </div>
            <div>
              <LoginButton view={"Register"} />
              <p className="my-4">Do you already have an acount?Login Now</p>
            </div>
          </form>
        </div>
      </div>
      <div className="px-10">
        <div className="flex justify-between py-10">
          <h1 className="text-3xl">Hot Topic News</h1>
          <Button view={"View All"} />
        </div>
        <hr />
        <div className="flex justify-around py-10">
          <Card
            img={sport}
            heading={"this is heading for sports"}
            para={"this is paragrah for deferent topic"}
          />
          <Card
            img={entertainment}
            heading={"this is for entertainment"}
            para={"this is paragrah for deferent topic"}
          />
          <Card
            img={political}
            heading={"this is for political"}
            para={"this is paragrah for deferent topic"}
          />
        </div>
      </div>
    </>
  );
}

export default Register;
