import React, { useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { Hidden } from "@material-ui/core";
import Navmenu from "../shared/navmenu/navmenu";
import Logo from "./components/logo";
import { useTranslation } from "next-translate";
import LanguageToggler from "./components/language-toggler";
import Drawer from "./components/drawer";
import CartWidget from "../cart/cart-widget";

const useStyles = makeStyles(({ palette, spacing }) => ({
  appbar: {
    background: `linear-gradient(90deg, ${palette.primary.main} 0%, ${palette.primary.dark} 100%)`
  },
  root: {
    flexGrow: 1
  },
  logo: {
    marginRight: "auto"
  },
  menuButton: {
    marginRight: spacing(2)
  },
  language: {
    marginLeft: spacing(2)
  }
}));

const Navbar = () => {
  const [drawerOpened, setDrawerOpened] = useState(false);
  const { t } = useTranslation();
  const classes = useStyles();

  const toggleDrawer = () => {
    setDrawerOpened(!drawerOpened);
  };
  return (
    <>
      <AppBar className={classes.appbar} position="static" color="primary">
        <Toolbar>
          <Hidden smUp implementation="css">
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer}
            >
              <MenuIcon />
            </IconButton>
          </Hidden>
          <Logo className={classes.logo} slogan={t("common:slogan")} />
          <LanguageToggler className={classes.language} />
          <Hidden xsDown implementation="css">
            <Navmenu />
          </Hidden>
          <CartWidget />
        </Toolbar>
      </AppBar>
      <Drawer isOpened={drawerOpened} toggleDrawer={toggleDrawer} />
    </>
  );
};

export default Navbar;
