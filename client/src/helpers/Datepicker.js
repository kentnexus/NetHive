import React from "react";
import DatePicker from "@mui/lab/DatePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { TextField, Stack } from "@mui/material";

export default function Datepicker(props) {
  const { name, label, value, onChange } = props;

  const convertToDefEventPara = (name, value) => ({
    target: {
      name,
      value,
    },
  });

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Stack sx={{ width: "90%", m: 1.5 }}>
        <DatePicker
          inputVariant="outlined"
          renderInput={(params) => <TextField {...params} />}
          label={label}
          name={name}
          value={value}
          onChange={(date) => onChange(convertToDefEventPara(name, date))}
        />
      </Stack>
    </LocalizationProvider>
  );
}