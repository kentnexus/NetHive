import React, { useEffect, useState } from "react";
import axios from "axios";

import Cards from "./plotly/Cards";
import CategorizedAssets from "./plotly/CategorizedAssets"
import AssetsByMan from "./plotly/AssetsbyMan";
import AssetsbyStatus from "./plotly/AssetsbyStatus";
import AssetsbyLocation from "./plotly/AssetsByLocation";


const Analytics = () => {

  const [assets, setAssets] = useState([]);
  
  useEffect( () => { 
      async function fetchData() {
          try {
              const res = await axios.get('/assets'); 
              setAssets(res.data);
          } catch (err) {
              console.log(err);
          }
      }
      fetchData();
  }, []);

  return (
    <div>
      <h1 style={{
        margin:'0 100px',
        marginBottom: '10px',
        backgroundColor: 'white',
        padding: '10px',
        fontSize: '50px',
        fontFamily: 'fantasy',
      }}>ASSET MANAGEMENT DASHBOARD</h1>
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent:'center', 
        alignItems:'flex-start',
      }}>
          <div className="firstCol"
            style={{
              flexDirection: 'column',
              margin: '0 10px',
            }}>
            <CategorizedAssets>{assets}</CategorizedAssets>
            <AssetsByMan>{assets}</AssetsByMan>
          </div>
          <div className="secondCol">
            <AssetsbyStatus>{assets}</AssetsbyStatus>
            <AssetsbyLocation>{assets}</AssetsbyLocation>
          </div>
          <div className="thirdCol"
            style={{
              flexDirection: 'column',
              margin: '0 10px'
            }}>
            <Cards>{assets}</Cards>
            <h1>Insert Table</h1>
          </div>
      </div>
    </div>
  );
};

export default Analytics;
