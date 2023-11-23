import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/Solutions.css';
import ScrapeDisplay from '../components/ScrapeDisplay';

const ScrapeLoad = ({ selectedType, selectedProduct, selectedManufacturer, selectedAssetNumber, selectedDeviceName }) => {
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
  }, [selectedType, selectedProduct, selectedManufacturer, selectedAssetNumber, selectedDeviceName]);

  const applyFilter = () => {
    let filteredResults = [...dataScraped];

    if (selectedType !== 'sw' && selectedType !== 'all') {
      filteredResults = [...dataScraped]
    }
    if (selectedProduct && selectedProduct !== 'all') {
      filteredResults = filteredResults.filter(item => item.product.includes(selectedProduct) || item.productdesc.includes(selectedProduct));
    }

    if (selectedManufacturer && selectedManufacturer !== 'all') {
      filteredResults = filteredResults.filter(item => item.productdesc.includes(selectedManufacturer));
    }
    setFilteredData(filteredResults);
  };

  return <ScrapeDisplay dataScraped={dataScraped} filteredData={filteredData} />;
};

export default ScrapeLoad;
