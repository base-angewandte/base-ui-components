// eslint-disable-next-line import/no-extraneous-dependencies
const path = require('path');

module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        '~': path.resolve(__dirname, ''),
      },
    },
    // added because of styleguidist error:
    // DevTools failed to load SourceMap: Could not load content for webpack:///node_modules/es6-promise/dist/es6-promise.map: HTTP error: status code 404, net::ERR_UNKNOWN_URL_SCHEME
    devtool: 'source-map',
  },
  chainWebpack: (config) => {
    // lead webpack to the correct entry point
    config
      .entry('app')
      .clear()
      .add('./src/docs.js');
  },
};
