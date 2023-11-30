import React from "react";
import Plotly from "react-plotly.js";

const {counts} = require("../../functions/analytics.js")

const CategorizedAssets = (assets) => {

    assets = assets.children
    let sw = [],  hw = [], parentsSB = ["","Assets","Assets"]
  
    for (let i=0; i<assets.length;i++){

      if(assets[i]['asset_type']=='Software') {
        sw.push(assets[i]['device_name']);
      } else {
        hw.push(assets[i]['product']);
      }
    }

    const hwList = counts(hw)
    const swList = counts(sw)
    
    for(let i = 0; i < Object.keys(hwList).length; i++){
      parentsSB.push("Hardware")
    }
  
    for(let i = 0; i < Object.keys(swList).length; i++){
      parentsSB.push("Software")
    }

  return (
    <div style={{
      backgroundColor: 'white', 
      borderRadius: '15px',
      padding: '10px 5px',
      marginBottom: '10px'}}>
      <Plotly 
        data = {[{
          type: "sunburst",
          labels: ["Assets","Hardware","Software"].concat(Object.keys(hwList)).concat(Object.keys(swList)),
          parents: parentsSB,
          values: [assets.length,hw.length,sw.length].concat(Object.values(hwList)).concat(Object.values(swList)),
          leaf: {"opacity":0.4},
          marker: {"line":{"width":2}},
          branchvalues: "total",                
          marker: {
            colors: ['rgb(177, 127, 38)', 'rgb(205, 152, 36)', 'rgb(99, 79, 37)', 'rgb(129, 180, 179)', 'rgb(124, 103, 37)']
        }
      },
        ]}
        layout={{       
          title: {
            text:"<b>Categorized Assets",
            font: {size:18},
        },
          // paper_bgcolor: "white",
          width: 350,
          height: 320,
          margin: { t: 30, b: 0, l: 0, r: 0},
          autosize: true,
        }}
      />
    </div>
  );
};

export default CategorizedAssets;
