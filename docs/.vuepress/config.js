const path = require('path');
const glob = require('globby');
const cwd = path.join(__dirname, '..');
const { parse } = require('vue-docgen-api');

module.exports = async () => {
  const sidebar = glob.sync('components/*.md', { cwd }).map(f => '/' + f);
  const components = await Promise.all(
    glob
      .sync('../src/components/**/Base*.{vue,js,jsx,ts,tsx}', { cwd, absolute: true })
      .map(async path => {
        const name = (await parse(path)).displayName.replace(/[^a-zA-Z0-9_]/g, '');
        return {
          name,
          path
        }
      })
  );

  return {
    base: '/base-ui-components/',
    /**
     * Ref：https://v1.vuepress.vuejs.org/config/#title
     */
    title: `base UI components v${process.env.npm_package_version}`,
    /**
     * Ref：https://v1.vuepress.vuejs.org/config/#description
     */
    description: 'A styleguide for base UI components, a component library for the university of Applied Arts Vienna',

    /**
     * Extra tags to be injected to the page HTML `<head>`
     *
     * ref：https://v1.vuepress.vuejs.org/config/#head
     */
    head: [
      ['meta', { name: 'theme-color', content: '#ffffff' }],
      ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
      ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
      ['meta', { name: 'viewport', content: 'width=device-width, initial-scale=1' }],
      ['meta', { name: 'apple-mobile-web-app-title', content: 'base' }],
      ['meta', { name: 'application-name', content: 'base' }],
      ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
      ['link', { rel: 'apple-touch-ico', sizes: '180x180', href: '/apple-touch-icon.png' }],
      ['link', { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' }],
      ['link', { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' }],
      ['link', { rel: 'mask-icon', sizes: '180x180', href: '/safari-pinned-tab.svg' }],
      ['script', {}, 'var base_ui_icons = "/base-ui-components/base-ui-icons.svg";']
    ],
    host: 'localhost',
    port: 6060,
    dest: path.join(__dirname, '../../styleguide'),
    configureWebpack: {
      resolve: {
        alias: {
          'styles': path.resolve(__dirname, './styles'),
          '@': path.resolve(__dirname, '../../src'),
        },
      },
    },
    scss: {
      additionalData: `
            @import "@/styles/variables.scss";
        `
    },
    /**
     * Theme configuration, here is the default theme configuration for VuePress.
     *
     * ref：https://v1.vuepress.vuejs.org/theme/default-theme-config.html
     */
    themeConfig: {
      repo: 'https://github.com/base-angewandte/base-ui-components',
      editLinks: false,
      docsDir: '',
      editLinkText: '',
      lastUpdated: true,
      nav: [
        {
          text: 'Components',
          link: '/',
        },
        {
          text: 'Customization Options',
          link: '/customization/'
        },
        {
          text: 'Development',
          link: '/buildSetup.md',
        },
      ],
      sidebar,
    },

    /**
     * Apply plugins，ref：https://v1.vuepress.vuejs.org/zh/plugin/
     */
    plugins: [
      '@vuepress/back-to-top',
      '@vuepress/active-header-links',
      [
        '@vuepress/register-components',
        {
          components,
        }
      ],
      ['live', {
        noSsr: true,
        layout: path.resolve(__dirname, "./live-plugin/layout.vue"),
      }],
    ]
  }
}
