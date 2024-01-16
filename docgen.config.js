const path = require('path');
const glob = require('globby');

const cwd = path.join(__dirname, './src');

// add files that should be ignored here
const ignore = [
  'components/BaseTooltip/*',
  'components/BaseExpandList/BaseExpandListRow.vue',
  'components/BaseMediaCarousel/BaseMediaCarouselItem.vue',
  'components/BaseAdvancedSearchRow/*',
  // currently hidden for accessibility reasons
  'components/BaseDatePanel/*',
];

// get all files that should be converted to .md files
const components = glob
  .sync('components/**/Base*.{vue,js,jsx,ts,tsx}', {
    cwd,
    ignore,
  })
  // modify path to match the docgen requirements (relative to componentsRoot)
  .map(f => f.replace('components/', ''));

module.exports = {
  docsFolder: 'docs',
  componentsRoot: 'src/components',
  components,
  outDir: './docs/components',
  defaultExamples: true,
  apiOptions: {
    jsx: false,
    alias: {
      styles: path.resolve(__dirname, './docs/.vuepress/styles'),
      '@': path.resolve(__dirname, './src'),
    },
  },
  // create a file with .md ending instead of .vue
  getDestFile: (file, config) => path.join(config.outDir, file.split('/')[1]).replace(/\.vue$/, '.md'),
};
