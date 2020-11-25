/* eslint-disable */
const path = require('path');
module.exports = {
  // set your styleguidist configuration here
  title: 'Base UI Components',
  template: {
    head: {
      meta: [
        {
          lang: 'en',
        },
        {
          name: 'description',
          content: 'Styleguide for a base Angewandte component library',
        },
        {
          name: 'apple-mobile-web-app-title',
          content: 'base ui components'
        },
        {
          name: 'application-name',
          content: 'base ui components styleguide'
        },
        {
          name: 'theme-color',
          content: '#ffffff'
        },
      ],
      links: [
        {
          href: '/apple-touch-icon.png',
          rel: 'apple-touch-icon',
          sizes: '180x180'
        },
        {
          href: '/favicon-32x32.png',
          rel: 'icon',
          sizes: '32x32',
          type: 'image/png'
        },
        {
          href: '/favicon-32x32.png',
          rel: 'icon',
          sizes: '16x16',
          type: 'image/png'
        },
        {
          href: '/safari-pinned-tab.svg',
          rel: 'mask-icon',
          size: '180x180',
        }
      ],
    },
  },
  defaultExample: false,
  theme: {
    fontFamily: {
      base: 'Source Sans Pro, sans-serif',
    },
    fontSize: {
      base: 17,
      text: 19,
      small: 15,
    },
    mq: {
      small: '@media (max-width: 640px)',
    },
  },
  components: 'src/components/**/Base[A-Z]*.vue',
  // sections: [
  //   {
  //     name: 'First Section',
  //     components: 'src/components/**/[A-Z]*.vue'
  //   }
  // ],
  usageMode: 'expand',
  require: [
    path.join(__dirname, './node_modules/normalize.css/normalize.css'),
    path.join(__dirname, './dev-docs/styles/app.scss'),
  ],
  // these are components used internally however not included in the package
  ignore: [
    'src/components/BaseCheckBox/*',
    'src/components/BaseToolTip/*',
    'src/components/BaseChip/*',
    'src/components/BaseMediaCarousel/BaseMediaCarouselItem.vue',
  ],
}
