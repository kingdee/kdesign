const path = require('path')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const FilterWarningsPlugin = require('webpack-filter-warnings-plugin')
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin')
const WebpackBar = require('webpackbar')
const CleanUpStatsPlugin = require('./plugins/CleanUpStatsPlugin')

const pkg = require('../package.json')
const bannerText = `
  ${pkg.name} v${pkg.version}

  Copyright 2020-present, Kingdee, Inc.
  All rights reserved.
`
module.exports = {
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, '../dist/'),
    filename: '[name].js',
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', 'json'],
  },
  externals: {
    react: {
      root: 'React',
      commonjs2: 'react',
      commonjs: 'react',
      amd: 'react',
    },
    'react-dom': {
      root: 'ReactDOM',
      commonjs2: 'react-dom',
      commonjs: 'react-dom',
      amd: 'react-dom',
    },
  },
  module: {
    rules: [
      {
        test: /\.(j|t)sx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\/node_modules\/.*\.js$/,
        exclude: /node_modules\/(?!color)/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env'],
        },
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                javascriptEnabled: true,
              },
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          minetype: 'image/svg+xml',
        },
      },
      {
        test: /\.(woff2?|eot|ttf|otf|svg)(\?.*)?$/,
        use: 'url-loader',
      },
      {
        test: /\.(png|jpg|jpeg|gif)(\?v=\d+\.\d+\.\d+)?$/i,
        loader: 'url-loader',
        options: { limit: 10000 },
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
    new CleanUpStatsPlugin(),
    new webpack.BannerPlugin(bannerText),
    new WebpackBar({
      name: 'kdesign build',
      color: '#276ff5',
    }),
    new CaseSensitivePathsPlugin(), // .Using this plugin helps alleviate cases where developers working on OSX
    new FilterWarningsPlugin({
      // suppress conflicting order warnings from mini-css-extract-plugin.
      // see https://github.com/webpack-contrib/mini-css-extract-plugin/issues/250
      exclude: /mini-css-extract-plugin[^]*Conflicting order between:/,
    }),
  ],
}
