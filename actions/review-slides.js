import { client, locales } from '../server/config/contentful';
import { normalizeReviewSlides } from './review-slides.utils';

export const getReviewSlideEntries = (options) =>
  client.getEntry({
    entry_id: '4K2pBRoR3sHFCPXfgaxaJ2',
    locale: locales.ua,
    ...options
  });

export const getReviewSlides = async () => {
  const slides = await getReviewSlideEntries();
  return normalizeReviewSlides(slides);
};
