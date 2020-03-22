import React from "react";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import Contacts from "../contacts/profile/contacts";

const useStyles = makeStyles(({ palette, spacing, breakpoints }) => ({
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
  contactsWrapper: {
    [breakpoints.down("xs")]: {
      display: "flex",
      justifyContent: "center"
    }
  },
  contacts: {
    display: "flex",
    padding: "2rem 0",
    justifyContent: "space-around",
    "& a span": {
      color: palette.primary.contrastText
    },
    [breakpoints.down("xs")]: {
      display: "block"
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
        <section className={classes.contactsWrapper}>
          <Contacts className={classes.contacts} />
        </section>
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
