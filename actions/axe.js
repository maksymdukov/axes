const {
  client,
  locales,
  C_SORT_ORDER
} = require('../server/config/contentful');
const { normalizeAxe, numberOfPages } = require('./axe.utils');
const { AXES_SORT } = require('./axe.constants');

const AXE_PAGE_SIZE = 10;

const getAxeEntries = (lang, options) =>
  client.getEntries({
    content_type: 'axe',
    locale: locales[lang] || locales.ua,
    ...options
  });

const getFeaturedAxes = async (lang) => {
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

const getLastAxes = async (lang) => {
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

const getAxes = async ({
  lang,
  page = 1,
  size = AXE_PAGE_SIZE,
  sort = AXES_SORT.createdAt,
  sortOrder = C_SORT_ORDER.desc
} = {}) => {
  try {
    const entries = await getAxeEntries(lang, {
      select: 'fields',
      limit: AXE_PAGE_SIZE,
      skip: (page - 1) * AXE_PAGE_SIZE,
      order: `${sortOrder}${sort}`
    });
    return {
      items: entries.items.map(normalizeAxe),
      size,
      page,
      total: entries.total
    };
  } catch (e) {
    console.error(e);
  }
};

const getNumberOfAxesPages = async () => {
  const { total, size } = await getAxes({});
  return numberOfPages({ total, size });
};

const getAxesSlugs = async () => {
  try {
    const entries = await getAxeEntries(undefined, {
      select: 'fields.slug'
    });
    return entries.items.map((itm) => itm.fields.slug);
  } catch (e) {
    console.error(e);
  }
};

const getAxeBySlug = async (lang, slug) => {
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

const getAxesAroundDate = async ({ lang, date, limit = 5, forward = true }) => {
  const direction = forward ? 'gt' : 'lt';
  const entries = await getAxeEntries(lang, {
    [`sys.createdAt[${direction}]`]: date,
    limit
  });
  return entries.items.map(normalizeAxe);
};

module.exports = {
  getFeaturedAxes,
  getLastAxes,
  getAxes,
  getAxesSlugs,
  getAxeBySlug,
  getAxesAroundDate,
  getNumberOfAxesPages
};
