import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(({ palette, shadows }) => ({
  ctaBtn: {
    backgroundColor: palette.secondary.light,
    borderRadius: 0,
    border: "none",
    color: palette.success.contrastText,
    boxShadow: shadows[2],
    transition: "transform .15s linear",
    "&:hover": {
      border: "none",
      transform: "translateY(-3px)",
      backgroundColor: palette.secondary.main,
      boxShadow: shadows[10]
    }
  },
  large: {
    fontWeight: "400",
    fontSize: "1.3rem"
  }
}));

const CtaButton = React.forwardRef(({ children, ...rest }, ref) => {
  const classes = useStyles();
  return (
    <Button
      ref={ref}
      variant="contained"
      color="secondary"
      classes={{
        containedSecondary: classes.ctaBtn,
        sizeLarge: classes.large
      }}
      {...rest}
    >
      {children}
    </Button>
  );
});

export default CtaButton;
