import React from 'react';
import useTranslation from 'next-translate/useTranslation';
import Layout from '../components/layout/layout';
import WithBreadcrumbs from '../components/shared/with-breadcrumbs/with-breadcrumbs';
import PageLayout from '../components/layout/page-layout';
import MainHeader from '../components/shared/typography/main-header';
import { Paper, makeStyles } from '@material-ui/core';
import { getSovetyPage } from '../apis/get-page';
import Head from '../components/shared/head/head';

const useStyles = makeStyles(({ spacing }) => ({
  paper: {
    padding: spacing(3),
    marginBottom: spacing(2)
  }
}));

const breadcrumbs = [{ href: '/sovety', label: 'common:nav.sovety' }];

const Advice = ({ document }) => {
  const { t } = useTranslation();
  const classes = useStyles();
  return (
    <Layout>
      <Head i18Page="sovety" />
      <PageLayout>
        <WithBreadcrumbs paths={breadcrumbs}>
          <MainHeader component="h1">{t('sovety:header')}</MainHeader>
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

export default Advice;

export async function getStaticProps({ locale }) {
  const document = await getSovetyPage(locale);
  return { props: { document } };
}
