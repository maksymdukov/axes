const { normalizeAxe, numberOfPages } = require('./axe.utils');
const { AXES_SORT, locales, C_SORT_ORDER } = require('./axe.constants');
const { config } = require('../../config/config');
const { apiRequest } = require('~/utils/api');

const getAxes = async ({
  lang,
  page = 1,
  size = config.AXE_PAGE_SIZE,
  sort = AXES_SORT.createdAt,
  sortOrder = C_SORT_ORDER.desc,
  params
} = {}) => {
  try {
    const entries = await apiRequest({
      url: '/v1/products',
      params: {
        locale: locales[lang] || locales.ua,
        page,
        size,
        sort,
        order: sortOrder,
        ...params
      }
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
    params: {
      featured: true
    }
  });
};

const getLastAxes = async (lang) => {
  return getAxes({
    lang,
    size: 5,
    params: {
      featured: false
    }
  });
};

const getNumberOfAxesPages = async () => {
  const { total, size } = await getAxes({});
  return numberOfPages({ total, size });
};

const getAxesSlugs = async () => {
  try {
    const entries = await apiRequest({ url: '/v1/products/slugs' });
    return entries.map((itm) => itm.slug);
  } catch (e) {
    console.error(e);
  }
};

const getAxeBySlug = async (locale, slug) => {
  try {
    const entry = await apiRequest({
      url: `/v1/products/slug/${slug}`,
      params: { locale: locales[locale] }
    });
    return normalizeAxe(entry);
  } catch (e) {
    console.error(e);
  }
};

const getAxesAroundDate = async ({ lang, date, size = 5, forward = true }) => {
  const direction = forward ? 'gt' : 'lt';
  return getAxes({
    lang,
    size,
    params: {
      condition: 'createdAt',
      direction,
      date
    }
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
