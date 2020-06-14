const path = require('path');
const sitemap = require('nextjs-sitemap-generator');
const { isProd } = require('../env');
if (!isProd) {
  require('dotenv').config();
}
const { getExtraPaths } = require('./get-extra-paths');
const { config } = require('../../config/config');

const baseUrl = config.PUBLIC_URL;
const workingDir = process.cwd();

const generate = async () => {
  sitemap({
    baseUrl,
    alternateUrls: {
      uk: `${baseUrl}/ua`
    },
    ignoredPaths: ['api', '404', '[axeId]', '[page]'],
    extraPaths: await getExtraPaths(),
    pagesDirectory: path.join(workingDir, 'pages_'),
    targetDirectory: path.join(workingDir, 'public'),
    ignoredExtensions: ['png', 'jpg'],
    ignoreIndexFiles: true
  });

  console.log(`✅ sitemap.xml generated!`);
};

generate();
