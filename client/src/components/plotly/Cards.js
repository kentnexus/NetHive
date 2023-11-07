import React from "react";
import Plotly from "react-plotly.js";

const cards = (assets) => {

    assets = assets.children
    let totalAssets = 0
    let sw = [],  hw = []
  
    for (let i=0; i<assets.length;i++){
        if(!assets[i]['cost']){
            continue;
        }
        totalAssets+=assets[i]['cost'];
  
        if(assets[i]['asset_type']=='Software') {
          sw.push(assets[i]['device_name']);
        } else {
          hw.push(assets[i]['product']);
        }
    }

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
              domain: { x: [0, .5], y: [0, .5] }
            }, 
            {
              type: "indicator",
              mode: "number",
              value: assets.length,
              title: "Number of Assets",
              domain: { x: [0.5, 1], y: [0, .5] }
            },                 
            {
              type: "indicator",
              mode: "number",
              value: hw.length,
              title: "Hardware Count",
              domain: { x: [0, .5], y: [.5, 1] }
            },                {
              type: "indicator",
              mode: "number",
              value: sw.length,
              title: "Software Count",
              domain: { x: [0.5, 1], y: [.5, 1] }
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
              width: 700,
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
