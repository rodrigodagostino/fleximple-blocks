import { defineConfig, globalIgnores } from 'eslint/config'
import { FlatCompat } from '@eslint/eslintrc'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import globals from 'globals'
import js from '@eslint/js'
import react from 'eslint-plugin-react'
import jsxA11Y from 'eslint-plugin-jsx-a11y'
import prettier from 'eslint-plugin-prettier'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
})

export default defineConfig([
  globalIgnores([
    '**/*.min.js',
    '**/*.build.js',
    '**/node_modules/**/*',
    '**/vendor/**/*',
    '**/assets',
    '**/build',
    '**/dist',
    '**/coverage',
    '**/cypress',
    '**/languages',
    '**/node_modules',
    '**/vendor',
  ]),
  {
    extends: compat.extends(
      'eslint:recommended',
      'plugin:react/recommended',
      'plugin:jsx-a11y/recommended',
      'plugin:prettier/recommended'
    ),

    plugins: {
      react,
      'jsx-a11y': jsxA11Y,
      prettier,
    },

    languageOptions: {
      globals: {
        ...Object.fromEntries(
          Object.entries(globals.browser).map(([key]) => [key, 'off'])
        ),
        ...globals.jquery,
        ...globals.node,
        document: true,
        fetch: false,
        L: true,
        MutationObserver: true,
        Swiper: true,
        window: true,
        wp: true,
        wpApiSettings: true,
      },

      ecmaVersion: 2020,
      sourceType: 'module',

      parserOptions: {
        parser: '@babel/eslint-parser',

        ecmaFeatures: {
          jsx: true,
          modules: true,
        },

        requireConfigFile: false,
      },
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
  },
])
