import React from "react";
import { Button } from "@mui/material";

const ActionButton = (props) => {
  const { children, onClick, ...other } = props;

  return (
    <Button onClick={onClick} {...other}>
      {children}
    </Button>
  );
};

export default ActionButton;
