import React from "react";
import { default as MuiBreadCrumbs } from "@material-ui/core/Breadcrumbs";
import Link from "../link/link";
import { useTranslation } from "next-translate";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles({
  crumbs: {
    margin: "1rem 0"
  }
});

const WithBreadcrumbs = ({ paths, children }) => {
  const classes = useStyles();
  const { t } = useTranslation();
  return (
    <>
      <MuiBreadCrumbs className={classes.crumbs} aria-label="breadcrumb">
        <Link color="inherit" href="/">
          {t("common:nav.main")}
        </Link>
        {paths.map((path, idx) => {
          let props = {
            key: idx,
            color: "inherit"
          };
          if (idx !== paths.length - 1) {
            props.href = path.href;
            props.as = path.as;
          }
          const Component = idx === paths.length - 1 ? Typography : Link;
          return (
            <Component {...props}>
              {path.label ? t(path.label) : path.pureLabel}
            </Component>
          );
        })}
      </MuiBreadCrumbs>
      {children}
    </>
  );
};

export default WithBreadcrumbs;
