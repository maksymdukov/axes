//next.config.js

const path = require('path');
// eslint-disable-next-line
const webpack = require('webpack');
// eslint-disable-next-line
const dotenv = require('dotenv').config();

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
  env: {
    // Used when building a bundle
    CONTENTFUL_SPACE_ID: process.env.CONTENTFUL_SPACE_ID,
    CONTENTFUL_ACCESS_TOKEN: process.env.CONTENTFUL_ACCESS_TOKEN,
    COMMENTS_SERVICE_URL: process.env.COMMENTS_SERVICE_URL
  }
};
