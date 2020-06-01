import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { getFeaturedAxes, getLastAxes } from '../actions/axe';
import { getSlides } from '../actions/slider';
import Slider from '@Components/main/sections/slider';
import BestWorks from '@Components/main/sections/best-works';
import NewWorks from '@Components/main/sections/new-works';
import Feedback from '@Components/main/sections/feedback';
import IndividualOrder from '@Components/main/sections/individual-order';
import Head from '@Components/shared/head/head';
import Layout from '@Components/layout/layout';

const useStyles = makeStyles({
  bgPattern: {
    background:
      "linear-gradient( rgba(0, 0, 0, 0.01), rgba(0, 0, 0, 0.20) ), url('/assets/svg/pattern.svg')",
    backgroundRepeat: 'repeat repeat'
  }
});

const Home = ({ featuredAxes, lastAxes, slides }) => {
  const classes = useStyles();
  return (
    <Layout>
      <Head i18Page="index" />
      <div className={classes.bgPattern}>
        <Slider slides={slides} />
        <BestWorks featuredAxes={featuredAxes} />
        <NewWorks lastAxes={lastAxes} />
        {/* <Feedback /> */}
        <IndividualOrder />
      </div>
    </Layout>
  );
};

export default Home;

export const getStaticProps = async ({ lang }) => {
  return {
    props: {
      featuredAxes: await getFeaturedAxes(lang),
      lastAxes: await getLastAxes(lang),
      slides: await getSlides()
    }
  };
};
