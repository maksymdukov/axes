//next.config.js

const path = require('path');
const webpack = require('webpack');
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
    CONTENTFUL_SPACE_ID: process.env.CONTENTFUL_SPACE_ID,
    CONTENTFUL_ACCESS_TOKEN: process.env.CONTENTFUL_ACCESS_TOKEN,
    PUBLIC_DOMAIN: process.env.PUBLIC_DOMAIN,
    PUBLIC_URL: process.env.PUBLIC_URL
  }
};
