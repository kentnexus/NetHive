import React from "react";

import { TextField } from "@mui/material";

export default function Input(props) {
  const { name, label, value, error = null, onChange, others } = props;

  return (
    <TextField
      sx={{ width: "90%", m: 1 }}
      variant="outlined"
      label={label}
      name={name}
      value={value}
      onChange={onChange}
      {...others}
      {...(error && { error: true, helperText: error })}
    />
  );
}