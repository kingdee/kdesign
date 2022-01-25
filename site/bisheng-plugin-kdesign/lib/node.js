'use strict'

const path = require('path')

const processDoc = require('./process-doc')

const processDemo = require('./process-demo')

module.exports = function (markdownData, _ref) {
  const noPreview = _ref.noPreview
  const babelConfig = _ref.babelConfig
  const pxtorem = _ref.pxtorem
  const injectProvider = _ref.injectProvider
  const isDemo = /\/demo$/i.test(path.dirname(markdownData.meta.filename))

  if (isDemo) {
    return processDemo({
      markdownData: markdownData,
      noPreview: noPreview,
      babelConfig: babelConfig && JSON.parse(babelConfig),
      pxtorem: pxtorem,
      injectProvider: injectProvider,
    })
  }

  return processDoc(markdownData)
}
