const ejs = require("ejs");
const path = require("path");

const VIEWS_DIR = path.join(process.cwd(), "server", "templates");

module.exports = (filename, data, options) => {
  return new Promise((resolve, reject) => {
    const fullFileName = path.join(VIEWS_DIR, filename);
    ejs.renderFile(fullFileName, data, options, (err, str) => {
      if (err) {
        return reject(err);
      }
      resolve(str);
    });
  });
};
