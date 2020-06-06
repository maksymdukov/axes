import React from 'react';
import Layout from '../../components/layout/layout';
import PageLayout from '../../components/layout/page-layout';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import {
  getAxeBySlug,
  getAxesSlugs,
  getAxesAroundDate
} from '../../actions/axe';
import LeftSide from '../../components/axe/left-side';
import RightSide from '../../components/axe/right-side';
import Head from '../../components/shared/head/head';
import { useTranslation } from 'next-translate';
import { capitalize } from '../../utils/header';
import { addPrefix } from '~/utils/url';
import WithBreadcrumbs from '@Components/shared/with-breadcrumbs/with-breadcrumbs';
import AdjacentCards from '@Components/axe/adjacent-cards';
import { getCommentsBySlug } from '~/actions/comments';
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
  const viberShareFix = axe.images && `<!-- <img src='${ogImage.url}'/>-->`;
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
        <div dangerouslySetInnerHTML={{ __html: viberShareFix }} />
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

export async function getStaticProps({ params, lang }) {
  const axe = await getAxeBySlug(lang, params.axeId);
  const comments = await getCommentsBySlug({ slug: params.axeId });

  // Fetch adjacent axes to show them in 'You might like section'
  let adjacentAxes = await getAxesAroundDate({ lang, date: axe.createdAt });
  // If not found try finding later posts
  if (!adjacentAxes.length) {
    adjacentAxes = await getAxesAroundDate({
      lang,
      date: axe.createdAt,
      forward: false
    });
  }
  return {
    props: { axe, adjacentAxes, comments },
    // we will attempt to re-generate the page:
    // - when a request comes in
    // - at most once every 1 hour
    unstable_revalidate: 3600 * 2
  };
}

export async function getStaticPaths() {
  const ids = await getAxesSlugs();
  const paths = ids.map((id) => ({
    params: { axeId: id }
  }));
  return {
    paths,
    fallback: false
  };
}

export default Axe;
