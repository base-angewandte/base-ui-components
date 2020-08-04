// rollup.config.js
import fs from 'fs';
import path from 'path';
import vue from 'rollup-plugin-vue';
import alias from '@rollup/plugin-alias';
import commonjs from '@rollup/plugin-commonjs';
import replace from '@rollup/plugin-replace';
import resolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import image from '@rollup/plugin-image';
import postcss from 'rollup-plugin-postcss';
import bundleSize from 'rollup-plugin-bundle-size';
import css from 'rollup-plugin-css-only';
import { terser } from 'rollup-plugin-terser';
import minimist from 'minimist';

import pack from '../package.json';

// Get browserslist config and remove ie from es build targets
const esbrowserslist = pack.browserslist
  .toString()
  .split('\n')
  .filter((entry) => entry && entry.substring(0, 2) !== 'ie');

const argv = minimist(process.argv.slice(2));
const projectRoot = path.resolve(__dirname, '..');
const baseFolder = './src/';
const componentsFolder = 'components/';

const bannerTxt = `/*! base UI components v${pack.version} | Apache License, Version 2.0 | github.com/base-angewandte/base-ui-components */`;

const components = fs
  .readdirSync(baseFolder + componentsFolder)
  .filter((f) =>
    fs.statSync(path.join(baseFolder + componentsFolder, f))
      .isDirectory()
  );

const entries = {
  'index': './src/entry.js',
  ...components.reduce((obj, name) => {
    obj[name] = (baseFolder + componentsFolder + name);
    return obj;
  }, {})
};

components.forEach((component) => {
  fs.writeFileSync(
    path.resolve(`${baseFolder}/${componentsFolder}/${component}`, 'index.js'),
    `import ${component} from './${component}';

import { use, registerComponent } from '../../utils/plugins';
import '../../styles/lib.scss';

const Plugin = {
    install(Vue) {
        registerComponent(Vue, ${component})
    }
};

use(Plugin);

export default Plugin;

export {
    ${component}
};`,
  );
});

const baseConfig = {
  input: entries,
  plugins: {
    resolve: {
      extensions: ['.mjs', '.js', '.json', '.node', '.vue'],
    },
    preVue: [
      alias({
        resolve: ['.js', '.jsx', '.ts', '.tsx', '.vue'],
        entries: {
          '@': path.resolve(projectRoot, 'src'),
        },
      }),
    ],
    replace: {
      'process.env.NODE_ENV': JSON.stringify('production'),
      'process.env.ES_BUILD': JSON.stringify('false'),
    },
    css: {
      output: 'dist/base-ui-components.css',
    },
    vue: {
      css: false,
      postcss: {
        plugins: require('../postcss.config.js')().plugins,
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
  },
};

// ESM/UMD/IIFE shared settings: externals
// Refer to https://rollupjs.org/guide/en/#warning-treating-module-as-external-dependency
const external = [
  // list external dependencies, exactly the way it is written in the import statement.
  // eg. 'jquery'
  'vue',
  // /@babel\/runtime/,
  'vue2-datepicker',
];

// UMD/IIFE shared settings: output.globals
// Refer to https://rollupjs.org/guide/en#output-globals for details
const globals = {
  // Provide global variable names to replace your external imports
  // eg. jquery: '$'
  vue: 'Vue',
  'vue2-datepicker': 'Datepicker',
};

function mapComponent(name) {
  return [
    {
      ...baseConfig,
      external,
      input: baseFolder + componentsFolder + `${name}/index.js`,
      output: {
        format: 'iife',
        name: name,
        file: `dist/components/${name}/index.js`,
        banner: bannerTxt,
        exports: 'named',
        globals,
        compact: true,
      },
      inlineDynamicImports: true,
      plugins: [
        resolve(baseConfig.plugins.resolve),
        replace(baseConfig.plugins.replace),
        ...baseConfig.plugins.preVue,
        vue({
          ...baseConfig.plugins.vue,
          ...{ css: true }
        }),
        babel(baseConfig.plugins.babel),
        commonjs(),
        image(),
        terser({
          output: {
            ecma: 5,
          },
        }),
        postcss(),
        bundleSize(),
      ],
    }
  ];
}

// Customize configs for individual targets
let buildFormats = [];
if (!argv.format || argv.format === 'es') {
  const esConfig = {
    ...baseConfig,
    external,
    output: {
      format: 'esm',
      dir: 'dist/esm',
      exports: 'named',
    },
    plugins: [
      resolve(baseConfig.plugins.resolve),
      replace({
        ...baseConfig.plugins.replace,
        'process.env.ES_BUILD': JSON.stringify('true'),
      }),
      ...baseConfig.plugins.preVue,
      css(baseConfig.plugins.css),
      vue(baseConfig.plugins.vue),
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
      commonjs(),
      image(),
      postcss(),
    ],
  };
  buildFormats.push(esConfig);
}

if (!argv.format || argv.format === 'cjs') {
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
      resolve(baseConfig.plugins.resolve),
      replace(baseConfig.plugins.replace),
      ...baseConfig.plugins.preVue,
      css(baseConfig.plugins.css),
      vue({
        ...baseConfig.plugins.vue,
        template: {
          ...baseConfig.plugins.vue.template,
          optimizeSSR: true,
        },
      }),
      babel(baseConfig.plugins.babel),
      commonjs(),
      image(),
      postcss(),
    ],
  };
  buildFormats.push(umdConfig);
}

if (!argv.format || argv.format === 'iife') {
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
    plugins: [
      bundleSize(),
      resolve(baseConfig.plugins.resolve),
      replace(baseConfig.plugins.replace),
      ...baseConfig.plugins.preVue,
      css(baseConfig.plugins.css),
      vue(baseConfig.plugins.vue),
      babel(baseConfig.plugins.babel),
      commonjs(),
      image(),
      terser({
        output: {
          ecma: 5,
        },
      }),
      postcss(),
    ],
  };
  buildFormats.push(unpkgConfig);
}

if (!argv.format || argv.format === 'components') {
  const componentConfig = components.map((f) => mapComponent(f))
    .reduce((r, a) => r.concat(a), []);
  buildFormats = buildFormats.concat(componentConfig);
}

// Export config
export default buildFormats;
