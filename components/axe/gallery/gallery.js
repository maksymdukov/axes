import React, { useEffect, useState } from 'react';
import MySwiper from '../../shared/swiper/swiper';
import Backdrop from '@material-ui/core/Backdrop';
import makeStyles from '@material-ui/core/styles/makeStyles';
import ClientOnlyPortal from '../../shared/portal/portal';
import { noImage } from '../../../utils/image';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff'
  },
  swiper: {
    // maxWidth: 800,
    // border: "1px solid #ddd",
    margin: '1rem 0',
    width: '100%',
    maxHeight: '90vh',
    lineHeight: 0,
    '&  .swiper-container': {
      height: 'auto'
    }
  },
  fullScreenSwiper: {
    zIndex: 1500,
    width: '100%',
    maxHeight: '80vh',
    '& .swiper-container': {
      height: '100%'
    }
  },
  imageSlide: {
    cursor: 'pointer',
    objectFit: 'contain'
  },
  imageSlideFullScreen: {
    objectFit: 'contain',
    cursor: 'pointer'
  },
  slideWrapper: {
    alignSelf: 'flex-start'
    // height: "calc(100% / 4 * 3)"
  }
}));

const blurredClassName = 'blurred';

const Gallery = ({ axe }) => {
  const classes = useStyles();
  const [backdropOpened, setBackdropOpened] = useState(-1);
  useEffect(() => {
    const container = document.querySelector('#__next');
    if (backdropOpened !== -1) {
      container.classList.add(blurredClassName);
    }
    return () => {
      container.classList.remove(blurredClassName);
    };
  }, [backdropOpened, setBackdropOpened]);
  const closeFullScreen = () => setBackdropOpened(-1);
  const images = axe.images || [{ url: noImage, title: 'No image' }];
  return (
    <>
      <MySwiper
        slideWrapper={classes.slideWrapper}
        onImageClick={(index) => setBackdropOpened(index)}
        imageClassName={classes.imageSlide}
        className={classes.swiper}
        images={images}
        imageQuality={80}
      />
      <ClientOnlyPortal selector="body">
        <Backdrop
          timeout={500}
          className={classes.backdrop}
          open={backdropOpened > -1}
          onClick={closeFullScreen}
        >
          <div
            className={classes.fullScreenSwiper}
            onClick={(e) => e.stopPropagation()}
          >
            <MySwiper
              options={{ activeSlideKey: String(backdropOpened) }}
              onImageClick={closeFullScreen}
              imageClassName={classes.imageSlideFullScreen}
              className={classes.fullScreenSwiper}
              images={images}
              imageQuality={80}
            />
          </div>
        </Backdrop>
      </ClientOnlyPortal>
    </>
  );
};

export default Gallery;
