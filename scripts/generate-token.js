const fs = require('fs')
const path = require('path')

const transformComponentArr = [
  'anchor',
  'avatar',
  'badge',
  'base-data',
  'button',
  'card',
  'carousel',
  'cascader',
  'checkbox',
  'city-picker',
  'collapse',
  'color-picker',
  'date-picker',
  'drawer',
  'dropdown',
  'empty',
  'filter',
  'form',
  'image',
  'input',
  'input-number',
  'layout',
  'link',
  'menu',
  'message',
  'modal',
  'pagination',
  'progress',
  'radio',
  'rate',
  'search',
  'select',
  'slider',
  'spin',
  'split-panel',
  'stepper',
  'steps',
  'switch',
  'tabs',
  'tag',
  'timeline',
  'tooltip',
  'transfer',
  'tree',
  'typography',
  'upload',
  'tree-select',
]
const tokenBrandPrefix = 'kd'
const tokenGloablPrefix = `--${tokenBrandPrefix}-g`
const globalTokenPath = path.resolve('./components/style/themes/token.less')
const globalLessPath = path.resolve('./components/style/themes/default.less')

console.log('starting......')

// 将全局default.less文件 全局变量转化为对象
function tranLessToObj(filePath) {
  console.log('读取全局default.less文件------开始')
  let gLessString = fs.readFileSync(filePath, 'utf-8')
  // TODO 去除注释 简易版本
  gLessString = gLessString.replace(/\/\*\s*[^/*]*\*\/|\/\/.*/g, '')
  const gLessdata = gLessString.match(/@[\w-]+:[^;]+/g)
  const obj = {}
  // 去除组件相关的token @btn-primary-xxx
  gLessdata.splice(0, 100).map((v) => {
    const [, gLessKey, gLessValue] = /(@[\w-]+):\s?([^;]+)/g.exec(v)
    obj[gLessKey] = gLessValue
  })
  // 将less引用项赋值
  Object.keys(obj).forEach((key) => {
    const value = obj[key]
    if (value.indexOf('@') > -1) {
      obj[key] = obj[value]
    }
  })
  console.log('读取全局default.less文件------结束')
  return obj
}

function tranTokenToObj(filePath) {
  const gLessObj = tranLessToObj(globalLessPath)

  console.log('读取全局token.less文件------开始')
  const gTokenString = fs.readFileSync(filePath, 'utf-8')
  const gTokenArr = gTokenString.match(/@[\w-]+:\s?(var\(~'@{[\w-]+}[\w-]+',\s?@[\w-]+\)|@[\w-]+)/g)

  // 转化为obj
  const obj = {}
  gTokenArr.map((v) => {
    const data = /(@[\w-]+):\s?var\(~'@{[\w-]+}-([\w-]+)',\s?(@[\w-]+)\)/g.exec(v)
    let newK, gToken, oldK, tmpLess

    // 区分 @xxx: @xxx;
    if (data) {
      ;[, newK, gToken, oldK] = data
      obj[newK] = {
        gToken: `${tokenGloablPrefix}-${gToken}`,
        gValue: gLessObj[oldK],
      }
    } else {
      const lessData = /(@[\w-]+):\s?(@[\w-]+)/g.exec(v)
      ;[, newK, tmpLess] = lessData
      obj[newK] = tmpLess
    }
  })

  Object.keys(obj).forEach((key) => {
    const value = obj[key]
    if (typeof value === 'string') {
      obj[key] = obj[value]
    }
  })

  console.log('读取全局token.less文件------结束')
  return obj
}

const G_TOKEN_OBJ = tranTokenToObj(globalTokenPath)

function tranComponentTokenToObj(name) {
  const tokenPath = path.resolve(`./components/${name}/style/token.less`)
  console.log(`读取${name}/style/token.less文件------开始`)
  const tokenString = fs.readFileSync(tokenPath, 'utf-8')
  const tokenArr = tokenString.match(/\/\/[\s\w-]+\n+(@[\w-]+:.*\n*)*/g)
  const obj = {}
  tokenArr.forEach((v) => {
    const [, category] = /^\/\/\s*([\w-]+)\n/g.exec(v)
    const tokenCateDataArr = v.match(/(@[\w-]+):[^;]+/g)
    if (!tokenCateDataArr) return null
    obj[category] = tokenCateDataArr.map((token) => {
      const [, cLess, cToken, , cValue] = /(@[\w-]+):\s*var\(~'@{[\w-]+}-([\w-]+)'(,\s*(@[\w-]+|[^@]+))?\)/g.exec(token)
      const componentTokenName = `--${tokenBrandPrefix}-c-${name}-${cToken}`
      if (cValue && cValue.indexOf('@') > -1) {
        return {
          cLess,
          cToken: componentTokenName,
          gToken: G_TOKEN_OBJ[cValue].gToken,
          cValue: G_TOKEN_OBJ[cValue].gValue,
        }
      } else {
        return {
          cLess,
          cToken: componentTokenName,
          gToken: '-',
          cValue: cValue || '-',
        }
      }
    })
  })
  console.log(`读取${name}/style/token.less文件------结束`)
  return obj
}

function insertTokenToMd(tokenObj, name) {
  const apiPath = path.resolve(`./components/${name}/index.md`)
  console.log(`插入${name}/index.md文件------读取文件开始`)
  const apiString = fs.readFileSync(apiPath, 'utf-8')
  console.log(`插入${name}/index.md文件------读取文件结束`)
  const searchArr = /\n*## Design Token/g.exec(apiString)
  const insertIndex = searchArr ? searchArr.index : apiString.length

  console.log(`插入${name}/index.md文件------组装token api开始`)
  let tokenStr = `## Design Token\n\n| 分类 | 组件token | 全局token | 默认值 |\n| --- | --- | --- | --- |\n`
  Object.keys(tokenObj)
    .sort()
    .forEach((v) => {
      tokenObj[v].forEach((t, i) => {
        tokenStr += `| ${i === 0 ? v : ''} | ${t.cToken} | ${t.gToken} | ${t.cValue} |\n`
      })
    })
  console.log(`插入${name}/index.md文件------组装token api结束`)

  const newApiString = apiString.substring(0, insertIndex) + '\n\n' + tokenStr
  fs.writeFileSync(apiPath, newApiString, 'utf-8')
}

// 将组件/button/style/token.less 文件中的token插入到 /button/index.md 文件尾部
transformComponentArr.map((name) => {
  insertTokenToMd(tranComponentTokenToObj(name), name)
})
