import React from "react";
import { TextField, Stack } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
export default function Datepicker(props) {
  const { name, label, value, onChange } = props;

  const convertToDefEventPara = (name, value) => ({
    target: {
      name,
      value,
    },
  });

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Stack sx={{ width: "90%", m: 1.5 }}>
        <DatePicker
          inputVariant="outlined"
          renderInput={(params) => <TextField {...params} />}
          label={label}
          name={name}
          value={dayjs(value)}
          onChange={(date) => onChange(convertToDefEventPara(name, date))}
        />
      </Stack>
    </LocalizationProvider>
  );
}
