const webpack = require('webpack')
const { merge } = require('webpack-merge')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

const baseConfig = require('./webpack.base')
const pkgName = 'kdesign'
const entry = ['./index.js']

baseConfig.output.library = 'kdesign'
baseConfig.output.libraryTarget = 'umd'
const uncompressedConfig = merge(baseConfig, {
  mode: 'development',
  entry: {
    [`${pkgName}`]: entry
  },
})

const webpackUmdConfig = merge(baseConfig, {
  mode: 'production',
  entry: {
    [`${pkgName}.min`]: entry
  },
  plugins: [
    new webpack.optimize.ModuleConcatenationPlugin(),  
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      openAnalyzer: false,
      reportFilename: '../report.html',
    }),
  ],
  optimization: {
    minimizer: [
      new OptimizeCSSAssetsPlugin({}),
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true,
        uglifyOptions: {
          warnings: false,
        },
      }),
    ],
  }
})

module.exports = [
  uncompressedConfig,
  webpackUmdConfig
]
