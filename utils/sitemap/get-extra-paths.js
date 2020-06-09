const { getAxesSlugs, getNumberOfAxesPages } = require('../../apis/server/axe');

const getExtraPaths = async () => {
  const extraPaths = [];

  // /axe/[axeId]
  const slugs = await getAxesSlugs();
  slugs.forEach((slug) => extraPaths.push(`/axe/${slug}`));

  // /axes/[page]
  const number = await getNumberOfAxesPages();
  Array.from({ length: number }).forEach((_, idx) => {
    if (idx === 0) {
      // first page rendered as index
      return;
    }
    extraPaths.push(`/axes/${idx + 1}`);
  });

  return extraPaths;
};

module.exports = { getExtraPaths };
