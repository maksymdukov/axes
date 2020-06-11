const {
  client,
  locales,
  C_SORT_ORDER
} = require('../../server/config/contentful');
const { normalizeAxe, numberOfPages } = require('./axe.utils');
const { AXES_SORT } = require('./axe.constants');
const { config } = require('../../config/config');

const getAxeEntries = (lang, options) =>
  client.getEntries({
    content_type: 'axe',
    locale: locales[lang] || locales.ua,
    ...options
  });

const getAxes = async ({
  lang,
  page = 1,
  size = config.AXE_PAGE_SIZE,
  sort = AXES_SORT.createdAt,
  sortOrder = C_SORT_ORDER.desc,
  ...otherOpts
} = {}) => {
  try {
    const entries = await getAxeEntries(lang, {
      select: 'fields',
      limit: config.AXE_PAGE_SIZE,
      skip: (page - 1) * config.AXE_PAGE_SIZE,
      order: `${sortOrder}${sort}`,
      ...otherOpts
    });
    return {
      items: (entries.items && entries.items.map(normalizeAxe)) || [],
      size,
      page,
      total: entries.total
    };
  } catch (e) {
    console.error(e);
  }
};

const getFeaturedAxes = async (lang) => {
  return getAxes({
    lang,
    'fields.featured': true
  });
};

const getLastAxes = async (lang) => {
  return getAxes({
    lang,
    size: 5,
    'fields.featured[ne]': true
  });
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

const getAxesAroundDate = async ({ lang, date, size = 5, forward = true }) => {
  const direction = forward ? 'gt' : 'lt';
  return getAxes({
    lang,
    size,
    [`sys.createdAt[${direction}]`]: date
  });
};

const getAdjacentAxes = async ({ lang, date }) => {
  // Fetch adjacent axes to show them in 'You might like section'
  let adjacentAxes = await getAxesAroundDate({ lang, date });
  // If not found try finding later posts
  if (!(Array.isArray(adjacentAxes.items) && adjacentAxes.items.length)) {
    adjacentAxes = await getAxesAroundDate({
      lang,
      date,
      forward: false
    });
  }
  return adjacentAxes;
};

module.exports = {
  getFeaturedAxes,
  getLastAxes,
  getAxes,
  getAxesSlugs,
  getAxeBySlug,
  getAdjacentAxes,
  getNumberOfAxesPages
};
