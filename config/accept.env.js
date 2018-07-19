'use strict'
const merge = require('webpack-merge')
const devEnv = require('./dev.env')

module.exports = merge(devEnv, {
  NODE_ENV: '"accept"',
  API: '""',
  URL: {
    crossroad: '"https://crossroad-test.blue.pl"',
  }
})
