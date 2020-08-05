const plugins = [
  // plugin adds vendor prefixes, using data from Can I Use.
  // eslint-disable-next-line global-require
  require('autoprefixer')(),
];

if (process.env.NODE_ENV === 'production') {
  // plugin to minify CSS
  // eslint-disable-next-line global-require
  plugins.push(require('postcss-csso')());
}

module.exports = () => ({
  plugins,
});
