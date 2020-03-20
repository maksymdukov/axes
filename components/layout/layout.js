import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Navbar from "../navbar/navbar";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles(({ palette, spacing }) => ({
  wrapper: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column"
  },
  main: {
    flexGrow: 1,
    paddingBottom: spacing(4)
  },
  footerWrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    backgroundColor: palette.primary.light,
    color: palette.primary.contrastText,
    minHeight: 200
  },
  footer: {
    flexGrow: 1
  },
  copyright: {
    backgroundColor: palette.primary.main
  }
}));

const Layout = ({ children }) => {
  const classes = useStyles();
  return (
    <div className={classes.wrapper}>
      <Navbar />
      <main className={classes.main}>{children}</main>
      <footer className={classes.footerWrapper}>
        <Container component="section" className={classes.footer}>
          asd
        </Container>
        <section className={classes.copyright}>
          <Container>
            Copyright © 2020 Smolyarskiy Axe. All Rights Reserved.
          </Container>
        </section>
      </footer>
    </div>
  );
};

export default Layout;
