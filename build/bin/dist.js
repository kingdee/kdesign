const path = require('path')
const webpack = require('webpack')
const webpackConfig = require('../webpack.prod')
const { finalizeDist } = require('../../scripts/generate-theme')
const rimraf = require('rimraf')

function dist () {
  rimraf.sync(path.join(__dirname, './dist'))
  webpack(webpackConfig, (err, stats) => {
    if (err) {
      console.error(err.stack || err)
      if (err.details) {
        console.error(err.details)
      }
      return
    }

    const info = stats.toJson()

    if (stats.hasErrors()) {
      console.error(info.errors)
    }

    if (stats.hasWarnings()) {
      console.warn(info.warnings)
    }

    const buildInfo = stats.toString({
      colors: true,
      children: true,
      chunks: false,
      modules: false,
      chunkModules: false,
      hash: false,
      version: false
    })

    console.log(buildInfo);

    finalizeDist()
  })
}

dist()
