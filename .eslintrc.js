module.exports = {
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2015
  },
  extends: ['plugin:prettier/recommended'],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js']
};
