import { apiRequest } from '~/utils/api';
import { locales } from '../../server/config/contentful';
import { normalizeSlide } from './slider.utils';

export const getSlides = async (locale) => {
  const slides = await apiRequest({
    params: {
      size: 20,
      locale: locales[locale]
    }
  });
  return slides.items.map(normalizeSlide);
};
