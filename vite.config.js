import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import { resolve } from 'path';
import vue from '@vitejs/plugin-vue';
import vueDevTools from 'vite-plugin-vue-devtools';
import eslint from 'vite-plugin-eslint';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import dynamicImportVars from '@rollup/plugin-dynamic-import-vars';
import babel from '@rollup/plugin-babel';
import { execSync } from 'child_process';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    {
      // run after build or build:watch process
      // https://rollupjs.org/plugin-development/#build-hooks
      name: 'post-commands',
      closeBundle: async () => {
        await execSync('npm run build:post-commands');
        console.log('build:post-commands completed');
      },
    },
    vue(),
    vueDevTools(),
    // needed because otherwise we get "SyntaxError: Identifier 'h' has already been declared"
    // in Nuxt
    babel({
      // https://github.com/rollup/plugins/tree/master/packages/babel#babelhelpers
      // user 'runtime' for libraries for improved code deduplication
      babelHelpers: 'runtime',
      // avoid missing source files
      exclude: ['node_modules/**'],
    }),
    eslint(),
  ],
  resolve: {
    extensions: ['*', '.js', '.json'],
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '~': fileURLToPath(new URL('', import.meta.url)),
    },
  },
  build: {
    sourcemap: true,
    lib: {
      entry: resolve(__dirname, './src/index.js'),
      name: 'BaseUiComponents',
      fileName: 'base-ui-components',
    },
    rollupOptions: {
      // silence source map errors that are there because of some mismatch
      // in rollup? (see https://github.com/vitejs/vite/issues/15012#issuecomment-1858010382)
      onwarn(warning, defaultHandler) {
        if (warning.code === 'SOURCEMAP_ERROR') {
          return;
        }
        defaultHandler(warning);
      },
      external: [
        'vue',
        'vue-i18n',
        'swiper',
        'hls.light.js',
        'hls.js/dist/hls.light.js',
        'pdfjs-dist/legacy/build/pdf.mjs',
        'pdfjs-dist/legacy/build/pdf.worker.mjs',
      ],
      output: {
        chunkFileNames: 'assets/[name].[hash].js',
        globals: {
          vue: 'Vue',
          swiper: 'Swiper',
          'vue-i18n': 'VueI18n',
          'hls.light.js': 'Hls',
          'hls.js/dist/hls.light.js': 'Hls',
          'pdfjs-dist/legacy/build/pdf.mjs': 'Pdfjs1',
          'pdfjs-dist/legacy/build/pdf.worker.mjs': 'Pdfjs2',
        },
      },
      plugins: [
        nodeResolve(),
        dynamicImportVars(),
      ],
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        // currently deprecation warnings from sass concerning legacy js API and from
        // datepicker - added the two settings below to not pollute console
        silenceDeprecations: ['legacy-js-api', 'import'],
        quietDeps: true,
      },
    },
    postcss: {
      // the configuration was defined here (and not in an external file)
      // to prevent in a npm-link-setup the plugins from being requested in the parent module
      plugins: [
        () => import('autoprefixer'),
        // needed for import of external css (e.g. leaflet)
        // needs to be before postcss-url to have leaflet background-images included
        () => import('postcss-import'),
        // remove comments
        () => import('postcss-discard-comments'),
      ],
    },
  },
  define: {
    'process.env': {},
    // enable hydration mismatch details in production build
    // TODO: this should probably be set false in future
    __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: 'true',
  },
  server: {
    port: 8080,
  },
});
