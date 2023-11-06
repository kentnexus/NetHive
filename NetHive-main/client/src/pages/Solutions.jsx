import React from "react";
import MainPageLayout from "../components/MainPageLayout";
const bg = require("../images/bg_nethive.png");
import RecoLists from "../components/RecoLists";


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
      
      <RecoLists/>
           </div>
    </MainPageLayout>
  );
};


export default Solutions;


