//next.config.js

const path = require('path');
// eslint-disable-next-line
// const webpack = require('webpack');
const { locales, defaultLocale } = require('./i18n.json');

module.exports = {
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      issuer: {
        test: /\.(js|ts)x?$/
      },
      use: ['@svgr/webpack']
    });
    config.resolve.alias['~'] = path.resolve(__dirname);
    config.resolve.alias['@Components'] = path.resolve(__dirname, 'components');
    return config;
  },
  // env variables used by webpack
  env: {
    API_SERVICE_URL: process.env.API_SERVICE_URL
  },
  i18n: { locales, defaultLocale }
};
