// ScrapeDisplay.js
import React from "react";
import "../styles/Solutions.css";

const ScrapeDisplay = ({ dataScraped, filteredData }) => {
  // const applyFilter = () => {
  //   let filteredResults = [...dataScraped];

  //   // if (selectedProduct && selectedProduct !== 'all' && selectedProduct !== 'na') {
  //   //   const productLowerCase = selectedProduct.toLowerCase();
  //   //   filteredResults = filteredResults.filter(item => item.product.toLowerCase().includes(productLowerCase) || item.productdesc.toLowerCase().includes(productLowerCase));
  //   // }

  //   if (selectedProduct && selectedProduct !== 'all') {
  //     const productLowerCase = selectedProduct.toLowerCase();

  //     // Check for specific product types
  //     if (selectedProduct === 'accesspoint' || selectedProduct === 'switch' || selectedProduct === 'router' || selectedProduct === 'firewall') {
  //       filteredResults = filteredResults.filter(item => item.product.toLowerCase() === selectedProduct || item.productdesc.toLowerCase().includes(productLowerCase));
  //       console.log('Filter: ', selectedProduct)
  //       console.log('Result: ', filteredResults)
  //     } else if (selectedProduct === 'na') {
  //       filteredResults = filteredResults.filter(item => item.product.toLowerCase() !== 'na');
  //       console.log('Filter: ', selectedProduct)
  //       console.log('Result: ', filteredResults)
  //     }
  //   }

  //   if (selectedManufacturer && selectedManufacturer !== 'all') {
  //     const manufacturerLowerCase = selectedManufacturer.toLowerCase();
  //     filteredResults = filteredResults.filter(item => item.manufacturer.toLowerCase().includes(manufacturerLowerCase) || item.productdesc.toLowerCase().includes(manufacturerLowerCase));
  //   }

  //   return filteredResults;
  // };

  // const filteredData = applyFilter();

  return (
    <div>
      <p>Number of items in scraped data: {dataScraped.length}</p>
      <p>Number of items in filtered data: {filteredData.length}</p>
      {console.log("filtered scraped data: ", dataScraped)}
      {console.log("scraped data: ", filteredData)}

      {filteredData && filteredData.length > 0 ? (
        filteredData.map((item) => (
          <div className="scrape-block" key={item.url}>
            <h1>
              <a href={item.url} target="_blank" rel="noopener noreferrer">{item.productdesc}</a>
            </h1>
            <p>
              Model: {item.model}
              <br />
              Price: {item.price}
            </p>
          </div>
        ))
      ) : dataScraped && dataScraped.length > 0 ? (
        dataScraped.map((item) => (
          <div className="scrape-block" key={item.url}>
            <h1>
              <a href={item.url}>{item.productdesc}</a>
            </h1>
            <p>
              Model: {item.model}
              <br />
              Price: {item.price}
            </p>
          </div>
        ))
      ) : (
        <p>Loading results... </p>
      )}
      {/* 
      {dataScraped && dataScraped.length > 0 ? (
        dataScraped.map((item) => (
          <div className="scrape-block" key={item.url}>
            <h1>
              <a href={item.url}>{item.productdesc}</a>
            </h1>
            <p>
              Model: {item.model}
              <br />
              Price: {item.price}
            </p>
          </div>
        ))
      ) : (
        <p>Loading results... </p>
      )} */}
    </div>
  );
};

export default ScrapeDisplay;
