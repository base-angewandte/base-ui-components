var utils = require('./utils')
var webpack = require('webpack')
var config = require('../config')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')
const path = require('path')

module.exports = merge(baseWebpackConfig, {
  mode: "development",
  devServer: {
    clientLogLevel: 'warning',
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: config.dev.env.DEV_PORT,
    host: config.dev.env.DEV_HOST,
    https: config.dev.env.DEV_HTTPS,
    hot: true,
    publicPath: config.dev.assetsPublicPath,
    quiet: true, // necessary for FriendlyErrorsPlugin
  },
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: '#cheap-module-eval-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': config.dev.env
    }),
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index-template.html',
      inject: true
    }),
    new FriendlyErrorsPlugin(),
    new VueLoaderPlugin()
  ]
})
