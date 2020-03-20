const NextI18Next = require("next-i18next");

const NextI18NextInstance = new NextI18Next.default({
  defaultLanguage: "ru",
  otherLanguages: ["ua"],
  localeSubpaths: {
    ua: "ua"
  },
  keySeparator: "."
});

module.exports = NextI18NextInstance;

/* Optionally, export class methods as named exports */
