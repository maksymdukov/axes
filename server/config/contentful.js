const client = require('contentful').createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN
});

exports.client = client;

exports.locales = {
  ua: 'uk',
  ru: 'ru',
  uk: 'ua'
};

exports.C_SORT_ORDER = {
  asc: 'ASC',
  desc: 'DESC'
};
