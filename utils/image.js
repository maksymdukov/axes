export const noImage = '/assets/images/no-image.svg';

export const getFirstImage = (images) => {
  if (!images || !images.length) return { url: noImage, title: 'no image' };
  return images[0];
};
