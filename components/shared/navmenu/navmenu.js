import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import NavmenuItem from "./elements/navmenu-item";

const navMenuItems = [
  { label: "Про нас", to: "/about" },
  { label: "Примеры работ", to: "/axes" },
  { label: "Контакты", to: "/contacts" }
];

const useStyles = makeStyles({
  linkWrapper: {
    display: "flex"
  }
});

const Navmenu = () => {
  const classes = useStyles();
  return (
    <div className={classes.linkWrapper}>
      {navMenuItems.map(link => (
        <NavmenuItem key={link.to} link={link} />
      ))}
    </div>
  );
};

export default Navmenu;
