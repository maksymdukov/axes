const noImage = "/assets/images/No_image_available.svg";

export const getFirstImage = images => {
  if (!images || !images.length) return noImage;
  return images[0].url;
};
