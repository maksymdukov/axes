import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Swiper from "../components/shared/swiper/swiper";

const Home = () => {
  const images = [
    { url: "http://lorempixel.com/1600/1200/nature/1/" },
    { url: "http://lorempixel.com/1600/1200/nature/2/" },
    { url: "http://lorempixel.com/1600/1200/nature/3/" },
    { url: "http://lorempixel.com/1600/1200/nature/4/" }
  ];

  return <Swiper images={images} />;
};
export default Home;
