//ScrapeLoad.js

import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Solutions.css";
import ScrapeDisplay from "../components/ScrapeDisplay";

const ScrapeLoad = ({
  selectedType,
  selectedProduct,
  selectedManufacturer,
  selectedAssetNumber,
  selectedDeviceName,
}) => {
  const [dataScraped, setDataScraped] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/ScrapeRoute"
        );
        console.log("Scraped data:", response.data);
        const dataScraped = response.data.data;
        setDataScraped(dataScraped);
        // setFilteredData(dataScraped);
      } catch (error) {
        console.error("Error during scraping:", error);
      }
    };

    fetchData();
  }, [
    selectedType,
    selectedProduct,
    selectedManufacturer,
    selectedAssetNumber,
    selectedDeviceName,
  ]);

  return (
    <ScrapeDisplay
      dataScraped={dataScraped}
      selectedProduct={selectedProduct}
      selectedManufacturer={selectedManufacturer}
    />
  );
};

export default ScrapeLoad;
