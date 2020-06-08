const path = require('path');
const sitemap = require('nextjs-sitemap-generator');

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const { getExtraPaths } = require('./get-extra-paths');

const baseUrl = 'https://sokyra.net.ua';
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
