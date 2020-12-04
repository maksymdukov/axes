import { locales } from '~/server/config/contentful';
import { apiRequest } from '~/utils/api';
import { normalizeReviewSlides } from './review-slides.utils';

export const getReviewSlides = async (locale) => {
  const slides = await apiRequest({
    url: '/api/v1/review-slides',
    params: {
      locale: locales[locale],
      size: 20
    }
  });
  return normalizeReviewSlides(slides.items || []);
};
