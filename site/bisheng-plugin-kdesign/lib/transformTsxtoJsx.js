const { transformSync } = require('@babel/core')
const babel_decorator_plugin_1 = require('./babel-decorator-plugin')
const path = require('path')
const fs = require('fs')
const prettier_1 = require('prettier')

function transformTsxToJsx(text) {
  const option = {}
  const fileList = [
    {
      sourceFilePath: option.filename,
      data: text,
    },
  ]
  const jsFiles = fileList.map((entity) => {
    const { code } = transformSync(entity.data, {
      configFile: false,
      plugins: [
        [
          babel_decorator_plugin_1.default,
          {
            decoratorsBeforeExport: !!option.decoratorsBeforeExport,
          },
        ],
        [require.resolve('@babel/plugin-syntax-dynamic-import')],
        [
          require.resolve('@babel/plugin-transform-typescript'),
          {
            isTSX: true,
          },
        ],
      ],
    })
    return {
      ...entity,
      data: code,
    }
  })

  const str = fs.readFileSync(path.resolve(__dirname, '../../../.prettierrc'), 'utf-8')
  const prettierOption = JSON.parse(str)
  prettierOption.parser = 'babel'
  prettierOption.printWidth = 200
  prettierOption.bracketSameLine = true
  prettierOption.trailingComma = 'none'
  const prettierFiles = jsFiles.map((entity) => {
    let { data } = entity
    try {
      data = prettier_1.format(data, prettierOption)
    } catch (e) {
      console.log(e)
    }
    return { ...entity, data }
  })

  // eslint-disable-next-line
  return prettierFiles[0].data
}

module.exports = transformTsxToJsx
