// ScrapeDisplay.js
import React from "react";
import "../styles/Solutions.css";

const ScrapeDisplay = ({ dataScraped, filteredData }) => {


  return (
    <div>
      <p>Number of items in scraped data: {dataScraped.length}</p>
      <p>Number of items in filtered data: {filteredData.length}</p>

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

    </div>
  );
};

export default ScrapeDisplay;
