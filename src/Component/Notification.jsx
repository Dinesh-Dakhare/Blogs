import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../assets/authContext";
import Loader from "../Component/Loader.jsx";
import NotificationCard from "./NotificationCard";
const Notification = () => {
  const [activeField, setActiveField] = useState("all");
  const [notification, setNotification] = useState(null);
  const {
    userAuth: { token },
    setUserAuth,
  } = useContext(AuthContext);
  const handleNotification = (filter) => {
    setActiveField(filter);
    console.log(activeField);
  };
  const category = ["all", "likes", "comments"];

  const getNotification = async ({ page, deletedDocCount = 0 }) => {
    console.log("Hello world");

    const res = await axios.post(
      "http://localhost:5000/api/v1/notification/get-notification",
      { page, filter: activeField, deletedDocCount },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (res.status === 200) {
      console.log(res);
      setNotification(res.data.notification);
    }
  };
  useEffect(() => {
    if (token) {
      getNotification({ page: 1 });
    }
  }, []);

  return (
    <div>
      <div>
        <h1>Recent Notification</h1>
        <div className="space-x-4 flex ">
          {category.map((elem, i) => {
            return (
              <button
                onClick={() => handleNotification(elem)}
                className={
                  "text-2xl font-medium border-1 transition duration-300 ease-out  bg-slate-200 px-4 py-2 rounded-full " +
                  (activeField === elem ? "bg-slate-600  " : "")
                }
                key={i}
              >
                {elem}
              </button>
            );
          })}
        </div>
      </div>
      <div>
        {notification === null ? (
          <div className="flex items-center justify-center">
            <Loader />
          </div>
        ) : (
          <NotificationCard notification={notification} />
        )}
      </div>
    </div>
  );
};

export default Notification;
