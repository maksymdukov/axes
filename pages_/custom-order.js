import React from "react";
import Layout from "../components/layout/layout";
import PageLayout from "../components/layout/page-layout";
import { makeStyles } from "@material-ui/core/styles";
import WithBreadcrumbs from "../components/shared/with-breadcrumbs/with-breadcrumbs";
import MainHeader from "../components/shared/typography/main-header";
import { useTranslation } from "next-translate";
import FormWrapper from "../components/custom-order/form-wrapper";
import Information from "../components/custom-order/information";
import Head from "../components/shared/head/head";

const useStyles = makeStyles(({ palette, spacing }) => ({
  bg: {
    background: `linear-gradient(45deg, #838bd6, ${palette.tertiary.main} , ${palette.tertiary.light})`
  },
  page: {
    color: "white",
    paddingBottom: spacing(4)
  },
  mainHeader: {
    color: "white"
  },
  breadcrumbs: {
    color: palette.grey[400]
  }
}));

const breadcrumbs = [{ href: "/custom-order", label: "custom-order:header" }];

const CustomOrder = () => {
  const { t } = useTranslation();
  const classes = useStyles();
  return (
    <Layout mainClassName={classes.bg}>
      <Head i18Page="custom-order" />
      <PageLayout className={classes.page}>
        <WithBreadcrumbs className={classes.breadcrumbs} paths={breadcrumbs}>
          <MainHeader component="h1" className={classes.mainHeader}>
            {t("custom-order:header")}
          </MainHeader>
          <Information />
          <FormWrapper />
        </WithBreadcrumbs>
      </PageLayout>
    </Layout>
  );
};

export default CustomOrder;
