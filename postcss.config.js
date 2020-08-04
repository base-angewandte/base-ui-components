const plugins = [
  require('autoprefixer')()
];

if (process.env.NODE_ENV === 'production') {
  plugins.push(require('postcss-csso')());
}

module.exports = () => ({
  plugins
});
