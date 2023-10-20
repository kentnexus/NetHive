import React from "react";
import MainPageLayout from "../components/MainPageLayout";
import Login from "./Login";
const bg = require("../images/bg_nethive.png");

const Home = () => {
  return (
    <div style={{
      backgroundImage: `url(${bg})`,
      minHeight: "100vh",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
    }}> 
      <MainPageLayout />     
    </div>
  );
};

export default Home;
