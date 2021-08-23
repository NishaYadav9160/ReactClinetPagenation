import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@material-ui/core";
import React from "react";

function Conformdialog(props) {
  const { ConfromDailog, setConfirmDialog } = props;

  return (
    <Dialog open={ConfromDailog.isOpen}>
      <DialogTitle></DialogTitle>
      <DialogContent>
        <Typography variant="h6">{ConfromDailog.title}</Typography>
        <Typography variant="subtitle2">{ConfromDailog.subTitle}</Typography>
        <DialogActions>
          <Button text="No" color="default" />
          <Button text="Yes" color="secondary" />
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
}

export default Conformdialog;
