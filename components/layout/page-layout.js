import React from "react";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(({ spacing }) => ({
  page: {
    marginTop: spacing(4)
  }
}));

const PageLayout = ({ children }) => {
  const classes = useStyles();
  return <Container className={classes.page}>{children}</Container>;
};

export default PageLayout;
