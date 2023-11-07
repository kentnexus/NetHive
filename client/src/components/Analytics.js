import React from "react";
import axios from "axios";

<<<<<<< HEAD
<<<<<<< HEAD
import Cards from "./plotly/Cards";
import CategorizedAssets from "./plotly/CategorizedAssets"
import AssetsByMan from "./plotly/AssetsbyMan";
import AssetsbyStatus from "./plotly/AssetsbyStatus";
import AssetsbyLocation from "./plotly/AssetsByLocation";
import ExpiredAssets from "./plotly/ExpiredAssets";
import ExpiringAssets from "./plotly/ExpiringAssets";


=======
>>>>>>> parent of c2be9c27 (Merge branch 'main' of https://github.com/kentnexus/NetHive)
=======
>>>>>>> parent of c2be9c27 (Merge branch 'main' of https://github.com/kentnexus/NetHive)
const Analytics = () => {

    async function getUser() {
        try {
          const response = await axios.get('/assets');
          console.log(response);
        } catch (error) {
          console.error(error);
        }
      }

<<<<<<< HEAD
<<<<<<< HEAD
  return (
    <div>
      {/* <h1 style={{
        margin:'5px 10px',
        // marginBottom: '20px',
        // backgroundColor: 'white',
        padding: '10px',
        fontSize: '20px',
        fontFamily: 'fantasy',
        color: 15,
      }}>ASSET MANAGEMENT DASHBOARD</h1> */}
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent:'center', 
        alignItems:'flex-start',
      }}>
          <div className="firstCol"
            style={{
              flexDirection: 'column',
              margin: '0 10px',
            }}>
            <CategorizedAssets>{assets}</CategorizedAssets>
            <AssetsByMan>{assets}</AssetsByMan>
          </div>
          <div className="secondCol">
            <AssetsbyStatus>{assets}</AssetsbyStatus>
            <AssetsbyLocation>{assets}</AssetsbyLocation>
          </div>
          <div className="thirdCol"
            style={{
              flexDirection: 'column',
              margin: '0 10px'
            }}>
            <Cards>{assets}</Cards>
            <h3>Expired Contracts (Last 15 Days)</h3>
            <ExpiredAssets>{assets}</ExpiredAssets>
            <h3>Expiring Contracts (Next 15 Days)</h3>
            <ExpiringAssets>{assets}</ExpiringAssets>
          </div>
      </div>
    </div>
  );
};

export default Analytics;
=======
=======
>>>>>>> parent of c2be9c27 (Merge branch 'main' of https://github.com/kentnexus/NetHive)
    return (
        <div>
            <h1>This is Dashboard Analytics</h1>
        </div>
    );
  };
  
<<<<<<< HEAD
  export default Analytics;
>>>>>>> parent of c2be9c27 (Merge branch 'main' of https://github.com/kentnexus/NetHive)
=======
  export default Analytics;
>>>>>>> parent of c2be9c27 (Merge branch 'main' of https://github.com/kentnexus/NetHive)
