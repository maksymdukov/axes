export const normalizeAxe = (axe) => {
  const normalized = {
    ...axe,
    ...axe.languages[0]
  };
  normalized.images = [];
  normalized.mainImage && normalized.images.push(normalizeImage(axe.mainImage));
  if (normalized.images) {
    normalized.images = normalized.images.concat(
      axe.images.map(normalizeImage)
    );
  }
  return normalized;
};

export const normalizeImage = ({ url, width, height, languages }) => ({
  url,
  width,
  height,
  title: languages[0].title
});

export const numberOfPages = ({ total, size }) => Math.ceil(total / size);
