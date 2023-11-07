import React from "react";
import MainPageLayout from "../components/MainPageLayout";
const bg = require("../images/bg_nethive.png");
import UserLists from "../components/UserLists";

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
      <UserLists/>
      </div>
      
    </MainPageLayout>
  );
};

export default Users;
