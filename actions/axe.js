import { client, locales } from '../server/config/contentful';
import { normalizeAxe } from './axe.utils';

const AXE_PAGE_SIZE = 10;

export const getAxeEntries = (lang, options) =>
  client.getEntries({
    content_type: 'axe',
    locale: locales[lang],
    ...options
  });

export const getFeaturedAxes = async (lang) => {
  try {
    const entries = await getAxeEntries(lang, {
      select: 'fields',
      'fields.featured': true
    });
    return entries.items.map(normalizeAxe);
  } catch (e) {
    console.error(e);
  }
};

export const getLastAxes = async (lang) => {
  try {
    const entries = await getAxeEntries(lang, {
      select: 'fields',
      'fields.featured[ne]': true,
      limit: 5
    });
    return entries.items.map(normalizeAxe);
  } catch (e) {
    console.error(e);
  }
};

export const getAxes = async (lang, page) => {
  try {
    const entries = await getAxeEntries(lang, {
      select: 'fields',
      limit: AXE_PAGE_SIZE,
      skip: (page - 1) * AXE_PAGE_SIZE,
      order: '-sys.createdAt'
    });
    return {
      data: entries.items.map(normalizeAxe),
      pageCount: Math.ceil(entries.total / AXE_PAGE_SIZE),
      total: entries.total
    };
  } catch (e) {
    console.error(e);
  }
};

export const getAxesSlugs = async () => {
  try {
    const entries = await getAxeEntries(locales.ua, {
      select: 'fields.slug'
    });
    return entries.items.map((itm) => itm.fields.slug);
  } catch (e) {
    console.error(e);
  }
};

export const getAxeBySlug = async (lang, slug) => {
  try {
    const entries = await getAxeEntries(lang, {
      select: 'fields',
      'fields.slug': slug
    });
    return normalizeAxe(entries.items[0]);
  } catch (e) {
    console.error(e);
  }
};

export const getAxesAroundDate = async ({
  lang,
  date,
  limit = 5,
  forward = true
}) => {
  const direction = forward ? 'gt' : 'lt';
  const entries = await getAxeEntries(lang, {
    [`sys.createdAt[${direction}]`]: date,
    limit
  });
  return entries.items.map(normalizeAxe);
};
