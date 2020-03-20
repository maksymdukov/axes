const NextI18Next = require("next-i18next");

// console.log(
//   require("path").resolve(__dirname, "..", "public", "static", "locales")
// );

const NextI18NextInstance = new NextI18Next.default({
  defaultLanguage: "ru",
  otherLanguages: ["ua"],
  localeSubpaths: {
    ua: "ua"
  },
  keySeparator: "."
  // ...(!process.browser && {
  //   localePath: require("path").resolve(
  //     __dirname,
  //     "..",
  //     "public",
  //     "static",
  //     "locales"
  //   )
  // })
});

module.exports = NextI18NextInstance;

/* Optionally, export class methods as named exports */
