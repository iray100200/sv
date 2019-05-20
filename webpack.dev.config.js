const merge = require('webpack-merge')
const common = require('./webpack.config')
const _ = require('lodash')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = merge(common, {
  devtool: 'inline-source-map',
  plugins: [
    ..._.map(common.entry, (obj, key) => {
      return new HtmlWebpackPlugin({
        filename: key.replace(/\./g, '/') + '.html',
        template: 'index.html',
        chunks: [key],
        inject: true
      })
    })
  ]
})