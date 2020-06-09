import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { getFeaturedAxes, getLastAxes } from '../apis/server/axe';
import { getSlides } from '../apis/server/slider';
import Slider from '@Components/main/sections/slider';
import BestWorks from '@Components/main/sections/best-works';
import NewWorks from '@Components/main/sections/new-works';
import Reviews from '@Components/main/sections/reviews';
import IndividualOrder from '@Components/main/sections/individual-order';
import Head from '@Components/shared/head/head';
import Layout from '@Components/layout/layout';
import { getReviewSlides } from '~/apis/server/review-slides';

const useStyles = makeStyles({
  bgPattern: {
    background:
      "linear-gradient( rgba(0, 0, 0, 0.01), rgba(0, 0, 0, 0.20) ), url('/assets/svg/pattern.svg')",
    backgroundRepeat: 'repeat repeat'
  }
});

const Home = ({ featuredAxes, lastAxes, slides, reviewSlides }) => {
  const classes = useStyles();
  return (
    <Layout>
      <Head i18Page="index" />
      <div className={classes.bgPattern}>
        <Slider slides={slides} />
        <BestWorks featuredAxes={featuredAxes} />
        <NewWorks lastAxes={lastAxes} />
        <Reviews reviewSlides={reviewSlides} />
        <IndividualOrder />
      </div>
    </Layout>
  );
};

export default Home;

export const getStaticProps = async ({ lang }) => {
  const promises = [
    getFeaturedAxes,
    getLastAxes,
    getSlides,
    getReviewSlides
  ].map((fn) => fn(lang));
  const [featuredAxes, lastAxes, slides, reviewSlides] = await Promise.all(
    promises
  );
  return {
    props: {
      featuredAxes: featuredAxes,
      lastAxes: lastAxes,
      slides: slides,
      reviewSlides: reviewSlides
    }
  };
};
