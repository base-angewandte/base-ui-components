import path from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue2';
// Todo: implement eslint
// import eslint from 'vite-plugin-eslint';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // eslint({ cache: false }),
  ],
  resolve: {
    extensions: ['*', '.js', '.vue', '.json'],
    alias: {
      '@': path.resolve(__dirname, './src'),
      '~': path.resolve(__dirname, ''),
    },
  },
  build: {
    cssCodeSplit: true,
    minify: true,
    sourcemap: true,
    lib: {
      entry: path.resolve(__dirname, 'src/components/index.js'),
      name: 'BaseUiComponents',
      fileName: '[name]',
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
      external: [
        'vue',
        'vue2-datepicker',
        'lazysizes',
        'swiper',
      ],
      output: {
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === 'style.css') return 'base-ui-components.css';
          return assetInfo.name;
        },
        exports: 'named',
        globals: {
          vue: 'Vue',
          'vue2-datepicker': 'Datepicker',
          lazysizes: 'lazysizes',
          swiper: 'Swiper',
        },
        preserveModules: true,
        preserveModulesRoot: 'lib',
      },
    },
  },
  css: {
    postcss: {},
  },
  server: {
    port: 8080,
  },
});
