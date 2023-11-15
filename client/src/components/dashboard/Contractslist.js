import React, {
  useEffect,
  useState
} from "react";

import ExpiredAssets from "./ExpiredAssets";
import ExpiringAssets from "./ExpiringAssets";

import "../../styles/ContractsTab.css";

const Contractslist = (assets) => {

  assets = assets.children
  const [activeTab, setActiveTab] = useState("tab1");
  let assetList = []

  for (let i = 0; i < assets.length; i++) {
    if (assets[i]['status'] == 'Decommisioned' || assets[i]['status'] == 'Decommissioned') {
      continue;
    } else {
      // assetList.push(Object.assign({}, {
      //   assetNumber: assets[i]["assetNumber"],
      //   status: assets[i]["status"],
      //   device_name: assets[i]["device_name"],
      //   contracts_start_dt: assets[i]["contracts_start_dt"],
      //   contracts_end_dt: assets[i]["contracts_end_dt"],
      //   customer_account: assets[i]["customer_account"],
      //   product: assets[i]["product"],
      //   model: assets[i]["model"],
      //   manufacturer: assets[i]["manufacturer"],
      //   serial_number: assets[i]["serial_number"],
      //   }));
      assetList.push(assets[i])
    }
  }

  // console.log(assetList);

  const handleTab1 = () => {
    // update the state to tab1
    setActiveTab("tab1");
  };

  const handleTab2 = () => {
    // update the state to tab2
    setActiveTab("tab2");
  };

  return (
    <div>
        <ul className="nav">
          <li className={activeTab === "tab1" ? "active" : ""} 
          onClick={handleTab1}
          >Due Soon Contracts</li>
          <li className={activeTab === "tab2" ? "active" : ""}
          onClick={handleTab2}
          >Over Due Contracts</li>
        </ul>
        <div className="outlet" 
          style={{
            backgroundColor: 'white', 
            borderRadius: '15px',
            padding: '15px 5px',}}>
          {activeTab === "tab1" ? <ExpiringAssets>{assetList}</ExpiringAssets> : <ExpiredAssets>{assetList}</ExpiredAssets>}
        </div>
    </div>
  )
}

export default Contractslist;