import React from "react";
import MainPageLayout from "../components/MainPageLayout";
import Analytics from "../components/Analytics";
const bg = require("../images/bg_nethive.png");

const Dashboard = () => {
  return (
    <MainPageLayout>
    <div style={{
      backgroundImage: `url(${bg})`,
      minHeight: "100vh",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
    }}>
      <Analytics />
    </div>
    </MainPageLayout>
  );
};

export default Dashboard;
