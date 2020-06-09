import { client, locales } from '../../server/config/contentful';

export const getFullPages = (lang, options) =>
  client.getEntries({
    content_type: 'infoPage',
    locale: locales[lang],
    ...options
  });

export const getSovetyPage = async (lang) => {
  const data = await getFullPages(lang, {
    select: 'fields',
    'fields.title': 'Sovety'
  });
  return data.items[0].fields.content;
};

export const getAboutPage = async (lang) => {
  const data = await getFullPages(lang, {
    select: 'fields',
    'fields.title': 'ProNas'
  });
  return data.items[0].fields.content;
};
