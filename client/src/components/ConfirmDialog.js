import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import React from "react";
import Controls from "../helpers/Controls";

const ConfirmDialog = (props) => {
  const { confirmDialog, setConfirmDialog } = props;

  return (
    <Dialog open={confirmDialog.isOpen}>
      <DialogTitle></DialogTitle>
      <DialogContent>
        <Typography variant="h6">{confirmDialog.title}</Typography>
        <Typography variant="subtitle2">{confirmDialog.subTitle}</Typography>
      </DialogContent>
      <DialogActions>
        <Controls.Button
          text="No"
          color="inherit"
          onClick={() => setConfirmDialog({ ...confirmDialog, isOpen: false })}
        ></Controls.Button>

        <Controls.Button
          text="Yes"
          color="error"
          onClick={confirmDialog.onConfirm}
        ></Controls.Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
