import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(({ palette }) => ({
  ctaBtn: {
    // backgroundColor: palette.secondary.dark,
    // color: palette.success.contrastText
  }
}));

const CtaButton = ({ children, ...rest }) => {
  const classes = useStyles();
  return (
    <Button
      variant="contained"
      color="secondary"
      className={classes.ctaBtn}
      {...rest}
    >
      {children}
    </Button>
  );
};

export default CtaButton;
