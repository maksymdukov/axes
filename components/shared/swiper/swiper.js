import React, { useRef, useEffect } from 'react';
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
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    maxWidth: '100%',
    width: '100%',
    height: 'auto',
    objectFit: 'cover',
    opacity: 0,
    transition: 'opacity .4s',
    '&.swiper-lazy-loaded': {
      opacity: 1
    }
  },
  imagePreview: {
    position: 'absolute',
    maxWidth: '100%',
    width: '100%',
    height: 'auto',
    objectFit: 'contain',
    opacity: 1,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    filter: 'blur(10px)',
    transition: 'filter .4s, opacity .4s',
    '.swiper-lazy-loaded + &': {
      filter: 'blur(0)',
      opacity: 0
    }
  },
  slideWrapper: {
    alignSelf: 'center',
    position: 'relative',
    overflow: 'hidden'
  }
}));

const MySwiper = ({
  lazy = true,
  classes: customClasses = {},
  images,
  options,
  onImageClick,
  imageQuality = 60,
  isRatioPadding = true,
  withPreview = true
}) => {
  const forceUpdate = useRef(1);
  // Swiper didn't want to update it's state when browsing from one axe to another.
  // Trick to rebuild tree when Swiper is updated
  // Swiper is updated only when prevProps.image !== nextProps.image
  forceUpdate.current++;

  console.log('[MySwiper]');

  const classes = useStyles();
  const params = {
    shouldSwiperUpdate: true,
    lazy,
    spaceBetween: 10,
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

  const handleImageClick = (idx) => (e) => {
    if (!e.currentTarget.contains(e.target)) return;
    return onImageClick && onImageClick(idx);
  };

  const mainImageClass = clsx(
    lazy && 'swiper-lazy',
    classes.slideImage,
    customClasses.image
  );

  const smallImageClass = clsx(
    lazy && 'swiper-lazy',
    classes.slideImage,
    customClasses.smallImage
  );

  const getWrapperStyle = (image) =>
    isRatioPadding
      ? { paddingBottom: `${(image.height / image.width) * 100}%` }
      : {};

  const getSmallScreenImage = (image) => (
    <>
      <img
        src={lazy ? undefined : `${image.smallImage.url}?q=${imageQuality}`}
        alt={image.title}
        data-src={
          lazy ? `${image.smallImage.url}?q=${imageQuality}` : undefined
        }
        className={smallImageClass}
      />
      {withPreview && (
        <img
          src={`${image.smallImage.url}?q=5&w=200`}
          className={clsx(classes.imagePreview, customClasses.smallPreview)}
        />
      )}
    </>
  );
  return (
    <div
      className={clsx(classes.swiperWrapper, customClasses.root)}
      key={String(forceUpdate.current)} // Trick
    >
      <Swiper {...params}>
        {images.map((image, idx) => (
          <div
            className={clsx(classes.slideWrapper, customClasses.slideWrapper)}
            key={image.url}
            onClick={handleImageClick(idx)}
            style={getWrapperStyle(image)}
          >
            <img
              src={lazy ? undefined : `${image.url}?q=${imageQuality}`}
              alt={image.title}
              data-src={lazy ? `${image.url}?q=${imageQuality}` : undefined}
              className={mainImageClass}
            />
            {withPreview && (
              <img
                src={`${image.url}?q=5&w=200`}
                className={clsx(classes.imagePreview, customClasses.preview)}
              />
            )}
            {image.smallImage && getSmallScreenImage(image)}
          </div>
        ))}
      </Swiper>
    </div>
  );
};
export default React.memo(
  MySwiper,
  (prevProps, nextProps) => prevProps.images === nextProps.images
);
