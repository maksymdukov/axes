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
    margin: '1rem 0',
    width: '100%',
    maxHeight: '90vh',
    lineHeight: 0,
    '& .swiper-container': {
      height: 'auto'
    }
  },
  fullScreenSwiper: {
    zIndex: 1500,
    width: '100%',
    '& .swiper-container': {
      height: '100%'
    }
  },
  imageSlide: {
    objectFit: 'contain'
  },
  imageSlideFullScreen: {
    position: 'static',
    opacity: 1,
    maxHeight: '80vh',
    objectFit: 'contain',
    cursor: 'pointer'
  },
  slideWrapper: {
    alignSelf: 'center',
    position: 'relative',
    cursor: 'pointer'
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
        onImageClick={(index) => setBackdropOpened(index)}
        classes={{
          root: classes.swiper,
          image: classes.imageSlide,
          slideWrapper: classes.slideWrapper
        }}
        images={images}
        imageQuality={80}
      />
      <ClientOnlyPortal selector="body">
        <Backdrop
          unmountOnExit={true}
          mountOnEnter={true}
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
              classes={{
                slideWrapper: classes.slideWrapper,
                image: classes.imageSlideFullScreen
              }}
              options={{ activeSlideKey: String(backdropOpened) }}
              onImageClick={closeFullScreen}
              withPreview={false}
              lazy={false}
              isRatioPadding={false}
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
