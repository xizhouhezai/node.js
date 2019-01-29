const path = require('path')
const merge = require('webpack-merge')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const baseConfig = require('./webpack.base.conf')

module.exports = merge(baseConfig, {
  mode: 'production',
  devtool: 'source-map',
  plugins: [
    new CleanWebpackPlugin(['dist/'], {
      root: path.resolve(__dirname, '../'),
      verbose: true,
      dry: false
    })
  ]
})
