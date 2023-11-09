import React from "react";
import Plotly from "react-plotly.js";

const {counts} = require("../../functions/analytics.js")

const AssetsbyLocation = (assets) => {

    assets = assets.children
    let loc = []
  
    for (let i=0; i<assets.length;i++){
        loc.push(assets[i]['location'])
    }

    const locList = counts(loc)

  return (
    <div>
      <Plotly 
        data = {[{
          type: 'bar',
          y: Object.values(locList),
          x: Object.keys(locList),         
          marker: {
            color: 'rgb(205, 152, 36)'
        },
      }]}
        layout={{       
          title: {
            text:"<b>Assets by Location",
            font: {size:18},
        },
          autosize: true,
        //   paper_bgcolor: "white",
          width: 350,
          height: 350,
          margin: { t: 75, b: 25, l: 50, r: 20},
          bargap: 0.05,
          font: {size:9}
        }}
      />
    </div>
  );
};

export default AssetsbyLocation;
