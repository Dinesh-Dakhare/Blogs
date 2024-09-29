import React, { useEffect, useState } from "react";
import axios from "axios";
import LargeCard from "../Component/Cards/LargeCard.jsx";
import SmallCard from "../Component/Cards/SmallCard.jsx";
import NavigationComponent from "../Component/NavigationComponent.jsx";
function Home() {
  const [blog, setBlog] = useState([]);
  useEffect(() => {
    getBlog();
    console.log(blog);
  }, []);

  const getBlog = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/v1/blog/getBlog");
      if (res) {
        setBlog(res.data.blog);
        console.log(blog);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <section className="w-full m-28">
      <div>
        <NavigationComponent
          route={["Home", "Trending"]}
          defaultTab={["Trending"]}
        >
          <h1>hello world</h1>
          <h1>hello heaven</h1>
        </NavigationComponent>
      </div>
    </section>
  );
}

export default Home;
