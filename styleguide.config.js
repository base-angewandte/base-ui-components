/* eslint-disable */
const path = require('path');
module.exports = {
  // set your styleguidist configuration here
  title: 'Base Components',
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
  ],
}
