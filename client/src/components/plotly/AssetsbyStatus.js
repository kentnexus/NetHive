import React from "react";
import Plotly from "react-plotly.js";

const {cost, counts, convertArrayToObject} = require("../../functions/analytics.js")

const AssetsbyStatus = (assets) => {

    assets = assets.children
    let stats = []
  
    for (let i=0; i<assets.length;i++){
        stats.push(assets[i]['status'])
    }

    const statsList = counts(stats)

  return (
    <div>
      <Plotly 
        data = {[{
          type: 'bar',
          y: Object.values(statsList),
          x: Object.keys(statsList),         
          marker: {
            color: 'rgb(205, 152, 36)'
        },
      }]}
        layout={{       
          title: {
            text:"<b>Asset Status",
            font: {size:18},
        },
          autosize: true,
        //   paper_bgcolor: "white",
          width: 400,
          height: 350,
          margin: { t: 75, b: 75, l: 50, r: 40},
          bargap: 0.05,
        }}
      />
    </div>
  );
};

export default AssetsbyStatus;
