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
    maxWidth: '80vw',
    height: 'auto',
    width: 'auto',
    paddingBottom: 0,
    maxHeight: '80vh'
  },
  image: {
    opacity: 1,
    position: 'static',
    maxHeight: '100%',
    width: 'auto',
    height: 'auto'
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
          lazy={false}
          withPreview={false}
          isRatioPadding={false}
          images={reviewSlides}
          classes={{
            slideWrapper: classes.slideWrapper,
            image: classes.image
          }}
          options={{
            effect: 'coverflow',
            grabCursor: true,
            centeredSlides: true,
            slidesPerView: 'auto',
            coverflowEffect: {
              rotate: 20,
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
