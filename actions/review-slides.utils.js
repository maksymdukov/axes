export const normalizeReviewSlides = (entry) => {
  const {
    fields: { reviewSlides }
  } = entry;

  return reviewSlides.map((reviewSlide) => {
    const {
      sys: { id },
      fields: {
        title,
        file: {
          url,
          details: {
            image: { width, height }
          }
        }
      }
    } = reviewSlide;
    return { id, title, url, width, height };
  });
};
