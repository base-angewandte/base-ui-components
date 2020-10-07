const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  DEV_HOST: 'localhost',
  DEV_PORT: '8081',
  DEV_HTTPS: false,
})
