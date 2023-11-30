'use strict'

const fs = require('fs')

const path = require('path')

const JsonML = require('jsonml.js/lib/utils')

const nunjucks = require('nunjucks')

const postcss = require('postcss')

const pxtoremPlugin = require('postcss-pxtorem')

const transformTsxToJsx = require('./transformTsxtoJsx')

const PROD_RM_DEBUG = false
nunjucks.configure({
  autoescape: true,
})
const tmpl = fs.readFileSync(path.join(__dirname, 'template.html')).toString()

function getCode(node) {
  return JsonML.getChildren(JsonML.getChildren(node)[0])[0]
}

function getCodeIndex(contentChildren) {
  return contentChildren.findIndex(function (node) {
    return JsonML.getTagName(node) === 'pre' && ['jsx', 'tsx'].includes(JsonML.getAttributes(node).lang)
  })
} // function getCssCodeIndex(contentChildren) {
//   return contentChildren.findIndex(function (node) {
//     return JsonML.getTagName(node) === 'pre' && ['css'].includes(JsonML.getAttributes(node).lang)
//   })
// }

function getSourceCodeObject(contentChildren, codeIndex) {
  if (codeIndex > -1) {
    const code = getCode(contentChildren[codeIndex])
    const jsCode = transformTsxToJsx(code)
    return {
      isES6: true,
      code,
      jsCode,
      lang: JsonML.getAttributes(contentChildren[codeIndex]).lang,
    }
  }
  return {
    isTS: true,
  }
}

function isStyleTag(node) {
  return node && JsonML.getTagName(node) === 'style'
}

function getStyleNode(contentChildren) {
  return contentChildren.filter(function (node) {
    return isStyleTag(node) || (JsonML.getTagName(node) === 'pre' && JsonML.getAttributes(node).lang === 'css')
  })[0]
}

module.exports = function (_ref) {
  const markdownData = _ref.markdownData
  const noPreview = _ref.noPreview
  const babelConfig = _ref.babelConfig
  const pxtorem = _ref.pxtorem
  const injectProvider = _ref.injectProvider
  const meta = markdownData.meta
  meta.id = meta.filename.replace(/\.md$/, '').replace(/\//g, '-') // Should throw debugging demo while publish.

  if (meta.debug && PROD_RM_DEBUG) {
    return {
      meta: {},
    }
  } // Update content of demo.

  const contentChildren = JsonML.getChildren(markdownData.content)
  const codeIndex = getCodeIndex(contentChildren) // const cssCodeIndex = getCssCodeIndex(contentChildren)

  const introEnd = codeIndex === -1 ? contentChildren.length : codeIndex
  markdownData.content = contentChildren.slice(0, introEnd)
  const sourceCodeObject = getSourceCodeObject(contentChildren, codeIndex)
  markdownData.code = sourceCodeObject.code
  markdownData.jsCode = sourceCodeObject.jsCode
  markdownData.lang = sourceCodeObject.lang
  const styleNode = getStyleNode(contentChildren)

  if (isStyleTag(styleNode)) {
    markdownData.style = JsonML.getChildren(styleNode)[0]
  } else if (styleNode) {
    const styleTag = contentChildren.filter(isStyleTag)[0]
    let originalStyle = getCode(styleNode) + (styleTag ? JsonML.getChildren(styleTag)[0] : '')

    if (pxtorem) {
      originalStyle = postcss(
        pxtoremPlugin({
          rootValue: 50,
          propList: ['*'],
        }),
      ).process(originalStyle).css
    }

    markdownData.style = originalStyle
    markdownData.highlightedStyle = JsonML.getAttributes(styleNode).highlighted
  }

  if (meta.iframe) {
    const html = nunjucks.renderString(tmpl, {
      id: meta.id,
      style: markdownData.style,
      // script: markdownData.code,
      reactRouter:
        meta.reactRouter === 'react-router'
          ? 'react-router@3.2.1/umd/ReactRouter'
          : meta.reactRouter === 'react-router-dom'
          ? 'react-router-dom@4/umd/react-router-dom'
          : false,
      injectProvider: !!injectProvider,
    })
    const fileName = 'demo-'.concat(Math.random(), '.html')
    const root = process.env.NODE_ENV !== 'development' ? '/react/' : '/'
    fs.writeFile(path.join(process.cwd(), '_site', fileName), html, function () {})
    markdownData.src = path.join(root, fileName)
  }

  return markdownData
}
