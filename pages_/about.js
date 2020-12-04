import React from 'react';
import useTranslation from 'next-translate/useTranslation';
import Layout from '../components/layout/layout';
import WithBreadcrumbs from '../components/shared/with-breadcrumbs/with-breadcrumbs';
import PageLayout from '../components/layout/page-layout';
import { makeStyles, Paper } from '@material-ui/core';
import Head from '../components/shared/head/head';
import MainHeader from '../components/shared/typography/main-header';
import { getAboutPage } from '../apis/server/get-page';

const useStyles = makeStyles(({ spacing }) => ({
  paper: {
    padding: spacing(3),
    marginBottom: spacing(2)
  }
}));

const breadcrumbs = [{ href: '/about', label: 'common:nav.about' }];

const About = ({ document }) => {
  const { t } = useTranslation();
  const classes = useStyles();
  return (
    <Layout>
      <Head i18Page="about" />
      <PageLayout>
        <WithBreadcrumbs paths={breadcrumbs}>
          <MainHeader component="h1">{t('about:header')}</MainHeader>
          <Paper
            variant="outlined"
            className={classes.paper}
            dangerouslySetInnerHTML={{ __html: document }}
          />
        </WithBreadcrumbs>
      </PageLayout>
    </Layout>
  );
};

export default About;

export async function getStaticProps({ lang }) {
  const document = await getAboutPage(lang);
  return { props: { document } };
}
