import React from "react";
import Button from "@material-ui/core/Button";
import Link from "next/link";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  navLink: {
    transition: "color .2s linear",
    "&:hover": {
      backgroundColor: theme.palette.primary.light,
      color: theme.palette.secondary.light
    }
  }
}));

const NavmenuItem = ({ link }) => {
  const classes = useStyles();
  return (
    <Link key={link.to} href={link.to}>
      <Button
        className={classes.navLink}
        href={link.to}
        component="a"
        color="inherit"
      >
        {link.label}
      </Button>
    </Link>
  );
};

export default NavmenuItem;
