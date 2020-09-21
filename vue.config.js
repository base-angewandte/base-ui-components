// eslint-disable-next-line import/no-extraneous-dependencies
const path = require('path');

module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        '~': path.resolve(__dirname, ''),
      },
    },
  },
  css: {
    loaderOptions: {
      sass: {
        // eslint-disable-next-line global-require
        implementation: require('sass'),
      },
    },
  },
  chainWebpack: (config) => {
    // lead webpack to the correct entry point
    config
      .entry('app')
      .clear()
      .add('./dev-docs/docs.js');

    // added due to source maps error: (DevTools failed to load SourceMap:...)
    config.module
      .rule('source-map')
      .test(/\.js$/)
      .enforce('pre')
      .use('source-map-loader')
      .loader('source-map-loader')
      .end();
  },
};
