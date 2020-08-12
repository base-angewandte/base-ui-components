/* eslint-disable global-require */

const plugins = [
  // plugin adds vendor prefixes, using data from Can I Use.
  require('autoprefixer')(),
  require('postcss-csso')(),
  // needed for inlining svgs - e.g. BaseSearch magnifier
  require('postcss-url')({
    url: 'inline',
  }),
  // needed for import of external css (e.g. leaflet)
  require('postcss-import')(),
];

module.exports = () => ({
  plugins,
});
