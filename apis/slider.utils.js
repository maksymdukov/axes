import { normalizeImage } from './axe.utils';

export const normalizeSlide = (slide) => {
  const { id, bigImage, smallImage } = slide;
  const bImage = normalizeImage(bigImage);
  const sImage = normalizeImage(smallImage);

  return {
    id: id,
    title: bImage.title,
    url: bImage.url,
    width: bImage.width,
    height: bImage.height,
    smallImage: {
      url: sImage.url,
      width: sImage.width,
      height: sImage.height
    }
  };
};
