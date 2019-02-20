const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  DEV_HOST: 'fe.basedev.uni-ak.ac.at',
  DEV_PORT: '8082',
  DEV_HTTPS: true,
})
