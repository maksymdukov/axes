import React, { useState } from 'react';
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
    transition: 'filter 0.4s, opacity 0.4s'
  },
  hidePreview: {
    filter: 'blur(0)',
    opacity: 0
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
  const classes = useStyles();
  const params = {
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

  const [loadedImages, setloadedImages] = useState(
    new Array(images.length).fill({ big: false, small: false })
  );

  const onImageLoaded = (type = 'big', idx) => () => {
    setloadedImages(
      loadedImages.map((statusObj, index) =>
        index === idx ? { ...statusObj, [type]: true } : statusObj
      )
    );
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

  const getSmallScreenImage = (image, idx) => (
    <>
      <img
        src={lazy ? undefined : `${image.smallImage.url}?q=${imageQuality}`}
        alt={image.title}
        onLoad={lazy ? onImageLoaded('small', idx) : undefined}
        data-src={
          lazy ? `${image.smallImage.url}?q=${imageQuality}` : undefined
        }
        className={smallImageClass}
      />
      {withPreview && (
        <img
          src={`${image.smallImage.url}?q=5&w=200`}
          alt={image.title}
          className={clsx(
            classes.imagePreview,
            loadedImages[idx].small && classes.hidePreview,
            customClasses.smallPreview
          )}
        />
      )}
    </>
  );
  return (
    <div className={clsx(classes.swiperWrapper, customClasses.root)}>
      <Swiper {...params}>
        {images.map((image, idx) => (
          <div
            className={clsx(classes.slideWrapper, customClasses.slideWrapper)}
            key={idx}
            onClick={handleImageClick(idx)}
            style={getWrapperStyle(image)}
          >
            <img
              src={lazy ? undefined : `${image.url}?q=${imageQuality}`}
              alt={image.title}
              onLoad={lazy ? onImageLoaded('big', idx) : undefined}
              data-src={lazy ? `${image.url}?q=${imageQuality}` : undefined}
              className={mainImageClass}
            />
            {withPreview && (
              <img
                src={`${image.url}?q=5&w=200`}
                alt={image.title}
                className={clsx(
                  classes.imagePreview,
                  loadedImages[idx].big && classes.hidePreview,
                  customClasses.preview
                )}
              />
            )}
            {image.smallImage && getSmallScreenImage(image, idx)}
          </div>
        ))}
      </Swiper>
    </div>
  );
};
export default MySwiper;
