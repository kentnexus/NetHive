import React, { useState, useEffect } from "react";
import { FormControl, Select, Button, Box, MenuItem } from "@mui/material";
import "../styles/Solutions.css";
import * as assetService from "../services/assetService";
import ScrapeLoad from "../components/ScrapeLoad.js";
import ScrapeDisplay from "./ScrapeDisplay.js";
import SolutionList from "./SolutionList.js";

const DropdownFilter = (props) => {
  const { dataScraped, filteredData, setFilteredData } = props;
  const [type, setType] = useState("all");
  const [product, setProduct] = useState("all");
  const [manufacturer, setManufacturer] = useState("all");
  const [assetNumber, setAssetNumber] = useState("all");
  const [deviceName, setDeviceName] = useState("all");

  const [assets, setAssets] = useState([]);

  useEffect(() => {
    const getAllAssets = async () => {
      try {
        const allAssets = await assetService.fetchAssets();
        if (allAssets) {
          setAssets(allAssets);
        }
      } catch (error) {
        console.error("Error fetching assets:", error);
      }
    };

    getAllAssets();
  }, []);

  const assetNumbers = assets.map((item) => item.assetNumber);
  const deviceNames = assets.map((item) => item.device_name);

  const data = {
    optionType: [
      { value: "all", label: "All" },
      { value: "hw", label: "Hardware" },
      { value: "sw", label: "Software" },
    ],
    optionProduct: {
      sw: [{ value: "na", label: "Not Applicable" }],
      hw: [
        { value: "all", label: "All" },
        { value: "accesspoint", label: "Access Point" },
        { value: "swi", label: "Switch" },
        { value: "router", label: "Router" },
        { value: "firewall", label: "Firewall" },
      ],
      all: [
        { value: "all", label: "All" },
        { value: "accesspoint", label: "Access Point" },
        { value: "switch", label: "Switch" },
        { value: "router", label: "Router" },
        { value: "firewall", label: "Firewall" },
        { value: "na", label: "Not Applicable" },
      ],
    },
    optionManufacturer: {
      all: [
        { value: "all", label: "All" },
        { value: "cisco", label: "Cisco" },
        { value: "hp", label: "HP" },
        { value: "paloalto", label: "Palo Alto" },
        { value: "fortinet", label: "Fortinet" },
        { value: "aruba", label: "Aruba" },
        { value: "aironet", label: "Cisco Aironet" },
        { value: "arista", label: "Arista" },
        { value: "others", label: "Others" },
      ],
      accesspoint: [
        { value: "aruba", label: "Aruba" },
        { value: "aironet", label: "Cisco Aironet" },
      ],
      switch: [
        { value: "cisco", label: "Cisco" },
        { value: "hp", label: "HP" },
        { value: "arista", label: "Arista" },
      ],
      router: [
        { value: "cisco", label: "Cisco" },
        { value: "hp", label: "HP" },
        { value: "arista", label: "Arista" },
      ],
      firewall: [
        { value: "paloalto", label: "Palo Alto" },
        { value: "fortinet", label: "Fortinet" },
      ],
      na: [{ value: "others", label: "Others" }],
    },
    optionassetNumber: [
      { value: "all", label: "All" },
      ...assetNumbers.map((assetNumber) => ({
        value: assetNumber,
        label: assetNumber,
      })),
    ],
    optiondeviceName: [
      { value: "all", label: "All" },
      ...deviceNames.map((deviceName) => ({
        value: deviceName,
        label: deviceName,
      })),
    ],
  };

  const handleTypeChange = (event) => {
    setType(event.target.value);
    setProduct("all");
    setManufacturer("all");
    setAssetNumber("all");
    setDeviceName("all");
  };

  const handleProductChange = (event) => {
    const selectedType = event.target.value;
    setProduct(selectedType);
  };

  const handleManufacturerChange = (event) => {
    const selectedType = event.target.value;
    setManufacturer(selectedType);
  };

  const handleAssetNumberChange = (event) => {
    setAssetNumber(event.target.value);
  };

  const handleDeviceNameChange = (event) => {
    setDeviceName(event.target.value);
  };

  const handleCollectSelections = () => {
    // setFilteredData(dataScraped);
    // filData = dataScraped;

    let filtered_data = dataScraped;
    // console.log("Filter:", product);
    // console.log(dataScraped[0].product);

    if (product && product !== "all" && product !== "na") {
      const productLowerCase = product.toLowerCase();
      // console.log("product:", productLowerCase);

      // console.log("all data", filtered_data);
      filtered_data = filtered_data.filter(
        (item) =>
          item.product.toLowerCase().includes(productLowerCase) ||
          item.productdesc.toLowerCase().includes(productLowerCase)
      );
    }
    if (manufacturer && manufacturer !== "all") {
      console.log("manufacturer: ", manufacturer);
      const manufacturerLowerCase = manufacturer.toLowerCase();

      filtered_data = filtered_data.filter((item) =>
        // item.manufacturer.toLowerCase().includes(manufacturerLowerCase) ||
        item.productdesc.toLowerCase().includes(manufacturerLowerCase)
      );
    }
    console.log("after filters: ", filtered_data);

    setFilteredData(filtered_data);
    // console.log("filtered data", filteredData);

    //   if (selectedProduct && selectedProduct !== 'all') {
    //     const productLowerCase = selectedProduct.toLowerCase();
    //     // Check for specific product types
    //     if (selectedProduct === 'accesspoint' || selectedProduct === 'switch' || selectedProduct === 'router' || selectedProduct === 'firewall') {
    //       filteredResults = filteredResults.filter(item => item.product.toLowerCase() === selectedProduct || item.productdesc.toLowerCase().includes(productLowerCase));
    //       console.log('Filter: ', selectedProduct)
    //       console.log('Result: ', filteredResults)
    //     } else if (selectedProduct === 'na') {
    //       filteredResults = filteredResults.filter(item => item.product.toLowerCase() !== 'na');
    //       console.log('Filter: ', selectedProduct)
    //       console.log('Result: ', filteredResults)
    //     }
    //   }
    //   if (selectedManufacturer && selectedManufacturer !== 'all') {
    //     const manufacturerLowerCase = selectedManufacturer.toLowerCase();
    //     filteredResults = filteredResults.filter(item => item.manufacturer.toLowerCase().includes(manufacturerLowerCase) || item.productdesc.toLowerCase().includes(manufacturerLowerCase));
    //   }
  };

  useEffect(() => {}, [type, product, manufacturer, assetNumber, deviceName]);

  return (
    <div>
      <Box sx={{ overflow: "auto" }}>
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
      <Box sx={{ overflow: "auto" }}>
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
      <Box sx={{ overflow: "auto" }}>
        <FormControl fullWidth>
          Manufacturer:
          <Select value={manufacturer} onChange={handleManufacturerChange}>
            {(
              data.optionManufacturer[type] ||
              data.optionManufacturer[product] ||
              []
            ).map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <br />

      {/* <Box sx={{ overflow: "auto" }}>
        <FormControl fullWidth>
          Asset Number:
          <Select value={assetNumber} onChange={handleAssetNumberChange}>
            {data.optionassetNumber.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <br />
      <Box sx={{ overflow: "auto" }}>
        <FormControl fullWidth>
          Device Name:
          <Select value={deviceName} onChange={handleDeviceNameChange}>
            {data.optiondeviceName.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box> */}

      {/* <br /> */}
      <Button
        variant="secondary"
        sx={{ p: 1, fontSize: "1rem" }}
        onClick={handleCollectSelections}
      >
        Filter
      </Button>
    </div>
  );
};

export default DropdownFilter;
