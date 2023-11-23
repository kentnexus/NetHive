import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/Solutions.css';

const ScrapeLoad = ({selectedProduct, selectedManufacturer, selectedAssetNumber, selectedDeviceName}) => {
  const [dataScraped, setDataScraped] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/ScrapeRoute');
        console.log('Scraped data:', response.data);
        const dataScraped = response.data.data;
        setDataScraped(dataScraped);
        setFilteredData(dataScraped);
        applyFilter();
      } catch (error) {
        console.error('Error during scraping:', error);
      }
    };

    fetchData();
  }, [selectedProduct, selectedManufacturer, selectedAssetNumber, selectedDeviceName]);

  const applyFilter = () => {
    let filteredResults = [...dataScraped];
    // Apply filters based on selected values
    if (selectedProduct && selectedProduct !== 'all') {
      filteredResults = filteredResults.filter(item => item.product === selectedProduct);
      {console.log('filtered :', selectedProduct)}
    }
    else if (selectedManufacturer && selectedManufacturer !== 'all') {
      const lowerCaseManufacturer = selectedManufacturer.toLowerCase();
      filteredResults = filteredResults.filter(item => item.productdesc.toLowerCase().includes(lowerCaseManufacturer));
      {console.log('filtered :', selectedManufacturer)}
    }
    setFilteredData(filteredResults);
  };

  
  return (
    <div>
       <p>Number of items in filtered data: {filteredData.length}</p>
      {console.log('filtered scraped data: ', filteredData)}
      {filteredData && filteredData.length > 0 ? (
        filteredData.map((item) => (
          <div className="scrape-block">
            <h1>
              <a href={item.url}>{item.productdesc}</a>
            </h1>
            Model: {item.model}
            <br />
            Price: {item.price}
          </div>
        ))
      ) : (
        <p>Loading .. </p>
      )}
    </div>
  );
};

export default ScrapeLoad;
