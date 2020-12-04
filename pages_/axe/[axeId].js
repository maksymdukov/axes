import React from 'react';
import Layout from '../../components/layout/layout';
import PageLayout from '../../components/layout/page-layout';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { getAxeBySlug, getAxesSlugs, getAdjacentAxes } from '../../apis/axe';
import LeftSide from '../../components/axe/left-side';
import RightSide from '../../components/axe/right-side';
import Head from '../../components/shared/head/head';
import useTranslation from 'next-translate/useTranslation';
import { capitalize } from '../../utils/header';
import { addPrefix } from '~/utils/url';
import WithBreadcrumbs from '@Components/shared/with-breadcrumbs/with-breadcrumbs';
import AdjacentCards from '@Components/axe/adjacent-cards';
import { getCommentsBySlug } from '~/apis/comments';
import SecondaryHeader from '@Components/shared/typography/secondary-header';
import Comments from '@Components/axe/comments/comments';

const useStyles = makeStyles(({ spacing, breakpoints }) => ({
  container: {
    marginBottom: spacing(4)
  },
  rightSection: {
    paddingLeft: spacing(2),
    paddingTop: 57,
    [breakpoints.down('sm')]: {
      paddingLeft: 0
    }
  },
  adjacentCards: {
    marginBottom: spacing(2)
  }
}));

const Axe = ({ axe, adjacentAxes, comments }) => {
  const classes = useStyles();
  const { t, lang } = useTranslation();
  const breadcrumbs = [
    { href: '/axes', label: 'common:nav.axes' },
    { pureLabel: axe.title }
  ];
  const title = capitalize(axe.title);
  const ogImage = axe.images && addPrefix(axe.images[0]);
  return (
    <Layout key={axe.id}>
      <Head
        title={`${title}`}
        description={`${t('axe:seo.description1')} ${title}. ${t(
          'axe:seo.description2'
        )}`}
        ogImage={ogImage}
        ogImageSecure={ogImage.urlSecure}
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
          <SecondaryHeader>{t('axe:commentsTitle')}</SecondaryHeader>
          <Comments comments={comments} lang={lang} t={t} axe={axe} />
          <SecondaryHeader>{t('axe:adjacentTitle')}</SecondaryHeader>
          <AdjacentCards
            t={t}
            adjacentAxes={adjacentAxes}
            className={classes.adjacentCards}
          />
        </WithBreadcrumbs>
      </PageLayout>
    </Layout>
  );
};

export async function getStaticProps({ params, locale }) {
  const axe = await getAxeBySlug(locale, params.axeId);
  const comments = await getCommentsBySlug({ slug: params.axeId });
  const adjacentAxes = await getAdjacentAxes({
    lang: locale,
    date: axe.createdAt
  });

  return {
    props: { axe, adjacentAxes, comments },
    // we will attempt to re-generate the page:
    // - when a request comes in
    // - at most once every 1 hour
    revalidate: 3600
  };
}

export async function getStaticPaths({ locales }) {
  const ids = await getAxesSlugs();
  let paths = [];
  locales.forEach((locale) => {
    paths = paths.concat(
      ids.map((id) => ({
        params: { axeId: id },
        locale
      }))
    );
  });
  return {
    paths,
    fallback: false
  };
}

export default Axe;
