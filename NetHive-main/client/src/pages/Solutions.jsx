import React from "react";
import MainPageLayout from "../components/MainPageLayout";
<<<<<<< HEAD
const bg = require("../images/bg_nethive.png");
import RecoLists from "../components/RecoLists";
=======
import TabularExample from "../components/TabularExample";
const bg = require("../images/bg_nethive.png");

>>>>>>> 59883238015d0fa4438c49a1728aafd60bba83fa


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
<<<<<<< HEAD

       <RecoLists/>
=======
      {/* <h1>This is solutions content</h1> */}
          <TabularExample/>
>>>>>>> 59883238015d0fa4438c49a1728aafd60bba83fa
           </div>
    </MainPageLayout>
  );
};


export default Solutions;


