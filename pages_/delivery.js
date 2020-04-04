import React from "react";
import { useTranslation } from "next-translate";
import Layout from "../components/layout/layout";
import WithBreadcrumbs from "../components/shared/with-breadcrumbs/with-breadcrumbs";
import PageLayout from "../components/layout/page-layout";
import MainHeader from "../components/shared/typography/main-header";
import Grid from "@material-ui/core/Grid";
import InfoCard from "../components/delivery/info-card";
import { makeStyles } from "@material-ui/core/styles";
import Head from "../components/shared/head/head";

const useStyles = makeStyles(({ spacing }) => ({
  container: {
    marginBottom: spacing(2)
  }
}));

const breadcrumbs = [{ href: "/delivery", label: "delivery:header" }];

const Delivery = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  return (
    <Layout>
      <Head i18Page="delivery" />
      <PageLayout>
        <WithBreadcrumbs paths={breadcrumbs}>
          <MainHeader>{t("delivery:delivery")}</MainHeader>
          <Grid container wrap="wrap" spacing={3} className={classes.container}>
            <InfoCard
              src="/assets/svg/nova-poshta.svg"
              header={t("delivery:novaPoshta.header")}
              text={t("delivery:novaPoshta.text1")}
              text2={t("delivery:novaPoshta.text2")}
            />
            <InfoCard
              src="/assets/svg/ukr-poshta.svg"
              header={t("delivery:ukrPoshta.header")}
              text={t("delivery:ukrPoshta.text1")}
            />
          </Grid>

          <MainHeader>{t("delivery:payment")}</MainHeader>
          <Grid container wrap="wrap" spacing={3} className={classes.container}>
            <InfoCard
              src="/assets/svg/money.svg"
              header={t("delivery:nalosheniyPlatesh.header")}
              text={t("delivery:nalosheniyPlatesh.text1")}
              text2={t("delivery:nalosheniyPlatesh.text2")}
            />
            <InfoCard
              src="/assets/images/privatbank.png"
              header={t("delivery:privatBank.header")}
              text={t("delivery:privatBank.text1")}
            />
          </Grid>
        </WithBreadcrumbs>
      </PageLayout>
    </Layout>
  );
};

export default Delivery;
