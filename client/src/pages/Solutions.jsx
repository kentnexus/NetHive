import React from "react";
import MainPageLayout from "../components/MainPageLayout";
const bg = require("../images/bg_nethive.png");
import SolutionList from "../components/SolutionList";

const Solutions = () => {
  return (
    <MainPageLayout>
      <div>
        <SolutionList/>

      </div>
    </MainPageLayout>
  );
};

export default Solutions;
