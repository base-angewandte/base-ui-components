/* eslint-disable global-require */

const plugins = [
  // plugin adds vendor prefixes, using data from Can I Use.
  require('autoprefixer')(),
];

if (process.env.NODE_ENV === 'production') {
  // plugin to minify CSS
  plugins.push(require('postcss-csso')());
  // needed for inlining svgs - e.g. BaseSearch magnifier
  plugins.push(require('postcss-url')({
    url: 'inline',
  }));
  // needed for import of external css (e.g. leaflet)
  plugins.push(require('postcss-import')());
}

module.exports = () => ({
  plugins,
});
