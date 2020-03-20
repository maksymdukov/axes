import React from "react";
import { Drawer as MuiDrawer } from "@material-ui/core";
import Navmenu from "../../shared/navmenu/navmenu";
import Logo from "./logo";
import { makeStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";

const useStyles = makeStyles(({ spacing }) => ({
  logo: {
    alignSelf: "center",
    padding: spacing(5),
    fontSize: "5rem"
  }
}));

const Drawer = ({ isOpened, toggleDrawer }) => {
  const classes = useStyles();
  return (
    <MuiDrawer anchor="left" open={isOpened} onClose={toggleDrawer}>
      <Logo className={classes.logo} onClick={toggleDrawer} size="inherit" />
      <Divider />
      <Navmenu inDrawer onClick={toggleDrawer} />
    </MuiDrawer>
  );
};

export default Drawer;
