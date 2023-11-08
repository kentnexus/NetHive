import React from "react";
import Plotly from "react-plotly.js";

const {counts} = require("../../functions/analytics.js")

const AssetsbyStatus = (assets) => {

  assets = assets.children
  let stats = [], stat1 = [], stat2 = [], stat3 = [], stat4 = []

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
            text:"<b>Assets by Status",
            font: {size:18},
        },
          autosize: true,
          width: 350,
          height: 400,
          margin: { t: 75, b: 25, l: 50, r: 20},
          bargap: 0.05,
          font: {size:9},
          autosize: true,
          barmode: 'stack'
        }}
      />
    </div>
  );
};

export default AssetsbyStatus;
