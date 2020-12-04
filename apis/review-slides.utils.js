export const normalizeReviewSlides = (entries) => {
  return entries.map((reviewSlide) => {
    const {
      id,
      image: { url, width, height, languages }
    } = reviewSlide;
    return { id, title: languages[0].title, url, width, height };
  });
};
