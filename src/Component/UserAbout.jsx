import React from "react";
import { NavLink } from "react-router-dom";

function UserAbout({ joinedAt, bio, social_links }) {
  return (
    <div>
      <h1>{bio ? bio : "Nothing to read here"}</h1>
      <div className="space-x-2">
        {
          social_links?
    Object.keys(social_links).map((key)=>{
      let link = social_links[key];
      return link? <NavLink to={key} key={key}>{key}</NavLink>:" "
    }):" "
   }
      </div>
    
    </div>
  );
}

export default UserAbout;
