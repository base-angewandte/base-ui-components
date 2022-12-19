module.exports = {
  plugins: {
    autoprefixer: {},
    // needed for import of external css (e.g. leaflet)
    // needs to be before postcss-url to have leaflet background-images included
    'postcss-import': {},
    // TODO: still needed?
    // needed to inline svg-files - e.g. BaseSearch magnifier
    'postcss-url': { url: 'inline' },
    // remove comments
    'postcss-discard-comments': { removeAll: true },
  },
};
