import React from "react";
import Plotly from "react-plotly.js";

const {counts} = require("../../functions/analytics.js")

const AssetsByMan = (assets) => {
    
    assets = assets.children
    let manList = [], products = []
    
    for (let i=0; i<assets.length;i++){
        manList.push(assets[i]['manufacturer'])
    }
    
    const manCounts = counts(manList);
        
    return (
        <Plotly 
            data = {[{
                type: 'pie',
                values: Object.values(manCounts),
                labels: Object.keys(manCounts),
                textinfo: 'label+percent',
                marker: {
                    colors: ['rgb(177, 127, 38)', 'rgb(205, 152, 36)', 'rgb(99, 79, 37)', 'rgb(129, 180, 179)', 'rgb(124, 103, 37)']
                },
                // insidetextorientation: "radial"
            }]}
            layout = {{
                title: {
                    text:"<b>Assets by Vendor",
                    font: {size:18},
                },
                font: {size:9},
                width: 350,
                height: 400,
                margin: { t: 75, b: 50, l: 0, r: 0},
                showlegend: false,
                // legend: {
                //     orientation: 'h',
                //     font: {
                //         size: 11
                //     }
                // },
                autosize: true,
            }}
            config={{
                autosizable: true,
                responsive: true,
            }}
        />
        )
    }
    
    export default AssetsByMan;