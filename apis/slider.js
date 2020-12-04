import { apiRequest } from '~/utils/api';
import { locales } from './axe.constants';
import { normalizeSlide } from './slider.utils';

export const getSlides = async (locale) => {
  const slides = await apiRequest({
    url: '/v1/slides',
    params: {
      size: 20,
      locale: locales[locale]
    }
  });
  return slides.items.map(normalizeSlide);
};
