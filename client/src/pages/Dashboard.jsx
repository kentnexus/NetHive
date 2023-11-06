import React from "react";
import MainPageLayout from "../components/MainPageLayout";
import Analytics from "../components/Analytics";
const bg = require("../images/bg_nethive.png");

const Dashboard = () => {
  return (
    <MainPageLayout>
    <div>
      <Analytics />
    </div>
    </MainPageLayout>
  );
};

export default Dashboard;
