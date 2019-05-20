const path = require('path')
const fs = require('fs')
const filePath = path.resolve(__dirname, 'src')

const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const package = require("./package.json")
const _ = require('lodash')
// const HtmlWebpackPlugin = require('html-webpack-plugin')
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
// const webpack = require('webpack')
// const ExtractTextPlugin = require('extract-text-webpack-plugin')

const ignores = ['utils', 'components']

const entry = (result = {}) => {
  let folders = fs.readdirSync(filePath)
  folders.forEach(function (name) {
    if (ignores.indexOf(name) < 0) {
      let dir = path.join(filePath, name)
      let stat = fs.statSync(dir)
      if (stat.isDirectory()) result[name] = dir
    }
  })
  return result
}

const env = process.env.NODE_ENV
const enrties = entry()
const filename = ext => chunkData => {
  if (/\./.test(chunkData.chunk.name)) {
    return chunkData.chunk.name.replace(/\./g, '/') + '.bundle.' + ext
  }
  return '[name].bundle.' + ext
}

const cssloader = env === 'development' ? 'style-loader' : MiniCssExtractPlugin.loader
const rootpath = path.resolve(__dirname, 'dist')

module.exports = {
  entry: enrties,
  context: __dirname,
  output: {
    filename: filename('js'),
    path: env === 'production' ? rootpath : path.resolve(__dirname, 'dist'),
    publicPath: '/',
    globalObject: 'this'
  },
  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM',
    'react-redux': 'var ReactRedux',
    'react-thunk': 'var ReactThunk',
    'redux': 'var Redux',
    'antd': 'antd',
    'moment': 'moment'
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: false,
    port: 9000,
    historyApiFallback: {
      disableDotRule: false,
      rewrites: _.map(enrties, (obj, key) => {
        let path = '/' + key.replace(/\./g, '/')
        return {
          from: new RegExp(`^${path}/?$`),
          to: path + '.html'
        }
      })
    }
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      components: path.resolve(__dirname, 'src/components'),
      utils: path.resolve(__dirname, 'src/utils')
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.(sa|sc)ss$/,
        use: [
          cssloader,
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.css$/,
        use: [
          cssloader,
          'css-loader'
        ]
      },
      {
        test: /\.less$/,
        use: [
          cssloader,
          'css-loader',
          'less-loader'
        ]
      },
      {
        test: /\.md$/,
        exclude: /node_modules/,
        use: ['raw-loader']
      }
    ]
  },
  plugins: [
    new CopyWebpackPlugin([
      { from: 'assets/**/*', to: 'assets/[name].[ext]' },
      { from: 'node_modules/pdfjs-dist/cmaps/', to: 'cmaps/' }
    ])
  ]
}