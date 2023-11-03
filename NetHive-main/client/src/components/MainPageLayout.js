import React from "react";
import Navbar from "./Navbar.js";
import SearchBar from "./SearchBar.js";
import { Link } from "react-router-dom";
import logo from "../images/nethive_logo2.png";
import UserProfile from "./UserProfile.js";
import "../styles/UserProf.css";

const MainPageLayout = ({ children }) => {
  return (
    <div style={{width: '100%'}}>
      <div className="header nav-area">
        <Link to="/" >
          <img className="logo" src={logo} alt="LOGO" />
        </Link>
        <Navbar />
        <span class="classforicon"><SearchBar />
        <UserProfile /></span>
      </div>
      <main className="body_">{children}</main>
    </div>
  );
};

export default MainPageLayout;
