import React from "react";
import "../styles/UserProf.css";
import { FaUserCircle } from "react-icons/fa";
import { AiFillCaretDown } from "react-icons/ai";

const UserProfile = () => {
  return (
    <div className="navuserProfile">
      <p id="userdisplay">Hello, Lyn Sule</p>
      <div className="usericon">
      <FaUserCircle id="userp-icon"/><AiFillCaretDown id="caret-icon"/>
      </div>
    </div>
  );
};

export default UserProfile;
