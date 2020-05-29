import React from 'react';
import Layout from '@Components/layout/layout';
import PageLayout from '@Components/layout/page-layout';
import MainHeader from '@Components/shared/typography/main-header';
import useTranslation from 'next-translate/useTranslation';
import DisableLinkProvider from '~/context/404-page/disable-link-provider';
import I18CustomProvider from '~/context/404-page/i18provider';
import SokyraIcon from '~/components/shared/icons/sokyra.svg';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(({ breakpoints, spacing }) => ({
  iconBox: {
    marginBottom: spacing(2),
    width: '30%',
    margin: 'auto',
    [breakpoints.down('md')]: {
      width: '40%'
    },
    [breakpoints.down('sm')]: {
      width: '45%'
    },
    [breakpoints.down('xs')]: {
      width: '50%'
    }
  },
  icon: {
    width: '100%',
    height: 'auto'
  }
}));

const NotFoundBody = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  return (
    <>
      <MainHeader component="h1" variant="h4">
        {t('404:header')}
      </MainHeader>
      <div className={classes.iconBox}>
        <SokyraIcon className={classes.icon} />
      </div>
    </>
  );
};

const NotFoundPage = () => {
  return (
    <I18CustomProvider>
      <DisableLinkProvider>
        <Layout notFoundPage>
          <PageLayout>
            <NotFoundBody />
          </PageLayout>
        </Layout>
      </DisableLinkProvider>
    </I18CustomProvider>
  );
};

export default NotFoundPage;
