//next.config.js

const path = require('path');
// eslint-disable-next-line
// const webpack = require('webpack');

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
  }
};
