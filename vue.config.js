const path = require('path');

function addStyleResource(rule) {
  rule.use('resolve-url-loader')
    .loader('resolve-url-loader')
    .options({
      keepQuery: true,
    })
    .before('sass-loader');
}

module.exports = {
  pages: {
    index: './src/main.js',
    'base-ui-components': 'src/lib.js',
  },
  css: {
    sourceMap: true,
    loaderOptions: {
      sass: {
        // sourceMap needs to be true in order for resolve-url-loader to work!
        sourceMap: true,
        soureMapContents: false,
      },
    },
  },
  pluginOptions: {
    // importing variables to all components
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: [path.resolve(__dirname, './src/styles/variables.scss')],
    },
  },
  chainWebpack: (config) => {
    // this is done so local fonts are found
    const types = ['vue-modules', 'vue', 'normal-modules', 'normal'];
    types.forEach(type => addStyleResource(config.module.rule('scss')
      .oneOf(type)));
  },
};
