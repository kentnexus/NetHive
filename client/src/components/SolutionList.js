import React from "react";
import { FormControl, Select, InputLabel, Box, MenuItem } from '@mui/material';
import "../styles/Solutions.css";
import LoadScrapedData from "../components/LoadScrapedData.js";



const SolutionList = () => {
  const [selection, setChoice] = React.useState('');

  const handleChange = (event) => {
    setChoice(event.target.value);
  };

  return (
    <div className="sscontainer">
      <div className="column">
        <h3>Filter the solutions </h3>

        <Box id="boxcon" sx={{ overflow: 'auto' }}>
          <FormControl fullWidth>
            Type:
            <InputLabel >Select a type</InputLabel>
            <Select
              value={selection}
              onChange={handleChange}
            >
              <MenuItem value={1}>All</MenuItem>
              <MenuItem value={2}>Software</MenuItem>
              <MenuItem value={3}>Hardware</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Box id="boxcon" sx={{ overflow: 'auto' }}>
          <FormControl fullWidth>
            Product:
            <InputLabel >Select a product</InputLabel>
            <Select
              value={selection}
              onChange={handleChange}
            >
              {/* pool of network device here  */}
              <MenuItem value={1}>All</MenuItem>
              <MenuItem value={2}>Access Point</MenuItem>
              <MenuItem value={3}>Switch </MenuItem>
              <MenuItem value={4}>Router </MenuItem>
              <MenuItem value={5}>Firewall </MenuItem>
              <MenuItem value={6}>Not Applicable </MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Box id="boxcon" sx={{ overflow: 'auto' }}>
          <FormControl fullWidth>
            Manufacturer:
            <InputLabel >Select a manufacturer</InputLabel>
            <Select
              value={selection}
              onChange={handleChange}
            >
              <MenuItem value={1}>All</MenuItem>
              <MenuItem value={2}>Cisco</MenuItem>
              <MenuItem value={3}>HP </MenuItem>
              <MenuItem value={4}>Palo Alto </MenuItem>
              <MenuItem value={5}>Fortinet </MenuItem>
              <MenuItem value={6}>Others </MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Box id="boxcon" sx={{ overflow: 'auto' }}>
          <FormControl fullWidth>
            Asset Number:
            <InputLabel >Select an asset number</InputLabel>
            <Select
              value={selection}
              onChange={handleChange}
            >
              {/* load from database */}
              <MenuItem value={1}>All</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Box id="boxcon" sx={{ overflow: 'auto' }}>
          <FormControl fullWidth>
            Device Name:
            <InputLabel >Select a device name</InputLabel>
            <Select
              value={selection}
              onChange={handleChange}
            >
              {/* load from database */}
              <MenuItem value={1}>All</MenuItem>
            </Select>
          </FormControl>
        </Box>

      </div>

      <div className="column">
        <h3>Lists of Available Solutions</h3>
        <div className="content">
          <LoadScrapedData />
        </div>
      </div>
    </div>
  );
};

export default SolutionList;
