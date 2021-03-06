// rollup.config.js
import fs from 'fs';
// eslint-disable-next-line import/no-extraneous-dependencies
import path from 'path';
// to be able to process vue files with rollup
import vue from 'rollup-plugin-vue';
// Alias modules in a build (like webpack)
import alias from '@rollup/plugin-alias';
// Convert CommonJS modules to ES Modules.
import commonjs from '@rollup/plugin-commonjs';
// Replace occurrences of a set of strings.
import replace from '@rollup/plugin-replace';
import resolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
// Import JPG, PNG, GIF and SVG images.
import image from '@rollup/plugin-image';
// show generated bundle sizes
import bundleSize from 'rollup-plugin-bundle-size';
// for css extraction
import css from 'rollup-plugin-css-only';
// make sure external dependencies are not included in bundle
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import { terser } from 'rollup-plugin-terser';
import minimist from 'minimist';

// access package.json e.g. for version information
import pack from '../package.json';

// make sure every component has a index file
require('./generate-index-files');

console.info('Lets build!');

// Get browserslist config and remove ie from es build targets
const esbrowserslist = pack.browserslist
  .filter(entry => entry && entry.substring(0, 2) !== 'ie');

const argv = minimist(process.argv.slice(2));
const projectRoot = path.resolve(__dirname, '..');

// from buefy - define base folder and components folder
const baseFolder = './src/';
const componentsFolder = 'components/';

// set a banner line for each generated file
const bannerTxt = `/*! base UI components v${pack.version} | Apache License, Version 2.0 | github.com/base-angewandte/base-ui-components */`;

// from buefy - get all component names directly from components folder
const components = fs
  .readdirSync(baseFolder + componentsFolder)
  .filter(f => fs.statSync(path.join(baseFolder + componentsFolder, f)).isDirectory());

// get a list of all entries to consider in bundle generation
const entries = {
  index: './src/entry.js',
  ...components.reduce((obj, name) => {
    return ({ ...obj, ...{ [name]: `${baseFolder}${componentsFolder}${name}`} });
  }, {}),
};

// from sfc-template - base config for all formats
const baseConfig = {
  input: entries,
  plugins: {
    preVue: [
      // Preferably set as first plugin.
      peerDepsExternal(),
      // plugin for aliases (to work in webpack and rollup) (should come before node-resolve)
      alias({
        resolve: ['.js', '.jsx', '.ts', '.tsx', '.vue'],
        entries: {
          '@': path.resolve(projectRoot, 'src'),
          '~': path.resolve(projectRoot, 'node_modules'),
        },
      }),
      // allow for skipping file extensions
      resolve({
        extensions: ['.mjs', '.js', '.json', '.node', '.vue'],
      }),
      image(),
      commonjs(),
    ],
    // define file name for separate css file
    // only for esm build with css-extract!
    css: {
      output: 'dist/base-ui-components.css',
    },
    vue: {
      style: {
        // instead of separate postcss() run it in vue directly
        postcssPlugins: require('../postcss.config.js')().plugins,
        preprocessOptions: {
          scss: {
            includePaths: ['node_modules'],
            implementation: require('dart-sass'),
          }
        },
      },
      template: {
        isProduction: true,
      },
    },
    babel: {
      exclude: 'node_modules/**',
      // https://github.com/rollup/plugins/tree/master/packages/babel#babelhelpers
      // user 'runtime' for libraries for improved code deduplication
      babelHelpers: 'runtime',
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.vue'],
    },
    replace: {
      // recommended by new patch version of @rollup/plugin-replace
      preventAssignment: true,
      // remove logger from hls.js due problems with ssr
      'Object(_utils_logger__WEBPACK_IMPORTED_MODULE_2__["enableLogs"])(config.debug); // signal end of worker init': '',
    },
  },
};

// ESM/UMD/IIFE shared settings: externals
// Refer to https://rollupjs.org/guide/en/#warning-treating-module-as-external-dependency
const external = [
  // list external dependencies, exactly the way it is written in the import statement.
  // eg. 'jquery'
  'vue',
  'vue2-datepicker',
  'lazysizes',
  'swiper',
];

// UMD/IIFE shared settings: output.globals
// Refer to https://rollupjs.org/guide/en#output-globals for details
const globals = {
  // Provide global variable names to replace your external imports
  // eg. jquery: '$'
  vue: 'Vue',
  'vue2-datepicker': 'Datepicker',
  'lazysizes': 'lazysizes',
  'swiper': 'Swiper',
};

/**
 *
 * @param {string} name - the component name string
 * @returns {Object} - a rollup config objects in iife format for a component
 */
const mapComponent = name => ({
  ...baseConfig,
  external,
  input: `${baseFolder + componentsFolder}${name}/index.js`,
  output: {
    format: 'iife',
    name,
    file: `dist/components/${name}/index.js`,
    banner: bannerTxt,
    exports: 'named',
    globals,
    compact: true,
  },
  inlineDynamicImports: true,
  plugins: [
    replace(baseConfig.plugins.replace),
    ...baseConfig.plugins.preVue,
    bundleSize(),
    css({
      output: `dist/components/${name}/${name}.css`,
    }),
    vue({
      ...baseConfig.plugins.vue,
      css: false,
    }),
    babel(baseConfig.plugins.babel),
    terser({
      output: {
        ecma: 5,
      },
    }),
  ],
});

// Customize configs for individual targets
let buildFormats = [];

// ESM build to be used with webpack/rollup
const esConfig = {
  ...baseConfig,
  external,
  output: {
    format: 'esm',
    dir: 'dist/esm',
    exports: 'named',
  },
  plugins: [
    replace({
      ...baseConfig.plugins.replace,
      'process.env.ES_BUILD': JSON.stringify('true'),
    }),
    ...baseConfig.plugins.preVue,
    css(baseConfig.plugins.css),
    vue({
      ...baseConfig.plugins.vue,
      // Setting { css: false } converts <style> blocks to import statements
      css: false,
    }),
    babel({
      ...baseConfig.plugins.babel,
      presets: [
        [
          '@babel/preset-env',
          {
            targets: esbrowserslist,
          },
        ],
      ],
    }),
  ],
};
buildFormats.push(esConfig);

// SSR build
const umdConfig = {
  ...baseConfig,
  external,
  output: {
    compact: true,
    format: 'cjs',
    dir: 'dist/cjs',
    exports: 'named',
    globals,
  },
  plugins: [
    replace(baseConfig.plugins.replace),
    ...baseConfig.plugins.preVue,
    css(baseConfig.plugins.css),
    vue({
      ...baseConfig.plugins.vue,
      template: {
        ...baseConfig.plugins.vue.template,
        optimizeSSR: true,
      },
      css: false,
    }),
    babel(baseConfig.plugins.babel),
  ],
};
buildFormats.push(umdConfig);

// Browser build
const unpkgConfig = {
  ...baseConfig,
  external,
  input: 'src/entry.js',
  output: {
    compact: true,
    file: 'dist/base-ui-components.min.js',
    format: 'iife',
    name: 'SrcRollupTest',
    exports: 'named',
    globals,
  },
  inlineDynamicImports: true,
  plugins: [
    bundleSize(),
    replace(baseConfig.plugins.replace),
    ...baseConfig.plugins.preVue,
    vue(baseConfig.plugins.vue),
    babel(baseConfig.plugins.babel),
    terser({
      output: {
        ecma: 5,
      },
    }),
  ],
};
buildFormats.push(unpkgConfig);

const componentConfig = components.map(f => mapComponent(f));
buildFormats = buildFormats.concat(componentConfig);

// Export config
export default buildFormats;
