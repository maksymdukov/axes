export const noImage = "/assets/images/no-image.svg";

export const getFirstImage = images => {
  if (!images || !images.length) return noImage;
  return images[0].url;
};
