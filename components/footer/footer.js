import React from "react";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import Contacts from "../contacts/profile/contacts";
import Grid from "@material-ui/core/Grid";
import Block from "./block";
import { useTranslation } from "next-translate";
import CenteredBox from "../shared/box/centered-box";
import Link from "../shared/link/link";

const useStyles = makeStyles(({ palette, spacing }) => ({
  footerWrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    backgroundColor: palette.primary.light,
    color: palette.primary.contrastText,
    minHeight: 100
  },
  footer: {
    flexGrow: 1,
    padding: "2rem"
  },
  contacts: {
    color: "inherit",
    fontWeight: 300,
    fontSize: "0.8rem",
    letterSpacing: "0.05rem"
  },
  copyright: {
    backgroundColor: palette.primary.main
  },
  lang: {
    color: palette.grey[300],
    marginRight: spacing(),
    marginLeft: spacing()
  }
}));

const Footer = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  return (
    <footer className={classes.footerWrapper}>
      <Container component="section" className={classes.footer}>
        <Grid container spacing={2}>
          <Block>
            <Contacts className={classes.contacts} />
          </Block>
          <Block
            header={t("common:footer.help")}
            links={[{ label: t("common:nav.delivery"), href: "/delivery" }]}
          />
          <Block
            header={t("common:footer.about")}
            links={[
              { label: t("common:nav.about"), href: "/about" },
              { label: t("common:nav.contacts"), href: "/contacts" }
            ]}
          />
          <Block
            header={t("common:footer.services")}
            links={[
              { label: t("common:nav.axes"), href: "/axes" },
              { label: t("common:nav.custom-order"), href: "/custom-order" }
            ]}
          />
        </Grid>
        <CenteredBox mt={3}>
          <Link href="/" lang="ru" className={classes.lang}>
            {t("common:nav.ru")}
          </Link>
          /
          <Link href="/" lang="ua" className={classes.lang}>
            {t("common:nav.ua")}
          </Link>
        </CenteredBox>
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
