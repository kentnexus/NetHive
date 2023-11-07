import React from "react";
import Plotly from "react-plotly.js";

const {cost, counts, convertArrayToObject} = require("../../functions/analytics.js")

const cards = (assets) => {

  assets = assets.children
  let totalAssets = 0, numberOfAssets = 0
  let activeContracts = [],  activeAssets = []

  const date = new Date();

  for (let i=0; i<assets.length;i++){
      if(!assets[i]['cost']){
          continue;
      }
      totalAssets+=assets[i]['cost'];

      const contract_dt = new Date(assets[i]['contracts_end_dt'])
      
      if(contract_dt.getDate() >= date.getDate()) {
        activeContracts.push(assets[i]['contracts_end_dt']);
      }

      assets[i]['status'] != "Decommisioned" ? activeAssets.push(assets[i]['status']) : null
  }

  const statusList = counts(activeAssets)

  console.log(statusList)

  return (
    <div>
        <Plotly
            data={[            
            {
              type: "indicator",
              mode: "number",
              value: totalAssets,
              number: {prefix: "$"},
              title: "Total Assets Cost", 
              domain: { x: [0, .5], y: [.5, 1] }
            }, 
            {
              type: "indicator",
              mode: "number",
              value: assets.length,
              title: "Number of Assets",
              domain: { x: [0.5, 1], y: [.5, 1] }
            },                 
            {
              type: "indicator",
              mode: "number",
              value: activeContracts.length,
              title: "Active Contracts",
              domain: { x: [0, .5], y: [0, .5] }
            },                {
              type: "indicator",
              mode: "number",
              number: {suffix: '%'},
              value: (statusList['Active']/activeAssets.length)*100,
              title: "Asset Utilization",
              domain: { x: [0.5, 1], y: [0, .5] }
            },
            ]}
            layout={{
              title: {
                text:"<b>Assets & Contracts",
                font: {
                  size: 18,
                }
              },
              // paper_bgcolor: "white",
              width: 600,
              height: 400,
              margin: { t: 75, b: 0, l: 50, r: 50 },
              boxmode: true,
              autosize: true,
            }}
            config={{
              responsive: true
            }}
          />
    </div>
  );
};

export default cards;
