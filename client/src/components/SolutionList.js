import React, { useState, useEffect } from "react";
import "../styles/Solutions.css";
import ScrapeLoad from "../components/ScrapeLoad.js";
import DropdownFilter from "../components/DropdownFilter.js";
import axios from "axios";
import ScrapeDisplay from "./ScrapeDisplay.js";

// let scrapedData = require("../scraped_data.json");
const SolutionList = () => {
  // const { filteredData } = props;

  const [filteredData, setFilteredData] = useState([]);

  const [dataScraped, setDataScraped] = useState([]);
  useEffect(
    () => {
      const fetchData = async () => {
        try {
          const response = await axios.get(
            "/api/api/ScrapeRoute"
          );
          console.log("Scraped data:", response.data);
          const data = response.data.data;
          setDataScraped(data);
          // setFilteredData(dataScraped);
        } catch (error) {
          console.error("Error during scraping:", error);
        }
      };
      fetchData();

      // setDataScraped(scrapedData);
    },
    [
      // selectedType,
      // selectedProduct,
      // selectedManufacturer,
      // selectedAssetNumber,
      // selectedDeviceName,
    ]
  );

  return (
    <div className="sscontainer">
      <div className="column">
        <h3>Filter the solutions </h3>
        <DropdownFilter
          dataScraped={dataScraped}
          filteredData={filteredData}
          setFilteredData={setFilteredData}
        />
      </div>

      <div className="column">
        <h3>Lists of Available Solutions</h3>
        <div className="content">
          <ScrapeDisplay
            dataScraped={dataScraped}
            filteredData={filteredData}
          />
        </div>
      </div>
    </div>
  );
};

export default SolutionList;
