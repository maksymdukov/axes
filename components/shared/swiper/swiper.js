import React from 'react';
import Swiper from 'react-id-swiper';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

const useStyles = makeStyles(() => ({
  swiperWrapper: {
    '& .swiper-container': {
      height: 'auto',
      width: '100%'
    },
    '& .swiper-button-next, & .swiper-button-prev': {
      opacity: 0,
      transition: 'opacity .2s linear'
    },
    '&:hover .swiper-button-next, &:hover .swiper-button-prev': {
      opacity: 1
    },
    '&:hover .swiper-button-next.swiper-button-disabled, &:hover .swiper-button-prev.swiper-button-disabled': {
      pointerEvents: 'auto',
      opacity: 0.25
    }
  },
  slideImage: {
    maxWidth: '100%',
    width: '100%',
    height: 'auto',
    maxHeight: '70vh',
    objectFit: 'cover',
    filter: 'blur(10px)',
    '&.swiper-lazy-loaded': {
      display: 'inline-block',
      filter: 'none'
    }
  }
}));

const MySwiper = ({
  lazy = true,
  images,
  className,
  options,
  onImageClick,
  imageClassName,
  smallImageClassName,
  slideWrapper
}) => {
  const classes = useStyles();
  const params = {
    lazy,
    pagination: {
      el: '.swiper-pagination',
      clickable: true
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    ...options
  };
  return (
    <div className={clsx(classes.swiperWrapper, className)}>
      <Swiper {...params}>
        {images.map((image, idx) => (
          <div
            className={slideWrapper}
            key={idx}
            onClick={(e) => {
              if (!e.currentTarget.contains(e.target)) return;
              return onImageClick && onImageClick(idx);
            }}
          >
            <img
              alt="img"
              src={lazy ? `${image.url}?q=5&w=200` : `${image.url}?q=60`}
              data-src={`${image.url}?q=60`}
              className={clsx(
                lazy && 'swiper-lazy',
                classes.slideImage,
                imageClassName
              )}
            />
            {image.urlSmall && (
              <img
                alt="img"
                src={
                  lazy
                    ? `${image.urlSmall}?q=5&w=200`
                    : `${image.urlSmall}?q=60`
                }
                data-src={`${image.urlSmall}?q=60`}
                className={clsx(
                  lazy && 'swiper-lazy',
                  classes.slideImage,
                  smallImageClassName
                )}
              />
            )}
            {lazy && (
              <div className="swiper-lazy-preloader swiper-lazy-preloader-black" />
            )}
          </div>
        ))}
      </Swiper>
    </div>
  );
};
export default MySwiper;
