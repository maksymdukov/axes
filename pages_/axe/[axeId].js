import React from "react";
import Layout from "../../components/layout/layout";
import PageLayout from "../../components/layout/page-layout";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import WithBreadcrumbs from "../../components/shared/with-breadcrumbs/with-breadcrumbs";
import { getAxeBySlug, getAxesSlugs } from "../../actions/axe";
import LeftSide from "../../components/axe/left-side";
import RightSide from "../../components/axe/right-side";
import Head from "../../components/shared/head/head";
import { useTranslation } from "next-translate";
import { capitalize } from "../../utils/header";

const useStyles = makeStyles(({ spacing }) => ({
  container: {
    marginBottom: spacing(2)
  },
  rightSection: {
    paddingLeft: spacing(2),
    paddingTop: 57
  }
}));

const Axe = ({ axe }) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const breadcrumbs = [
    { href: "/axes", label: "common:nav.axes" },
    { pureLabel: axe.title }
  ];
  const title = capitalize(axe.title);
  return (
    <Layout>
      <Head
        title={`${title}`}
        description={`${t("axe:seo.description1")} ${title}. ${t(
          "axe:seo.description2"
        )}`}
      />
      <PageLayout>
        <WithBreadcrumbs paths={breadcrumbs}>
          <Grid container className={classes.container}>
            <Grid item xs={12} md={6}>
              <LeftSide axe={axe} />
            </Grid>
            <Grid item xs={12} md={6} className={classes.rightSection}>
              <RightSide axe={axe} />
            </Grid>
          </Grid>
        </WithBreadcrumbs>
      </PageLayout>
    </Layout>
  );
};

export async function getStaticProps({ params, lang }) {
  const data = await getAxeBySlug(lang, params.axeId);
  return {
    props: { axe: data }
  };
}

export async function getStaticPaths() {
  const ids = await getAxesSlugs();
  const paths = ids.map(id => ({
    params: { axeId: id }
  }));
  return {
    paths,
    fallback: false
  };
}

export default Axe;
