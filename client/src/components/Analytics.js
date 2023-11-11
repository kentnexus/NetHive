import React, { useEffect, useState } from "react";
import axios from "axios";

import Cards from "./dashboard/Cards";
import CategorizedAssets from "./dashboard/CategorizedAssets"
import AssetsByMan from "./dashboard/AssetsbyMan";
import AssetsbyStatus from "./dashboard/AssetsbyStatus";
import AssetsbyLocation from "./dashboard/AssetsByLocation";
import Contractslist from "./dashboard/Contractslist";

import { AiFillHome } from "react-icons/ai";

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
      display: 'flex',
      justifyContent:'center', 
    }}>
      <div style={{
        alignItems:'flex-start',
        backgroundColor: 'rgba(177, 179, 177,0.3)',
        borderRadius: '25px',
        padding: '0 10px 10px 10px',
        }}>
          <a style={{
            padding: '10px',
            fontSize: '30px',
            fontFamily: 'fantasy',
            color: 'beige',
          }}><AiFillHome style={{marginBottom:'6'}}/>DASHBOARD</a>
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent:'center', 
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
              <Contractslist>{assets}</Contractslist>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;