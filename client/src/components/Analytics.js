import React, { useEffect, useState } from "react";
import axios from "axios";

import Cards from "./plotly/Cards";
import CategorizedAssets from "./plotly/CategorizedAssets"
import AssetsByMan from "./plotly/AssetsbyMan";
import AssetsbyStatus from "./plotly/AssetsbyStatus";
import AssetsbyLocation from "./plotly/AssetsByLocation";
import ExpiredAssets from "./plotly/ExpiredAssets";
import ExpiringAssets from "./plotly/ExpiringAssets";


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
    <div style={{
      marginBottom: '20px',
      display: 'flex',
      borderRadius: '25px',
      background: 'beige'
    }}>
      <a style={{
        padding: '10px',
        fontSize: '30px',
        fontFamily: 'fantasy',
        color: 'white',
      }}>DASHBOARD</a>
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
            <h3>Expired Contracts (Last 15 Days)</h3>
            <ExpiredAssets>{assets}</ExpiredAssets>
            <h3>Expiring Contracts (Next 15 Days)</h3>
            <ExpiringAssets>{assets}</ExpiringAssets>
          </div>
      </div>
    </div>
  );
};

export default Analytics;