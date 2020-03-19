import React from "react";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(({ palette }) => ({
  mainHeader: {
    backgroundColor: "white",
    position: "relative",
    boxShadow: "0 0 10px 20px #fff",
    "&:after": {
      content: '""',
      display: "block",
      width: "50%",
      height: "2px",
      position: "absolute",
      bottom: 0,
      left: "25%",
      backgroundColor: palette.secondary.light
    }
  }
}));

const MainHeader = ({ children, disableMargin }) => {
  const classes = useStyles();
  return (
    <Box marginBottom={disableMargin ? 0 : 3} clone>
      <Typography variant="h4" align="center" component="h2">
        <span className={classes.mainHeader}>{children}</span>
      </Typography>
    </Box>
  );
};

export default MainHeader;
