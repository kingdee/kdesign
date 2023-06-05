const path = require('path')
// 严格区分commonJS文件和ES6文件
// https://babel.docschina.org/docs/en/options#sourcetype
// https://github.com/webpack/webpack/issues/4039#issuecomment-419284940
function editBabelConfig(rules) {
  rules.forEach((rule) => {
    if (rule.loader && rule.loader.includes('babel-loader')) {
      rule.options = {
        ...rule.options,
        sourceType: 'unambiguous',
      }
      if (rule.exclude) {
        rule.exclude = /node_modules\/(?!(regexpu-core)\/).*/
      }
    } else if (rule.use) {
      editBabelConfig(rule.use)
    }
  })
  return rules
}

module.exports = {
  devServerConfig: {
    disableHostCheck: true,
  },
  source: {
    // 读取markdown文件的目录
    components: './components',
    docs: './docs',
  },
  themeConfig: {
    // 这里为空也要配个空对象，不然报错
  },
  output: './_site',
  hash: true,
  theme: './site/src',
  htmlTemplate: './site/src/static/template.html',
  port: 8003,
  webpackConfig(config) {
    config.resolve.alias = {
      kdesign: path.join(process.cwd(), 'index.js'),
      '@src': path.join(process.cwd(), 'site/src'),
    }
    if (process.env.NODE_ENV !== 'development') {
      config.optimization.splitChunks = {
        ...config.optimization.splitChunks,
        chunks: 'all',
        minSize: 30000,
        maxSize: 0,
        minChunks: 1,
        maxAsyncRequests: 5,
        maxInitialRequests: 3,
        automaticNameDelimiter: '-',
        name: true,
        cacheGroups: {
          standalone: {
            name: 'chunk-standalone',
            chunks: 'async',
            test: /[\\/]node_modules[\\/]@babel[\\/]standalone[\\/]/,
            priority: 1,
          },
          vendors: {
            test: /[\\/]node_modules[\\/]/,
            priority: -10,
          },
          default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true,
          },
        },
      }
    }
    config.module.rules = [
      ...editBabelConfig(config.module.rules),
      {
        include: /node_modules/,
        test: /\.mjs$/,
        type: 'javascript/auto',
      },
    ]
    config.devtool = process.env.NODE_ENV !== 'development' ? 'none' : 'cheap-module-eval-source-map'
    return config
  },
}
