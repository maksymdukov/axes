import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import MenuIcon from "@material-ui/icons/Menu";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { Hidden } from "@material-ui/core";
import Navmenu from "../shared/navmenu/navmenu";
import Logo from "../shared/logo/logo";

const useStyles = makeStyles(({ palette, spacing }) => ({
  appbar: {
    background: `linear-gradient(90deg, ${palette.primary.main} 0%, ${palette.primary.dark} 100%)`
  },
  root: {
    flexGrow: 1
  },
  logo: {
    marginRight: spacing(2)
  },
  menuButton: {
    marginRight: spacing(2)
  },
  title: {
    flexGrow: 1
  }
}));

const Navbar = () => {
  const classes = useStyles();
  return (
    <AppBar className={classes.appbar} position="static" color="primary">
      <Toolbar>
        <Hidden smUp>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
        </Hidden>
        <Logo className={classes.logo} />
        <Typography variant="h6" className={classes.title}>
          Топоры
        </Typography>
        <Navmenu />
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
