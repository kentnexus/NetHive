import React from "react";
import Plotly from "react-plotly.js";

const {counts} = require("../../functions/analytics.js")

const cards = (assets) => {

  assets = assets.children
  let totalAssets = 0, numberOfAssets = 0
  let activeContracts = [],  activeAssets = []

  const date = new Date();

  for (let i=0; i<assets.length;i++){

      const contract_dt = new Date(assets[i]['contracts_end_dt'])
      
      if(contract_dt >= date) {
        activeContracts.push(assets[i]['contracts_end_dt']);
      }

      assets[i]['status'] != "Decommisioned" ? activeAssets.push(assets[i]['status']) : null

      if(!assets[i]['cost']){
          continue;
      }
      totalAssets+=assets[i]['cost'];
  }

  const statusList = counts(activeAssets)

  // console.log(statusList)

  return (
    <div style={{
      backgroundColor: 'white', 
      // paddingTop: '10px', 
      display: 'flex',
      justifyContent:'center',
      alignItems: 'center', 
      flexDirection: 'column',
      borderRadius: '15px',
      paddingBottom: '10px'
      }}>
      <a style={{
        margin: '5px 0',
        fontSize: '20px',
        // fontWeight: 'bold',
        color: '#3b3b3b'
        }}>
        <b>Assets & Contracts</b>
      </a>
      <div>
        <Plotly
          data={[            
          {
            type: "indicator",
            mode: "number",
            value: totalAssets,
            number: {prefix: "$"},
            title: {
              text:"Total Assets Cost",
              font: {
                size: 16,
              }
            },
          }, 
          ]}
          layout={{
            width: 300,
            height: 135,
            margin: { t: 10, b: 0, l: 25, r: 25 },
            autosize: true,
          }}
          config={{
            responsive: true,
          }}
        />
        <Plotly
          data={[            
          {
            type: "indicator",
            mode: "number",
            value: assets.length,
            title: {
              text:"Number of Assets",
              font: {
                size: 16,
              }
            },
          }, 
          ]}
          layout={{
            width: 300,
            height: 135,
            margin: { t: 20, b: 0, l: 25, r: 25 },
            autosize: true,
          }}
          config={{
            responsive: true,
          }}
        />
      </div>
      <div>
        <Plotly
          data={[            
          {
            type: "indicator",
            mode: "number",
            value: activeContracts.length,
            title: {
              text:"Active Contracts",
              font: {
                size: 16,
              }
            },
          }, 
          ]}
          layout={{
            width: 300,
            height: 120,
            margin: { t: 30, b: 0, l: 25, r: 25 },
            autosize: true,
          }}
          config={{
            responsive: true,
          }}
        />
        <Plotly
          data={[            
          {
            type: "indicator",
            mode : "number",
            number: {suffix: '%'},
            value: (statusList['Active']/activeAssets.length)*100,
            title: {
              text:"Asset Utilization",
              font: {
                size: 16,
              }
            },
          }, 
          ]}
          layout={{
            width: 300,
            height: 120,
            margin: { t: 30, b: 0, l: 25, r: 25 },
            autosize: true,
          }}
          config={{
            responsive: true,
          }}
        />
      </div>
    </div>
  );
};

export default cards;
