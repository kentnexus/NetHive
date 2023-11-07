import {
  FormControl,
  FormHelperText,
  InputLabel,
  Menu,
  MenuItem,
  Select as MuiSelect,
} from "@mui/material";
import React from "react";

const Select = (props) => {
  const { name, label, value, error = null, onChange, options } = props;

  return (
    <FormControl
      variant="outlined"
      sx={{ width: "90%", m: 1 }}
      {...(error && { error: true })}
    >
      <InputLabel>{label}</InputLabel>
      <MuiSelect label={label} name={name} value={value} onChange={onChange}>
        <MenuItem value="">None</MenuItem>
        {options.map((item) => (
          <MenuItem key={item.id} value={item.title}>
            {item.title}
          </MenuItem>
        ))}
      </MuiSelect>
      {error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  );
};

export default Select;
