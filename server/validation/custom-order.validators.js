const v = require("./index");

const schema = {
  name: { type: "string", min: 3, max: 255 },
  surname: { type: "string", min: 3, max: 255 },
  email: { type: "email" },
  phone: {
    type: "string",
    length: 17,
    custom: v =>
      /\+38\(\d{3}\)\d{3}-\d{2}-\d{2}/i.test(v)
        ? true
        : [{ type: "phoneNumber" }]
  },
  delivery: {
    type: "enum",
    values: ["novaposhta", "ukrposhta"]
  },
  npNumber: {
    type: "string",
    custom: v =>
      /\d+/.test(v) ? true : [{ type: "string", message: "Must be a number" }],
    optional: true
  },
  ukrAddress: {
    type: "string",
    optional: true,
    max: 255
  },
  message: {
    type: "string",
    optional: true,
    max: 5000
  }
};
const check = v.compile(schema);

const maxFileSize = 1024 * 1024 * 5; // 5 Mb
const invalidateFiles = files => {
  const fileKeys = Object.keys(files);
  if (!fileKeys.length) return false;
  return fileKeys.some(fileName => {
    if (files[fileName].size > maxFileSize) {
      return true;
    }
    if (!/image\/.*/i.test(files[fileName].type)) {
      return true;
    }
  });
};

module.exports = {
  check,
  invalidateFiles
};
