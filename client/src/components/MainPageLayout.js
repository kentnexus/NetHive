import React from "react";
import Navbar from "./Navbar.js";
import SearchBar from "./SearchBar.js";
import { Link } from "react-router-dom";
import logo from "../images/nethive_logo2.png";
import UserProfile from "./UserProfile.js";

const bg = require("../images/bg_nethive.png");

const MainPageLayout = ({ children }) => {
  return (
    <div style={{
      backgroundImage: `url(${bg})`,
      minHeight: "100vh",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      backgroundAttachment: "fixed",
      // overflow: "hidden"
    }}>
      <div className="header nav-area"
            style={{
              display: 'flex',  
              justifyContent:'center', 
              alignItems:'center',
            }}
      >
        <Link to="/" >
          <img className="logo" src={logo} alt="LOGO" />
        </Link>
        <Navbar />
        <SearchBar />
        <UserProfile />
      </div>
      <main className="body_" 
        style = {{
        backgroundColor: "transparent"
      }}>{children}</main>
    </div>
  );
};

export default MainPageLayout;