/* eslint-disable global-require */

const plugins = [
  // plugin adds vendor prefixes, using data from Can I Use.
  require('autoprefixer')(),
  require('postcss-csso')(),
  require('postcss-url')({
    url: 'inline',
  }),
];

module.exports = () => ({
  plugins,
});
