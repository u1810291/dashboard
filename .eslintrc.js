'use strict'

module.exports = {
  extends: 'airbnb',
  parser: 'babel-eslint',
  plugins: ['react-hooks'],
  rules: {
    'function-paren-newline': 0,
    'jsx-a11y/anchor-is-valid': 0,
    'no-console': ['error', { allow: ['warn', 'error'] }],
    'no-else-return': 0,
    'no-param-reassign': 0,
    'no-shadow': 'warn',
    'no-underscore-dangle': ['error', { allow: ['_embedded', '_id', '_hsq', '_links'] }],
    'object-curly-newline': ['error', { multiline: true, consistent: true }],
    'react/destructuring-assignment': [
      2,
      'always',
      { ignoreClassFields: true },
    ],
    // TODO: Disable this option and fix errors after
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'react/jsx-props-no-spreading': 0,
    'react/prop-types': 0,
    'react/static-property-placement': [2, 'static public field'],
    'react-hooks/exhaustive-deps': 'warn',
    'react-hooks/rules-of-hooks': 'error',
    'import/prefer-default-export': 0,
    'max-len': 'off',
    'no-nested-ternary': 0
  },
  env: {
    browser: true,
    es6: true,
    jest: true,
  },
  globals: {
    specHelper: 'readonly',
  },
  settings: {
    'import/resolver': {
      node: {},
      'babel-module': {
        root: ['.', './src'],
      },
    },
  },
}
