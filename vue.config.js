const path = require('path');

module.exports = {
  pages: {
    index: './src/main.js',
    'base-ui-components': 'src/lib.js',
  },
  pluginOptions: {
    // importing variables to all components
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: [path.resolve(__dirname, './src/styles/variables.scss')],
    },
  },
  chainWebpack: (config) => {
    // add vue-svg-loader
    const svgRule = config.module.rule('svg');
    svgRule.uses.clear();

    svgRule
      .oneOf('inline')
      .resourceQuery(/inline/)
      .use('vue-svg-loader')
      .loader('vue-svg-loader')
      .end()
      .end()
      .oneOf('external')
      .use('file-loader')
      .loader('file-loader')
      .options({
        name: 'assets/[name].[hash:8].[ext]',
      });
  },
};
