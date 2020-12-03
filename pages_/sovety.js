import React from 'react';
import useTranslation from 'next-translate/useTranslation';
import Layout from '../components/layout/layout';
import WithBreadcrumbs from '../components/shared/with-breadcrumbs/with-breadcrumbs';
import PageLayout from '../components/layout/page-layout';
import MainHeader from '../components/shared/typography/main-header';
import { Paper, makeStyles } from '@material-ui/core';
import { getSovetyPage } from '../apis/server/get-page';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { richtextDocumentOptions } from '../components/shared/richtext-page/options';
import Head from '../components/shared/head/head';

const useStyles = makeStyles(({ spacing }) => ({
  paper: {
    padding: spacing(3),
    marginBottom: spacing(2)
  }
}));

const breadcrumbs = [{ href: '/sovety', label: 'common:nav.sovety' }];

const Advice = ({ document }) => {
  const richTextDocument = documentToReactComponents(
    document,
    richtextDocumentOptions
  );
  const { t } = useTranslation();
  const classes = useStyles();
  return (
    <Layout>
      <Head i18Page="sovety" />
      <PageLayout>
        <WithBreadcrumbs paths={breadcrumbs}>
          <MainHeader component="h1">{t('sovety:header')}</MainHeader>
          <Paper variant="outlined" className={classes.paper}>
            {richTextDocument}
          </Paper>
        </WithBreadcrumbs>
      </PageLayout>
    </Layout>
  );
};

export default Advice;

export async function getStaticProps({ lang }) {
  const document = await getSovetyPage(lang);
  return { props: { document } };
}
