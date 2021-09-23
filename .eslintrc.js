module.exports = {
  root: true,
  extends: [
    'digitalbazaar',
    'digitalbazaar/jsdoc'
  ],
  env: {
    node: true,
    browser: true
  },
  parserOptions: {
    // this is required for dynamic import()
    ecmaVersion: 2020
  },
  ignorePatterns: ['node_modules', 'dist'],
  rules: {
    'jsdoc/check-examples': 0
  }
};
