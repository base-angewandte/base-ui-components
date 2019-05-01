const path = require('path');

module.exports = {
  // set your styleguidist configuration here
  title: 'Base Components',
  defaultExample: false,
  components: 'src/components/**/Base[A-Z]*.vue',
  // components: 'src/components/**/[A-Z]*.vue',
  // sections: [
  //   {
  //     name: 'First Section',
  //     components: 'src/components/**/[A-Z]*.vue'
  //   }
  // ],
  // webpackConfig: {
  //   // custom config goes here
  // }
  usageMode: 'expand',
  require: [
    path.join(__dirname, './src/styles/variables.scss'),
    path.join(__dirname, './src/styles/styleguide.scss'),
  ],
};
