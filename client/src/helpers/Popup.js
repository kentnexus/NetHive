import {
    Dialog,
    DialogContent,
    DialogTitle,
    IconButton,
    Typography,
  } from "@mui/material";
  import React from "react";
  import Controls from "./Controls";
  import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
  const Popup = (props) => {
    const { title, children, openPopup, setOpenPopup } = props;
  
    return (
      <Dialog open={openPopup} maxWidth="md" sx={{ p: 2 }}>
        <DialogTitle>
          <div style={{ display: "flex" }}>
            <Typography variant="h5" component="div" style={{ flexGrow: 1 }}>
              {title}
            </Typography>
  
            <Controls.ActionButton onClick={() => setOpenPopup(false)}>
              <CloseRoundedIcon color="error" />
            </Controls.ActionButton>
          </div>
        </DialogTitle>
        <DialogContent>{children}</DialogContent>
      </Dialog>
    );
  };
  
  export default Popup;