var path = require('path')
var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var utils = require('./utils')
var config = require('../config/index.conf')
var defines = require('../config/define.conf')
var publicConf = require('../config/public.conf')
var entrys = config.entrys
var isProduction = process.env.NODE_ENV == 'production'

// extract css
var extractCss = isProduction ?
  new ExtractTextPlugin('css/[name].css') :
  new ExtractTextPlugin('css/[name].[chunkhash].css')

var styleLoaders = utils.getStyleLoaders({
  extract: true,
  extractPlugin: extractCss
})

// resolve dir
function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  context: path.resolve(__dirname, '../'),

  entry: entrys,

  output: {
    path: config.distPath,
    filename: 'js/[name].js',
    publicPath: publicConf.publicPath,
  },

  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      //
    }
  },

  module: {
    rules: [
      {
        test: /\.html$/,
        use: [{
          loader: 'html-loader',
          options: {
            attrs: ['img:src'],
            minimize: true,
            removeComments: false,
            collapseWhitespace: false,
            interpolate: 'require',
          }
        }]
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: styleLoaders
        }
      },
      {
        test: /\.less$/,
        use: styleLoaders.less
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'imgs/[path].[name].[hash].[ext]'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'fonts/[path].[name].[hash].[ext]'
        }
      }
    ]
  },

  plugins: [
    new webpack.DefinePlugin(defines),
    extractCss
  ].concat(config.htmlPlugins)
  .concat(config.commonPlugins)
}
