module.exports = {
  env: {
    browser: true,
    node: true,
    es6: true
  },
  extends: ["eslint:recommended", "plugin:react/recommended"],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly"
  },
  parser: "babel-eslint",
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 11,
    sourceType: "module"
  },
  plugins: ["react"],
  rules: {
    "react/prop-types": "off",
    "react/display-name": "off"
  }
};
