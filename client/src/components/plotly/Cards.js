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
              title: {
                text:"Total Assets Cost",
                font: {
                  size: 16,
                }
              },
              // domain: { row: 0, column: 0 },
              domain: {x:[0,.5], y:[.6, .95]}
            }, 
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
              // domain: { row: 0, column: 1 },
              domain: {x:[.5,.9], y:[.6,.95]}
            },                 
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
              // domain: { row: 1, column: 0 },
              domain: {x:[0,.5], y:[0,.4]}
            },                
            {
              type: "indicator",
              mode: "number",
              number: {suffix: '%'},
              value: (statusList['Active']/activeAssets.length)*100,
              title: {
                text:"Asset Utilization",
                font: {
                  size: 16,
                }
              },
              // domain: { row: 1, column: 1 },
              domain: {x:[.5,.9], y:[0,.4]}
            },
            ]}
            layout={{
              title: {
                text:"<b>Assets & Contracts",
                font: {
                  size: 18,
                }
              },
              width: 600,
              height: 300,
              margin: { t: 75, b: 10, l: 0, r: 0 },
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
