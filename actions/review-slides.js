import { client, locales } from '../server/config/contentful';
import { normalizeReviewSlides } from './review-slides.utils';

export const getReviewSlideEntries = (options) =>
  client.getEntry('4K2pBRoR3sHFCPXfgaxaJ2', {
    locale: locales.ua,
    ...options
  });

export const getReviewSlides = async () => {
  const slide = await getReviewSlideEntries();
  return normalizeReviewSlides(slide || []);
};
