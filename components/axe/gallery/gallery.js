import React, { useState } from "react";
import MySwiper from "../../shared/swiper/swiper";
import Backdrop from "@material-ui/core/Backdrop";
import makeStyles from "@material-ui/core/styles/makeStyles";
import ClientOnlyPortal from "../../shared/portal/portal";

const useStyles = makeStyles(theme => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff"
  },
  swiper: {
    // maxWidth: 800,
    border: "1px solid #ddd",
    margin: "1rem 0",
    width: "100%"
  },
  fullScreenSwiper: {
    zIndex: 1500,
    width: "100%",
    height: "80vh",
    "& .swiper-container": {
      height: "100%"
    }
  },
  imageSlide: {
    cursor: "pointer"
  },
  imageSlideFullScreen: {
    objectFit: "contain",
    cursor: "pointer"
  }
}));

const Gallery = ({ axe }) => {
  const classes = useStyles();
  const [backdropOpened, setBackdropOpened] = useState(-1);
  const closeFullScreen = () => setBackdropOpened(-1);
  return (
    <>
      <MySwiper
        onImageClick={index => setBackdropOpened(index)}
        imageClassName={classes.imageSlide}
        className={classes.swiper}
        images={axe.images.map(img => ({ url: img, alt: "Axe" }))}
      />
      <ClientOnlyPortal selector="body">
        <Backdrop
          className={classes.backdrop}
          open={backdropOpened > -1}
          onClick={closeFullScreen}
        >
          <div
            className={classes.fullScreenSwiper}
            onClick={e => e.stopPropagation()}
          >
            <MySwiper
              options={{ activeSlideKey: String(backdropOpened) }}
              onImageClick={closeFullScreen}
              imageClassName={classes.imageSlideFullScreen}
              className={classes.fullScreenSwiper}
              images={axe.images.map(img => ({ url: img, alt: "Axe" }))}
            />
          </div>
        </Backdrop>
      </ClientOnlyPortal>
    </>
  );
};

export default Gallery;
