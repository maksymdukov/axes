import { locales } from './axe.constants';
import { apiRequest } from '~/utils/api';
import { extractPageContent } from './get-page.utils';

export const getFullPage = (lang, page) =>
  apiRequest({
    url: `/v1/pages/${page}`,
    params: {
      locale: locales[lang]
    }
  });

export const getSovetyPage = async (lang) => {
  const data = await getFullPage(lang, 'sovety');
  return extractPageContent(data);
};

export const getAboutPage = async (lang) => {
  const data = await getFullPage(lang, 'about');
  return extractPageContent(data);
};
