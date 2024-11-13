import { defineConfig } from 'vue-docgen-cli';
import * as path from 'path';
import { globbySync } from 'globby';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const cwd = path.join(__dirname, './src');

const ignore = [
  'components/BaseTooltip/*',
  'components/BaseExpandList/BaseExpandListRow.vue',
  'components/BaseMediaCarousel/BaseMediaCarouselItem.vue',
  'components/BaseAdvancedSearch/BaseAdvancedSearchRow.vue',
  'components/BaseAdvancedSearch/BaseCollapsedFilterRow.vue',
  'components/BaseAdvancedSearch/BaseCollapsedFilterItem.vue',
  // currently hidden for accessibility reasons
  'components/BaseDatePanel/*',
];

const components = globbySync('components/**/Base*.{vue,js,jsx,ts,tsx}', {
    cwd,
    ignore,
  })
  // modify path to match the docgen requirements (relative to componentsRoot)
  .map(f => f.replace('components/', ''));

export default defineConfig({
  componentsRoot: 'src/components',
  components,
	outDir: './docs/components',
	defaultExamples: true,
  apiOptions: {
    jsx: false,
    alias: {
      styles: path.resolve(__dirname, './docs/.vitepress/styles'),
      '@': path.resolve(__dirname, './src'),
    },
  },
  getDestFile: (file, config) => path.join(config.outDir, file.split('/')[1] || file).replace(/\.vue$/, '.md'),
  docsRepo: false,
  editLinkLabel: false,
  getRepoEditUrl: false,
})
