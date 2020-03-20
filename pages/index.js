import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Swiper from "../components/shared/swiper/swiper";
import Container from "@material-ui/core/Container";
import MainHeader from "../components/shared/typography/main-header";
import Cards from "../components/shared/card/cards";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles(({ spacing }) => ({
  mb: {
    marginBottom: spacing(4)
  },
  bgPattern: {
    background: "url('/assets/svg/pattern.svg')",
    backgroundRepeat: "repeat repeat"
  }
}));

const images = [
  {
    url:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Fin-axe.jpg/1200px-Fin-axe.jpg"
  },
  {
    url:
      "https://www.gransforsbruk.com/wp-content/uploads/465-snickaryxa-1440x1050.jpg"
  },
  {
    url:
      "https://cdn.gamer-network.net/2019/articles/2019-08-14-13-02/this-apex-legends-axe-costs-about-gbp130-in-loot-boxes-1565784165634.jpg/EG11/thumbnail/1920x1075/format/jpg/quality/80"
  },
  {
    url:
      "http://stiepel.net/wp-content/uploads/2019/10/1570269331_maxresdefault.jpg"
  }
];

const cards = [
  {
    id: "1",
    title: "Невероятный мститель",
    imageURL:
      "https://i.etsystatic.com/16258006/r/il/08f511/1701343061/il_794xN.1701343061_gmx1.jpg",
    description: "Из чистого дуба, каленый метал"
  },
  {
    id: "2",
    title: "Ночной странник",
    imageURL:
      "https://www.gransforsbruk.com/wp-content/uploads/475-large-carving-axe-1440x1050.jpg",
    description: "Из чистого бука, каленый метал"
  },
  {
    id: "3",
    title: "Громкое молчание",
    imageURL:
      "https://cdna.artstation.com/p/assets/images/images/023/191/656/large/alexander-campos-thumbnail-16-9.jpg?1578412577",
    description: "Из чистого дуба, каленый метал"
  },
  {
    id: "4",
    title: "Возмездие богов",
    imageURL:
      "https://cdna.artstation.com/p/assets/images/images/023/191/656/large/alexander-campos-thumbnail-16-9.jpg?1578412577",
    description: "Из чистого дуба, каленый метал"
  }
];
const Home = () => {
  const classes = useStyles();
  const { t } = useTranslation("index");

  return (
    <div className={classes.bgPattern}>
      <Swiper images={images} className={classes.mb} />
      <Container className={classes.container}>
        <MainHeader>{t("bestWorks")}</MainHeader>
        <Cards cards={cards} className={classes.mb} />
        <MainHeader>{t("newWorks")}</MainHeader>
        <Cards cards={cards} />
      </Container>
    </div>
  );
};

Home.getInitialProps = async () => {
  return {
    namespacesRequired: ["index"]
  };
};
export default Home;
