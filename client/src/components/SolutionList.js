import React from "react";
import { FormControl, Select, InputLabel, Box, MenuItem } from '@mui/material';
import "../styles/Solutions.css";
import LoadScrapedData from "../components/LoadScrapedData.js";
import ScrapeLoad from '../components/ScrapeLoad.js';
import DropdownFilter from "../components/DropdownFilter.js";


const SolutionList = () => {
  const [selection, setChoice] = React.useState('');

  const handleChange = (event) => {
    setChoice(event.target.value);
  };

  return (
    <div className="sscontainer">
      <div className="column">
        <h3>Filter the solutions </h3>
        <DropdownFilter />
      </div>

      <div className="column">
        <h3>Lists of Available Solutions</h3>
        <div className="content">

          {/* intended scraper but still needs more work */}
          <ScrapeLoad />  

          {/* static test scraper output */}
          {/* <LoadScrapedData /> */}
          
        </div>
      </div>
    </div>
  );
};

export default SolutionList;
