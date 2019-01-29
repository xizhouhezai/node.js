const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: {
    bundle: path.resolve(__dirname, '../index.js')
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].[hash].js'
  },
  module: {},
  plugin: [
    new HTMLWebpackPlugin({
      template: path.resolve(__dirname, '../index.html')
    })
  ]
}