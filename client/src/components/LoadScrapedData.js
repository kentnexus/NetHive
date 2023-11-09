import "../styles/Solutions.css";
import { useState, useEffect } from 'react';

// function LoadScrapedData() {
const LoadScrapedData = () => {
  const [data, setData] = useState([]);

  const getData = () => {
    fetch('scraped_data.json', {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    }).then((response) => {
      return response.json()
    }).then((myjson) => {
      console.log(data);
      setData(myjson)
    })
  }
  useEffect(() => {
    getData();
  }, [])

  return (
    <div>
      {
        data && data.length > 0 && data.map((item) => {
          return (
            <div className="scrape-block">
              <h1><a href={item.url}>{item.product}</a></h1>
              Model: {item.model}<br />
              <p>Price: {item.price}</p>
            </div>
          )
        })
      }
    </div>
  )

}
export default LoadScrapedData;