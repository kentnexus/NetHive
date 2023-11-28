import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup as MuiRadioGroup,
} from "@mui/material";
import React from "react";

const RadioGroup = (props) => {
  const { name, label, value, onChange, items } = props;
  // console.log(items);
  return (
    <FormControl sx={{ m: 2 }}>
      <FormLabel>{label}</FormLabel>
      <MuiRadioGroup row name={name} value={value} onChange={onChange}>
        {items.map((item) => {
          <FormControlLabel
            value={item.value}
            control={<Radio />}
            label={item.title}
          />;
        })}
        <FormControlLabel value="false" control={<Radio />} label="Deactive" />
        <FormControlLabel value="true" control={<Radio />} label="Active" />
      </MuiRadioGroup>
    </FormControl>
  );
};

export default RadioGroup;
