module.exports = {
  plugins: {
    autoprefixer: {},
    // needed for import of external css (e.g. leaflet)
    // needs to be before postcss-url to have leaflet background-images included
    postcssImport: {},
    // TODO: still needed?
    // needed to inline svg-files - e.g. BaseSearch magnifier
    postcssUrl: { url: 'inline' },
    // remove comments
    postcssDiscardComments: { removeAll: true },
  },
};
