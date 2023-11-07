import React from "react";
import {useState} from "react";
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
  const initialData = [
    { id: 1, type: 'Both', product: 'All',manufacturer:'All',customer_account: 'All', asset_number:'All', device_name: 'All' },
  ];

  const [selection, setData] = useState(initialData);
  const [filters, setFilters] = useState({
    type:'',
    product:'',
    manufacturer:'',
    customer_account: '',
    asset_number: '',
    device_name: '',
  });


  const handleChange = (event) => {
    setData(event.target.value);
  };

  return (
    <div className="sscontainer">
    <div className="column">
    <h3>Select an option </h3>
  
         <Box sx={{ overflow: 'auto' }}>
         <FormControl fullWidth>
         <label style={{margin: '5px'}}>Type</label>
        <Select
          value={selection}
          onChange={handleChange}
          >  
          {/* pool of network device here  */}
          <MenuItem value={1}>Both</MenuItem>
          <MenuItem value={2}>Hardware</MenuItem>
          <MenuItem value={3}>Software</MenuItem>
         </Select> 
         </FormControl>
         </Box> 

         <Box sx={{ overflow: 'auto' }}>
         <FormControl fullWidth>
         <label style={{margin: '5px'}}>Product</label>
        <Select
          value={selection}
          onChange={handleChange}
          >  
          {/* pool of network device here  */}
          <MenuItem value={5}>All</MenuItem>
          <MenuItem value={6}>AP</MenuItem>
          <MenuItem value={7}>Workstation</MenuItem>
          <MenuItem value={8}>Printer</MenuItem>
          <MenuItem value={9}>Switch</MenuItem>
          <MenuItem value={10}>Router</MenuItem>
          <MenuItem value={11}>Firewall</MenuItem>
          <MenuItem value={12}>Not Applicable</MenuItem>
         </Select> 
         </FormControl>
         </Box> 

         <Box sx={{ overflow: 'auto' }}>
         <FormControl fullWidth>
         <label style={{margin: '5px'}}>Manufacturer</label>
        <Select
          value={selection}
          onChange={handleChange}
          >  
          <MenuItem value={20}>All</MenuItem>
          <MenuItem value={21}>MAC</MenuItem>
          <MenuItem value={22}>Dell</MenuItem>
          <MenuItem value={23}>HP</MenuItem>
          <MenuItem value={24}>Cisco</MenuItem>
          <MenuItem value={25}>Arista</MenuItem>
          <MenuItem value={26}>Palo Alto</MenuItem>
          <MenuItem value={26}>Fortinet</MenuItem>
          <MenuItem value={26}>Aruba</MenuItem>
         </Select> 
         </FormControl>
         </Box> 
         
         <Box sx={{ overflow: 'auto' }}>
         <FormControl fullWidth>
         <label style={{margin: '5px'}}>Customer Account</label>
        <Select
          value={selection}
          onChange={handleChange}
          >  
          {/* pool of customer account here  */}
          <MenuItem value={40}>XYZ</MenuItem>
         </Select> 
         </FormControl>
         </Box> 

         <Box sx={{ overflow: 'auto' }}>
         <FormControl fullWidth>
         <label style={{margin: '5px'}}>Asset Number</label>
        <Select
          value={selection}
          onChange={handleChange}
          >  
          {/* pool of network device here  */}
          <MenuItem value={50}>NH000153</MenuItem>
         </Select> 
         </FormControl>
         </Box> 

         <Box sx={{ overflow: 'auto' }}>
         <FormControl fullWidth>
         <label style={{margin: '5px'}}>Device Name</label>
        <Select
          value={selection}
          onChange={handleChange}
          >  
          {/* pool of network device here  */}
          <MenuItem value={30}>XYZ-0045</MenuItem>
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
