const babel = require('@babel/core')
const regex = /\.js$/
class TransformDefaultParamsPlugin {
  apply(compiler) {
    compiler.hooks.emit.tapAsync('TransformDefaultParamsPlugin', (compilation, callback) => {
      Object.keys(compilation.assets).forEach((filename) => {
        if (regex.test(filename)) {
          const output = compilation.assets[filename].source()
          const transformedCode = babel.transform(output, {
            configFile: false,
            presets: ['@babel/preset-env'],
          }).code

          compilation.assets[filename] = {
            source: () => transformedCode,
            size: () => Buffer.byteLength(transformedCode, 'utf8'),
          }
        }
      })
      callback()
    })
  }
}

module.exports = TransformDefaultParamsPlugin
