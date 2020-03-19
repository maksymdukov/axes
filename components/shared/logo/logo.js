import React from "react";
import AxeIcon from "../icons/axe";
import Link from "next/link";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  link: {
    color: "inherit",
    transition: "color .2s linear",
    "&:hover": {
      color: theme.palette.secondary.light
    }
  }
}));

const Logo = ({ className }) => {
  const classes = useStyles();
  return (
    <Link href="/">
      <a href="/" className={clsx(className, classes.link)}>
        <AxeIcon fontSize="large" />
      </a>
    </Link>
  );
};

export default Logo;
