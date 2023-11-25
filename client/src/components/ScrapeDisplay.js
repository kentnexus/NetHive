// ScrapeDisplay.js
import React from 'react';
import ScrapeLoad from '../components/ScrapeLoad';
import '../styles/Solutions.css';


const ScrapeDisplay = ({ dataScraped, filteredData }) => {
  return (
    <div>
      <p>Number of items in scraped data: {dataScraped.length}</p>
      <p>Number of items in filtered data: {filteredData.length}</p>

      {console.log('filtered scraped data: ', filteredData)}
      {filteredData && filteredData.length > 0 ? (
        filteredData.map((item) => (
          <div className="scrape-block" key={item.url}>
            <h1>
              <a href={item.url}>{item.productdesc}</a>
            </h1>
            Model: {item.model}
            <br />
            Price: {item.price}
          </div>
        ))
      ) : (
        <p>No match on filter </p>
      )}
    </div>
  );
};

export default ScrapeDisplay;
