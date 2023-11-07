import React from "react";
import Navbar from "./Navbar.js";
import SearchBar from "./SearchBar.js";
import { Link } from "react-router-dom";
import logo from "../images/nethive_logo2.png";
import UserProfile from "./UserProfile.js";

const MainPageLayout = ({ children }) => {
  return (
    <div>
      <div className="header nav-area">
        <Link to="/" >
          <img className="logo" src={logo} alt="LOGO" />
        </Link>
        <Navbar />
        <SearchBar />
        <UserProfile />
      </div>
      <main className="body_">{children}</main>
    </div>
  );
};

export default MainPageLayout;
