import React from "react";
import Navbar from "./Navbar.js";
import SearchBar from "./SearchBar.js";
import { Link } from "react-router-dom";
import logo from "../images/nethive_blk_logo2.png";

const MainPageLayout = () => {
  return (
    <header>
      <div className="nav-area">
        <Link to="/" className="logo">
          <img src={logo} alt="LOGO" height={100} width={300} />
        </Link>
        <Navbar />
        <SearchBar />
      </div>
    </header>
  );
};

export default MainPageLayout;
