// client/src/components/ScrapeLoad.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "../styles/Solutions.css";

const ScrapeLoad = () => {
  const [dataScraped, setDataScraped] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/ScrapeRoute');
        console.log('Scraped data:', response.data);
        setDataScraped(response.data);
      } catch (error) {
        console.error('Error during scraping:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {console.log('Render scraped data: ', dataScraped)}

      {/* {
        dataScraped && dataScraped.length > 0 && dataScraped.map((item) => {
          return (
            <div className="scrape-block" key={item.id}>
              Hello!
              <h1><a href={item.url}>{item.product}</a></h1>
              Model: {item.model}<br />
              Price: {item.price}
            </div>
          ) 
        }
        )
      } */}
    </div>
  )
}

export default ScrapeLoad;
