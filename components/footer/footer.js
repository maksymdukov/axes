import React from "react";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import Contacts from "../contacts/profile/contacts";

const useStyles = makeStyles(({ palette, spacing }) => ({
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
  contacts: {
    display: "flex",
    padding: "2rem 0",
    justifyContent: "space-around",
    "& a span": {
      color: palette.primary.contrastText
    }
  },
  copyright: {
    backgroundColor: palette.primary.main
  }
}));

const Footer = () => {
  const classes = useStyles();
  return (
    <footer className={classes.footerWrapper}>
      <Container component="section" className={classes.footer}>
        <Contacts className={classes.contacts} />
      </Container>
      <section className={classes.copyright}>
        <Container>
          Copyright © 2020 Smolyarskiy Axe. All Rights Reserved.
        </Container>
      </section>
    </footer>
  );
};

export default Footer;
