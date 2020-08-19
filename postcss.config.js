/* eslint-disable global-require */

const plugins = [
  // plugin adds vendor prefixes, using data from Can I Use.
  require('autoprefixer')(),
];

if (process.env.NODE_ENV === 'production') {
  // needed for import of external css (e.g. leaflet)
  // needs to be before postcss-url to have leaflet background-images included
  plugins.push(require('postcss-import')());
  // needed for inlining svgs - e.g. BaseSearch magnifier
  plugins.push(require('postcss-url')({
    url: 'inline',
  }));
}

module.exports = () => ({
  plugins,
});
