import React from 'react';
import MainHeader from '@Components/shared/typography/main-header';
import { makeStyles } from '@material-ui/core';
import MySwiper from '@Components/shared/swiper/swiper';
import Wave2 from '@Components/shared/icons/wave2.svg';
import useTranslation from 'next-translate/useTranslation';

const useStyles = makeStyles(({ palette }) => ({
  container: {
    backgroundColor: palette.primary.main,
    color: palette.primary.contrastText,
    marginTop: -50,
    paddingBottom: 80
  },
  bgSvg: {
    display: 'block',
    width: '100%',
    height: 150,
    '& path': {
      fill: palette.primary.main
    }
  },
  slideWrapper: {
    position: 'relative',
    height: 'auto',
    width: 'auto',
    maxWidth: '90vw',
    maxHeight: '90vh',
    paddingBottom: 0
  },
  image: {
    opacity: 1,
    maxHeight: '100%',
    width: 'auto',
    height: 'auto'
  },
  preview: {
    width: 'auto',
    height: 'auto',
    maxHeight: '100%',
    position: 'static'
  }
}));

const Reviews = ({ reviewSlides }) => {
  const classes = useStyles();
  const { t } = useTranslation();
  return (
    <>
      <Wave2 className={classes.bgSvg} />
      <section className={classes.container}>
        <MainHeader>{t('index:reviews')}</MainHeader>
        <MySwiper
          lazy={true}
          width={1000}
          previewWidth={1000}
          withPreview={true}
          isRatioPadding={false}
          images={reviewSlides}
          classes={{
            slideWrapper: classes.slideWrapper,
            image: classes.image,
            preview: classes.preview
          }}
          options={{
            preloadImages: false,
            watchSlidesVisibility: true,
            shouldSwiperUpdate: true,
            effect: 'coverflow',
            grabCursor: true,
            centeredSlides: true,
            slidesPerView: 'auto',
            coverflowEffect: {
              rotate: 10,
              stretch: 0,
              depth: 100,
              modifier: 2,
              slideShadows: true
            }
          }}
        />
      </section>
    </>
  );
};

export default Reviews;
