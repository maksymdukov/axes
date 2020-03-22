import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import NavmenuItem from "./elements/navmenu-item";
import { useTranslation } from "next-translate";
import clsx from "clsx";

const navMenuItems = t => [
  { label: t`common:nav.about`, to: "/about" },
  { label: t`common:nav.axes`, to: "/axes" },
  { label: t`common:nav.contacts`, to: "/contacts" }
];

const useStyles = makeStyles({
  linkWrapper: {
    display: "flex"
  },
  inDrawer: {
    flexDirection: "column"
  }
});

const Navmenu = ({ inDrawer, onClick }) => {
  const classes = useStyles();
  const { t } = useTranslation();
  return (
    <div
      className={clsx(classes.linkWrapper, inDrawer && classes.inDrawer)}
      onClick={onClick}
    >
      {navMenuItems(t).map(link => (
        <NavmenuItem key={link.to} link={link} />
      ))}
    </div>
  );
};

export default Navmenu;
