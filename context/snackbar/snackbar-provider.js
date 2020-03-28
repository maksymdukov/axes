import React, { useState } from "react";
import { SnackbarContext } from "./snackbar-context";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(({ palette }) => ({
  snack: {
    backgroundColor: palette.secondary.light,
    color: palette.secondary.contrastText
  }
}));

const SnackbarProvider = ({ children }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(null);
  const handleOpen = ({ message, action }) => setOpen({ message, action });
  const handleClose = () => setOpen(null);
  return (
    <SnackbarContext.Provider value={{ open: handleOpen, close: handleClose }}>
      {children}
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left"
        }}
        open={!!open}
        autoHideDuration={4000}
        ContentProps={{ className: classes.snack }}
        onClose={handleClose}
        message={open && open.message && open.message(handleClose)}
        action={
          <React.Fragment>
            {open && open.action && open.action(handleClose)}
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleClose}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
    </SnackbarContext.Provider>
  );
};

export default SnackbarProvider;
