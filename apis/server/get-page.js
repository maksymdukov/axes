import { locales } from '~/server/config/contentful';
import { apiRequest } from '~/utils/api';

export const getFullPage = (lang, page) =>
  apiRequest({
    url: `/v1/pages/${page}`,
    params: {
      locale: locales[lang]
    }
  });

export const getSovetyPage = async (lang) => {
  const data = await getFullPage(lang, 'sovety');
  return data.languages[0].content;
};

export const getAboutPage = async (lang) => {
  const data = await getFullPage(lang, 'about');
  return data.languages[0].content;
};
