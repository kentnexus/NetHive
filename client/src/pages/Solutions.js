import React from "react";
import MainPageLayout from "../components/MainPageLayout";
const bg = require("../images/bg_nethive.png");

const Solutions = () => {
  return (
    <MainPageLayout>
      <div  style={{
      backgroundImage: `url(${bg})`,
      minHeight: "100vh",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
    }}>
      <h1>This is solutions content</h1>
      </div>
    </MainPageLayout>
  );
};

export default Solutions;
