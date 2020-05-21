import React from 'react';
import PageLayout from '../components/layout/page-layout';
import Grid from '@material-ui/core/Grid';
import Profile from '../components/contacts/profile/profile';
import Box from '@material-ui/core/Box';
import Layout from '../components/layout/layout';
import ContactForm from '../components/contacts/contact-form/form';
import { makeStyles } from '@material-ui/core/styles';
import WithBreadcrumbs from '../components/shared/with-breadcrumbs/with-breadcrumbs';
import Typography from '@material-ui/core/Typography';
import { useTranslation } from 'next-translate';
import MainHeader from '../components/shared/typography/main-header';
import Head from '../components/shared/head/head';

const breadcrumbs = [{ href: '/contacts', label: 'common:nav.contacts' }];

const useStyles = makeStyles(({ palette, breakpoints }) => ({
  leftBorder: {
    position: 'relative',
    [breakpoints.up('sm')]: {
      '&::before': {
        content: "''",
        display: 'block',
        position: 'absolute',
        width: 2,
        height: '80%',
        top: '10%',
        left: 0,
        backgroundColor: palette.text.disabled
      }
    }
  }
}));

const Contacts = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  return (
    <Layout>
      <Head i18Page="contacts" />
      <PageLayout>
        <MainHeader component="h1">{t('contacts:header')}</MainHeader>
        <WithBreadcrumbs paths={breadcrumbs}>
          <Grid container>
            <Grid item sm={6} xs={12}>
              <Box display="flex" justifyContent="center">
                <Profile />
              </Box>
            </Grid>
            <Grid item sm={6} xs={12} className={classes.leftBorder}>
              <Typography align="center" variant="h5" color="textSecondary">
                {t('contacts:sendMessageTitle')}
              </Typography>
              <ContactForm />
            </Grid>
          </Grid>
        </WithBreadcrumbs>
      </PageLayout>
    </Layout>
  );
};

export default Contacts;
