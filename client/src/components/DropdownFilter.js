import React, { useState, useEffect } from 'react';
import { FormControl, Select, Button, Box, MenuItem } from '@mui/material';
import "../styles/Solutions.css";
import * as assetService from "../services/assetService";
import ScrapeLoad from '../components/ScrapeLoad.js';


const DropdownFilter = () => {
  const [type, setType] = useState('all');
  const [product, setProduct] = useState('all');
  const [manufacturer, setManufacturer] = useState('all');
  const [assetNumber, setAssetNumber] = useState('');
  const [deviceName, setDeviceName] = useState('');

  const [assets, setAssets] = useState([]);


  useEffect(() => {
    const getAllAssets = async () => {
      try {
        const allAssets = await assetService.fetchAssets();
        if (allAssets) {
          setAssets(allAssets);
        }
      } catch (error) {
        console.error('Error fetching assets:', error);
      }
    };

    getAllAssets();
  }, []);


  const assetNumbers = assets.map((item) => item.assetNumber);
  const deviceNames = assets.map((item) => item.deviceName);
  const types = assets.map((item) => item.type);

  const data = {
    optionType: [
      { value: 'all', label: 'All' },
      { value: 'hw', label: 'Hardware' },
      { value: 'sw', label: 'Software' },
    ],
    optionProduct: {
      sw: [
        { value: 'na', label: 'Not Applicable' },
      ],
      hw: [
        { value: 'all', label: 'All' },
        { value: 'ap', label: 'Access Point' },
        { value: 'swi', label: 'Switch' },
        { value: 'rtr', label: 'Router' },
        { value: 'fw', label: 'Firewall' },
      ],
      all: [
        { value: 'all', label: 'All' },
        { value: 'ap', label: 'Access Point' },
        { value: 'swi', label: 'Switch' },
        { value: 'rtr', label: 'Router' },
        { value: 'fw', label: 'Firewall' },
        { value: 'na', label: 'Not Applicable' },
      ],
    },
    optionManufacturer: {
      all: [
        { value: 'all', label: 'All' },
        { value: 'cisco', label: 'Cisco' },
        { value: 'hp', label: 'HP' },
        { value: 'pa', label: 'Palo Alto' },
        { value: 'forti', label: 'Fortinet' },
        { value: 'aru', label: 'Aruba' },
        { value: 'aironet', label: 'Cisco Aironet' },
        { value: 'arista', label: 'Arista' },
        { value: 'others', label: 'Others' },
      ],
      ap: [
        { value: 'aru', label: 'Aruba' },
        { value: 'aironet', label: 'Cisco Aironet' },
      ],
      swi: [
        { value: 'cisco', label: 'Cisco' },
        { value: 'hp', label: 'HP' },
        { value: 'arista', label: 'Arista' },
      ],
      rtr: [
        { value: 'cisco', label: 'Cisco' },
        { value: 'hp', label: 'HP' },
        { value: 'arista', label: 'Arista' },
      ],
      fw: [
        { value: 'pa', label: 'Palo Alto' },
        { value: 'forti', label: 'Fortinet' },
      ],
      na: [
        { value: 'others', label: 'Others' },
      ],
    },
    optionassetNumber: 
    assetNumbers.map((assetNumber) => ({
      value: assetNumber,
      label: assetNumber,
    })),
    optiondeviceName: 
    deviceNames.map((deviceName) => ({
      value: deviceName,
      label: deviceName,
    })),
  }


const handleTypeChange = (event) => {
  setType(event.target.value);
  setProduct('all');
  setManufacturer('all');
  setAssetNumber('all');
  setDeviceName('all');
};

const handleProductChange = (event) => {
  const selectedType = event.target.value;
  setProduct(selectedType);
};

const handleManufacturerChange = (event) => {
  setManufacturer(event.target.value);
};

const handleAssetNumberChange = (event) => {
  setAssetNumber(event.target.value);
};

const handleDeviceNameChange = (event) => {
  setDeviceName(event.target.value);
};

const handleCollectSelections = () => {
  <ScrapeLoad
    selectedType={type}
    selectedProduct={product}
    selectedManufacturer={manufacturer}
    selectedAssetNumber={assetNumber}
    selectedDeviceName={deviceName}
  />
  {console.log("Selection: ", type, product, manufacturer)}
};

useEffect(() => {

}, [type, product, manufacturer, assetNumber, deviceName]);


return (
  <div>
    <Box sx={{ overflow: 'auto' }}>
      <FormControl fullWidth>
        Type:
        <Select value={type} onChange={handleTypeChange}>
          {data.optionType.map((option) => (
            <MenuItem value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
    <br />
    <Box sx={{ overflow: 'auto' }}>
      <FormControl fullWidth>
        Product:
        <Select value={product} onChange={handleProductChange}>
          {(data.optionProduct[type] || []).map((option) => (
            <MenuItem value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
    <br />
    <Box sx={{ overflow: 'auto' }}>
      <FormControl fullWidth>
        Manufacturer:
        <Select value={manufacturer} onChange={handleManufacturerChange}>
          {(data.optionManufacturer[product] || []).map((option) => (
            <MenuItem value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
    <br />

    <Box sx={{ overflow: 'auto' }}>
      <FormControl fullWidth>
        Asset Number:
        <Select value={assetNumber} onChange={handleAssetNumberChange}>
          {data.optionassetNumber.map((option) => (
            <MenuItem value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
    <br />
    <Box sx={{ overflow: 'auto' }}>
      <FormControl fullWidth>
        Device Name:
        <Select value={deviceName} onChange={handleDeviceNameChange}>
          {data.optiondeviceName.map((option) => (
            <MenuItem value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>

    <br />
    <Button variant="contained" onClick={handleCollectSelections}>
        Filter
      </Button>

  </div >
)
};

export default DropdownFilter;

