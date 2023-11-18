import React, { useState, useEffect } from 'react';
import { FormControl, Select, InputLabel, Box, MenuItem } from '@mui/material';
import "../styles/Solutions.css";

const DropdownFilter = () => {
  const [type, setType] = useState(1);
  const [product, setProduct] = useState(1);
  const [manufacturer, setManufacturer] = useState(1);
  const [assetNumber, setAssetNumber] = useState(1);
  const [deviceName, setDeviceName] = useState(1);

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
        { value: 1, label: 'All' },
        { value: 2, label: 'Cisco' },
        { value: 3, label: 'HP' },
        { value: 4, label: 'Palo Alto' },
        { value: 5, label: 'Fortinet' },
        { value: 6, label: 'Aruba' },
        { value: 7, label: 'Cisco Aironet' },
        { value: 8, label: 'Arista' },
        { value: 50, label: 'Others' },
      ],
      ap: [
        { value: 6, label: 'Aruba' },
        { value: 7, label: 'Cisco Aironet' },
      ],
      swi: [
        { value: 2, label: 'Cisco' },
        { value: 3, label: 'HP' },
        { value: 8, label: 'Arista' },
      ],
      rtr: [
        { value: 2, label: 'Cisco' },
        { value: 3, label: 'HP' },
        { value: 8, label: 'Arista' },
      ],
      fw: [
        { value: 4, label: 'Palo Alto' },
        { value: 5, label: 'Fortinet' },
      ],
      na: [
        { value: 50, label: 'Others' },
      ],

      assetNumber: [
        // Include your asset number options here
      ],
      deviceName: [
        // Include your device name options here
      ],
    },
  };

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

  useEffect(() => {
  }, [type, product, manufacturer, assetNumber, deviceName]);

  return (
    <div>
      <Box sx={{ overflow: 'auto' }}>
        <FormControl fullWidth>
          Type:
          <Select value={type} onChange={handleTypeChange}>
            {data.optionType.map((option) => (
              <MenuItem key={option.value} value={option.value}>
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
              <MenuItem key={option.value} value={option.value}>
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
              <MenuItem key={option.value} value={option.value}>
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
            {/* Load options dynamically from the database */}
            {/* Example: */}
            {/* <MenuItem value={1}>Asset 1</MenuItem> */}
          </Select>
        </FormControl>
      </Box>
      <br />
      <Box sx={{ overflow: 'auto' }}>
        <FormControl fullWidth>
          Device Name:
          <Select value={deviceName} onChange={handleDeviceNameChange}>
            {/* Load options dynamically from the database */}
            {/* Example: */}
            {/* <MenuItem value={1}>Device 1</MenuItem> */}
          </Select>
        </FormControl>
      </Box>
    </div >
  );
};

export default DropdownFilter;

