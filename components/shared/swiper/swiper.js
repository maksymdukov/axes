import React from "react";
import Swiper from "react-id-swiper";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";

const useStyles = makeStyles({
  swiperWrapper: {
    "& .swiper-container": {
      height: "20rem",
      width: "100%"
    }
  },
  slideImage: {
    // position: "absolute",
    // top: "50%",
    // left: "50%",
    // width: "auto",
    // height: "auto",
    // maxWidth: "100%",
    // maxHeight: "100%",
    // transform: "translate(-50%, -50%)"
    maxWidth: "100%",
    maxHeight: "100%",
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "none",
    "&.swiper-lazy-loaded": {
      display: "inline-block"
    }
  }
});

const MySwiper = ({ images, className }) => {
  const classes = useStyles();
  const params = {
    lazy: true,
    // pagination: {
    //   el: ".swiper-pagination",
    //   clickable: true
    // },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev"
    }
  };
  return (
    <div className={clsx(classes.swiperWrapper, className)}>
      <Swiper {...params}>
        {images.map(image => (
          <div key={image.url}>
            <img
              alt="img"
              data-src={image.url}
              className={clsx("swiper-lazy", classes.slideImage)}
            />
            <div className="swiper-lazy-preloader swiper-lazy-preloader-black" />
          </div>
        ))}
      </Swiper>
    </div>
  );
};
export default MySwiper;
