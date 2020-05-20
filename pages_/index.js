import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Swiper from '../components/shared/swiper/swiper';
import Container from '@material-ui/core/Container';
import MainHeader from '../components/shared/typography/main-header';
import Cards from '../components/shared/card/cards';
import { useTranslation } from 'next-translate';
import Layout from '../components/layout/layout';
import { getFeaturedAxes, getLastAxes } from '../actions/axe';
import { getSlides } from '../actions/slider';
import Individual from '../components/main/individual';
import Head from '../components/shared/head/head';
import { Wave } from '../components/main/wave';

const useStyles = makeStyles(({ palette, breakpoints }) => ({
  bgPattern: {
    background:
      "linear-gradient( rgba(0, 0, 0, 0.01), rgba(0, 0, 0, 0.20) ), url('/assets/svg/pattern.svg')",
    backgroundRepeat: 'repeat repeat'
  },
  slide: {
    maxWidth: '100%',
    height: 'auto',
    width: '100%',
    margin: '0 auto',
    maxHeight: '90vh',
    '&.swiper-lazy-loaded': {
      display: 'block'
    },
    [breakpoints.down('xs')]: {
      display: 'none',
      '&.swiper-lazy-loaded': {
        display: 'none'
      }
    }
  },
  slideSmall: {
    [breakpoints.up('sm')]: {
      display: 'none',
      '&.swiper-lazy-loaded': {
        display: 'none'
      }
    }
  },
  mainContainer: {
    paddingTop: '3rem',
    paddingBottom: '4rem'
  },
  contrastContainer: {
    paddingBottom: '4rem',
    background: palette.tertiary.main,
    color: 'white'
  }
}));

const Home = ({ featuredAxes, lastAxes, slides }) => {
  const classes = useStyles();
  const { t } = useTranslation();
  return (
    <Layout>
      <Head i18Page="index" />
      <div className={classes.bgPattern}>
        <Swiper
          options={{
            autoplay: {
              delay: 6000,
              disableOnInteraction: false
            }
          }}
          images={slides}
          imageClassName={classes.slide}
          smallImageClassName={classes.slideSmall}
        />
        <section className={classes.mainContainer}>
          <Container>
            <MainHeader>{t('index:bestWorks')}</MainHeader>
            <Cards cards={featuredAxes} className={classes.mb} />
          </Container>
        </section>
        <section className={classes.mainContainer}>
          <Container>
            <MainHeader>{t('index:newWorks')}</MainHeader>
            <Cards cards={lastAxes} />
          </Container>
        </section>
        <section>
          <Wave />
          <div className={classes.contrastContainer}>
            <Individual />
          </div>
        </section>
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
