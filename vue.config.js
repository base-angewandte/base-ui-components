const path = require('path');

module.exports = {
  pluginOptions: {
    // importing variables to all components
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: [path.resolve(__dirname, './src/styles/variables.scss'),
        path.resolve(__dirname, './src/styles/lib.scss')],
    },
  },
  chainWebpack: (config) => {
    config
      .entry('app')
      .clear()
      .add('./demo/main.js');

    config.module
      .rule('vue')
      .use('global-vue-loader')
      .loader(path.resolve(__dirname, 'build-utils/global-vue-loader'))
      .before('vue-loader');

    // TODO: not sure if need these two
    config.module
      .rule('meta')
      .resourceQuery(/blockType=meta/)
      .use('null-loader')
      .loader('null-loader');

    config.module
      .rule('example')
      .resourceQuery(/blockType=example/)
      .use('null-loader')
      .loader('null-loader');

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
  css: {
    // Optionally set this to true if you want CSS
    // to be extracted into separate CSS files.
    extract: false,
  },
};
