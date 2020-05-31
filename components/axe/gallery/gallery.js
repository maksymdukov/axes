import React, { useEffect, useState, useRef } from 'react';
import MySwiper from '../../shared/swiper/swiper';
import Backdrop from '@material-ui/core/Backdrop';
import makeStyles from '@material-ui/core/styles/makeStyles';
import ClientOnlyPortal from '../../shared/portal/portal';
import { noImage } from '../../../utils/image';
import { usePreviousValue } from '~/hooks/common';

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
  // Swiper didn't want to update it's state when browsing from one axe to another.
  // Trick to rebuild tree when Swiper is updated
  // Swiper is updated only when prevProps.image !== nextProps.image
  const prevAxe = usePreviousValue(axe);
  const forceUpdate = useRef(1);
  if (prevAxe !== axe) {
    forceUpdate.current++;
  }

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
    <React.Fragment
      key={String(forceUpdate.current)} // Trick
    >
      <MySwiper
        onImageClick={(index) => setBackdropOpened(index)}
        classes={{
          root: classes.swiper,
          image: classes.imageSlide,
          slideWrapper: classes.slideWrapper
        }}
        images={images}
        imageQuality={80}
        width={800}
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
    </React.Fragment>
  );
};

export default Gallery;
