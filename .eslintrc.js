module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  extends: ['airbnb-base',  'prettier'],
  puglins: ['prettier'],
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    'class-methods-use-this': 'off',
    'no-param-reassign': 'off',
    camelcase: 'off',
    'no-underscore-dangle': 'off',
    'no-unused-vars': ['error', { argsIgnorePattern: 'next' }],
    'linebreak-style': 'CRLF',
  },
};
