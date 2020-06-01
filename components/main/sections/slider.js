import React from 'react';
import { makeStyles } from '@material-ui/core';
import MySwiper from '@Components/shared/swiper/swiper';

const useStyles = makeStyles(({ breakpoints }) => ({
  swiperWrapper: {
    // minHeight: '34.5vw'
  },
  slideWrapper: {
    paddingBottom: '34.5%',
    [breakpoints.down('xs')]: {
      paddingBottom: '75%'
    }
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
  preview: {
    [breakpoints.down('xs')]: {
      display: 'none'
    }
  },
  previewSmall: {
    [breakpoints.up('sm')]: {
      display: 'none'
    }
  }
}));

const Slider = ({ slides }) => {
  const classes = useStyles();
  return (
    <MySwiper
      isRatioPadding={false}
      options={{
        autoplay: {
          delay: 6000,
          disableOnInteraction: false
        }
      }}
      images={slides}
      classes={{
        root: classes.swiperWrapper,
        slideWrapper: classes.slideWrapper,
        image: classes.slide,
        smallImage: classes.slideSmall,
        preview: classes.preview,
        smallPreview: classes.previewSmall
      }}
    />
  );
};

export default Slider;
