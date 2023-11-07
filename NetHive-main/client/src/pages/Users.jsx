import React from "react";
import MainPageLayout from "../components/MainPageLayout";
const bg = require("../images/bg_nethive.png");
<<<<<<< HEAD
import UserLists from "../components/UserLists";
=======
>>>>>>> 59883238015d0fa4438c49a1728aafd60bba83fa

const Users = () => {
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
      <UserLists/>
=======
      <h1>This is users content</h1>
>>>>>>> 59883238015d0fa4438c49a1728aafd60bba83fa
      </div>
      
    </MainPageLayout>
  );
};

export default Users;
