import React from "react";
import MainPageLayout from "../components/MainPageLayout";
<<<<<<< HEAD
=======
import Analytics from "../components/Analytics";
>>>>>>> 59883238015d0fa4438c49a1728aafd60bba83fa
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
<<<<<<< HEAD
      <h1>This is dashboard content</h1>
    </div>
      
=======
      <Analytics />
    </div>
>>>>>>> 59883238015d0fa4438c49a1728aafd60bba83fa
    </MainPageLayout>
  );
};

export default Dashboard;
