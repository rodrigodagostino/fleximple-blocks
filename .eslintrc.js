module.exports = {
  env: {
    browser: false,
    es6: true,
    node: true,
    jquery: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:jsx-a11y/recommended',
  ],
  globals: {
    wp: true,
    wpApiSettings: true,
    window: true,
    document: true,
    fetch: false,
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
      modules: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [ 'react', 'jsx-a11y' ],
  settings: {
    react: {
      pragma: 'wp',
      version: 'detect',
    },
  },
  rules: {
    'array-bracket-spacing': [ 'error', 'always' ],
    'arrow-parens': [ 'error', 'as-needed' ],
    'arrow-spacing': [
      'error',
      {
        before: true,
        after: true,
      },
    ],
    'brace-style': [ 'error', '1tbs' ],
    camelcase: [
      'error',
      {
        properties: 'never',
      },
    ],
    'comma-dangle': [ 'error', 'always-multiline' ],
    'comma-spacing': 'error',
    'comma-style': 'error',
    'computed-property-spacing': [ 'error', 'always' ],
    'func-call-spacing': 'error',
    indent: [ 'error', 2 ],
    'key-spacing': [ 'error', { afterColon: true } ],
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-duplicate-imports': 'error',
    'no-else-return': 'error',
    'no-extra-parens': [ 'error', 'all', { ignoreJSX: 'all' } ],
    'no-extra-semi': 'error',
    'no-mixed-spaces-and-tabs': 'error',
    'no-multi-spaces': 'error',
    'no-redeclare': 'error',
    'no-useless-return': 'error',
    'no-whitespace-before-property': 'error',
    'object-curly-spacing': [ 'error', 'always' ],
    quotes: [ 'error', 'single' ],
    'quote-props': [ 'error', 'as-needed' ],
    semi: [ 'error', 'never' ],
    'semi-spacing': 'error',
    'space-before-blocks': [ 'error', 'always' ],
    'space-before-function-paren': [
      'error',
      {
        anonymous: 'always',
        named: 'never',
        asyncArrow: 'always',
      },
    ],
    'space-in-parens': [ 'error', 'always', { exceptions: [ '{}' ] } ],
    'space-unary-ops': [
      'error',
      {
        words: true,
        nonwords: false,
        // overrides: {
        // 	'!': true,
        // },
      },
    ],
    'template-curly-spacing': [ 'error', 'always' ],
    'react/display-name': 'off',
    'react/jsx-curly-spacing': [
      'error',
      {
        when: 'always',
        children: true,
      },
    ],
    'react/jsx-equals-spacing': 'error',
    'react/jsx-indent': [ 'error', 2 ],
    'react/jsx-indent-props': [ 'error', 2 ],
    'react/jsx-key': 'error',
    'react/jsx-tag-spacing': 'error',
    'react/no-children-prop': 'off',
    'react/no-find-dom-node': 'warn',
    'react/prop-types': 'off',
    'jsx-quotes': [ 'error', 'prefer-double' ],
  },
}
