import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Navbar from "../../navbar/navbar";

const useStyles = makeStyles({
  wrapper: {
    minHeight: "100vh"
  }
});

const Layout = ({ children }) => {
  const classes = useStyles();
  return (
    <div className={classes.wrapper}>
      <Navbar />
      <main>{children}</main>
    </div>
  );
};

export default Layout;
