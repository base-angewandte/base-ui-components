import js from "@eslint/js";
import pluginVue from 'eslint-plugin-vue';
import pluginVueA11y from "eslint-plugin-vuejs-accessibility";
import babelParser from "@babel/eslint-parser";
import vueParser from "vue-eslint-parser";
import process from 'node:process';

export default [
  js.configs.recommended,
  ...pluginVue.configs['flat/recommended'],
  ...pluginVueA11y.configs["flat/recommended"],
  {
    files: ["**/*.{js,vue}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parser: vueParser,
      parserOptions: {
        parser: babelParser,
      },
    },
    // add your custom rules here
    rules: {
      // disallow reassignment of function parameters
      // disallow parameter object manipulation except for specific exclusions
      'no-param-reassign': ['error', {
        props: true,
        ignorePropertyModificationsFor: [
          'state', // for vuex state
          'acc', // for reduce accumulators
          'e', // for e.return value
        ],
      }],
      'vue/html-closing-bracket-newline': ['error', {
        singleline: 'never',
        multiline: 'never',
      }],
      // allow debugger during development
      'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
      'no-console': [process.env.NODE_ENV === 'production' ? 2 : 0, { allow: ['warn', 'error']}],
      // unfortunately our audio and video files do not have the required format
      // (.vtt files) included -->
      'vuejs-accessibility/media-has-caption': 0,
    },
  },
  {
    // needs to be in a separate object to act as a global ignore (at LAST position)
    ignores: [
      "dist/",
      "build/",
      "styleguide/",
      "config/*.js",
      "docs/.vitepress/cache/",
      // ignore root level config files of any kind
      ".*",
      "*.config.{js,cjs,mjs}",
      "**/config.*.{js,cjs,mjs}",
      "gulpfile.js",
    ],
  },];
