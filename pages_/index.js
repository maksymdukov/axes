import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Swiper from "../components/shared/swiper/swiper";
import Container from "@material-ui/core/Container";
import MainHeader from "../components/shared/typography/main-header";
import Cards from "../components/shared/card/cards";
import { useTranslation } from "next-translate";
import Layout from "../components/layout/layout";
import { getFeaturedAxes, getLastAxes } from "../actions/axe";
import { getSlides } from "../actions/slider";

const useStyles = makeStyles(({ spacing }) => ({
  mb: {
    marginBottom: spacing(4)
  },
  bgPattern: {
    background: "url('/assets/svg/pattern.svg')",
    backgroundRepeat: "repeat repeat"
  },
  slide: {
    objectFit: "cover"
  }
}));

const Home = ({ featuredAxes, lastAxes, slides }) => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <Layout>
      <div className={classes.bgPattern}>
        <Swiper
          images={slides}
          className={classes.mb}
          imageClassName={classes.slide}
        />
        <Container className={classes.container}>
          <MainHeader>{t("index:bestWorks")}</MainHeader>
          <Cards cards={featuredAxes} className={classes.mb} />
          <MainHeader>{t("index:newWorks")}</MainHeader>
          <Cards cards={lastAxes} />
        </Container>
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
