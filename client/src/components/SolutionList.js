import React from "react";
import "../styles/Solutions.css";
import ScrapeLoad from '../components/ScrapeLoad.js';
import DropdownFilter from "../components/DropdownFilter.js";


const SolutionList = () => {
  return (
    <div className="sscontainer">
      <div className="column">
        <h3>Filter the solutions </h3>
        <DropdownFilter />
      </div>

      <div className="column">
        <h3>Lists of Available Solutions</h3>
        <div className="content">
          <ScrapeLoad />        
        </div>
      </div>
    </div>
  );
};

export default SolutionList;
