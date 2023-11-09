import React from "react";
import { FormControl,Select,InputLabel,Box, MenuItem} from '@mui/material';
import "../styles/SolutionsStyle.css";


function RenderingArrayOfObjects() {
  const data = [
      {
        product: 'Cisco Catalyst 9200L - Network Essentials - switch - 48 ports - rack-mountable',
        model: 'MFG#: C9200L-48P-4G-E',
        price: '$2,993.99',
        url: '/product/cisco-catalyst-9200l-network-essentials-switch-48-ports-rack-mounta/5400548?pfm=srh'
      },
      {
        product: 'Fortinet FortiSwitch 148F-POE - switch - 48 ports - managed - rack-mountable',
        model: 'MFG#: FS-148F-POE',
        price: '$1,561.99',
        url: '/product/fortinet-fortiswitch-148f-poe-switch-48-ports-managed-rack-mountabl/6289390?pfm=srh'
      },
      {
        product: 'Extreme Networks ExtremeSwitching 5320-48P-8XE - switch - 48 ports - managed - rack-mountable',
        model: 'MFG#: 5320-48P-8XE',
        price: '$5,742.99',
        url: '/product/extreme-networks-5320-48x-10-100-1k-baset-switch/6754959?pfm=srh'
      },
  ];
  const listItems = data.map((element) => {
      return (
        <Box >
              <li>Product: {element.product}</li>
              <li>Model: {element.model}</li>
              <li>Price: {element.price}</li>
              <li>URL: {element.url}</li>
              <br/>
        </Box>
      );
  });
  return <div className="container">{listItems}</div>;
}

const RecoLists = () => {
  const [asset, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <div className="sscontainer">
    <div className="column">
    <h3>Lists of Assets</h3>
    <Box sx={{ overflow: 'auto' }}>
      <FormControl fullWidth>
      <InputLabel >Selected asset</InputLabel>
        <Select
          value={asset}
          onChange={handleChange}
          >  
          {/* pool of network device here  */}
          <MenuItem value={1}>NH0004351</MenuItem>
          <MenuItem value={2}>NH0004352</MenuItem>
          <MenuItem value={3}>NH0004353</MenuItem>
         </Select> 
         </FormControl>
         </Box>
         </div>
      
      <div className="column">
        <h3>Lists of Available Solutions</h3>
        <RenderingArrayOfObjects/>
      </div>
    </div>
  );
};

export default RecoLists;
