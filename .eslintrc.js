module.exports = {
  env: {
    browser: false,
    es6: true,
    jquery: true,
    node: true,
  },
  plugins: ['react', 'jsx-a11y', 'prettier'],
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:prettier/recommended',
  ],
  globals: {
    document: true,
    fetch: false,
    L: true,
    MutationObserver: true,
    Swiper: true,
    window: true,
    wp: true,
    wpApiSettings: true,
  },
  parserOptions: {
    parser: '@babel/eslint-parser',
    ecmaFeatures: {
      jsx: true,
      modules: true,
    },
    ecmaVersion: 2020,
    requireConfigFile: false,
    sourceType: 'module',
  },
  settings: {
    react: {
      pragma: 'wp',
      version: 'detect',
    },
  },
  rules: {
    'prettier/prettier': 'error',
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off',
  },
}
