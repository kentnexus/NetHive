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
    <div style={{
      backgroundColor: 'white', 
      borderRadius: '15px',
      padding: '10px 5px',
      marginBottom: '10px'}}>
      <Plotly 
        data = {[{
          type: 'bar',
          y: Object.values(statsList),
          x: Object.keys(statsList),     
          text: Object.values(statsList),    
          textposition: 'outside',   
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
          height: 390,
          margin: { t: 30, b: 25, l: 50, r: 20},
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
