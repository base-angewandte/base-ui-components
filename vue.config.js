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

    // safari ignores the disable cache property for injected js files, so we add a hash
    // for js files
    if (process.env.NODE_ENV === 'development') {
      config
        .output
        .filename('[name].[hash].js')
        .end();
    }
  },
};
