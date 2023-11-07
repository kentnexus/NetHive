import React from "react";
import Navbar from "./Navbar.js";
import SearchBar from "./SearchBar.js";
import { Link } from "react-router-dom";
import logo from "../images/nethive_logo2.png";
import UserProfile from "./UserProfile.js";
<<<<<<< HEAD
import "../styles/UserProf.css";

const MainPageLayout = ({ children }) => {
  return (
    <div style={{width: '100%'}}>
=======

const MainPageLayout = ({ children }) => {
  return (
    <div>
>>>>>>> 59883238015d0fa4438c49a1728aafd60bba83fa
      <div className="header nav-area">
        <Link to="/" >
          <img className="logo" src={logo} alt="LOGO" />
        </Link>
        <Navbar />
<<<<<<< HEAD
        <span class="classforicon"><SearchBar />
        <UserProfile /></span>
=======
        <SearchBar />
        <UserProfile />
>>>>>>> 59883238015d0fa4438c49a1728aafd60bba83fa
      </div>
      <main className="body_">{children}</main>
    </div>
  );
};

export default MainPageLayout;
