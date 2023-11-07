import React from "react";
import { Button as MuiButton } from "@mui/material";

const Button = (props) => {
  const { text, size, color, variant, onClick, ...other } = props;

  return (
    <MuiButton
      sx={{ m: 1, p: 1 }}
      variant={variant || "contained"}
      size={size || "small"}
      color={color || "primary"}
      onClick={onClick}
      {...other}
    >
      {text}
    </MuiButton>
  );
};

export default Button;
