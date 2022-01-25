const { readFileSync, writeFileSync, readdirSync } = require('fs')
const path = require('path')

const changelogPath = path.resolve('./CHANGELOG.md')
let data = readFileSync(changelogPath, 'utf-8')
const versionData = data.match(
  /(#{1,2}\s\[?\d.*\n*(?:###\sBug\sFixes\n+(?:\*\s.*\n)*)?\n*(?:###\sFeatures\n+(?:\*\s.*\n)*)?\n*)/g,
)

const req = readdirSync('./components')
const componentMap = req.filter((v) => !/locale|overview|style|_utils|index\.tsx/g.test(v))
const filterData = versionData.map((version) => {
  const versionInfo = /#{1,2}\s\[?(\d{1,2}\.\d{1,2}\.\d{1,2}[^\]]*)\]?\s*\((.*)\)\s*\(?(20[\d-]*)\)?/g.exec(version)
  const versionHeaderStr = `## [${versionInfo[1]}](${versionInfo[2]})\n\`${versionInfo[3]}\`\n`
  const componentContent = {}
  const notComponentContent = []
  const versionContent = version.match(/(\*\s+.*)\n/g)
  if (!versionContent) {
    return '\n'
  } else {
    versionContent
      .filter((c) => c)
      .map((v) => {
        // 去除gitlab提交链接
        // eslint-disable-next-line
        v = v.replace(/\s\(\[\w+\]\([^\[\]\(\)]+\)\)/, '')
        let isComponnet = false
        // 去除显示加粗效果
        // eslint-disable-next-line
        v = v.replace(/\s\*{2}.*\*{2}/, '')
        componentMap.map((mapName) => {
          const regrex = new RegExp(mapName, 'gi')
          if (regrex.test(v)) {
            isComponnet = true
            const componnetName = mapName
            // 去除 组件的相同描述
            const oRegrex = new RegExp('\\*\\s' + mapName + '\\s?', 'gi')
            // eslint-disable-next-line
            const othersV = v.replace(oRegrex, '* ').replace(/\s\[[^\[\]]*\]\s?/, ' ')
            if (componentContent[componnetName]) {
              if (componentContent[componnetName].indexOf(othersV) < 0) {
                componentContent[componnetName].push(othersV)
              }
            } else {
              componentContent[componnetName] = []
              componentContent[componnetName].push(othersV)
            }
          }
        })
        if (!isComponnet) {
          // eslint-disable-next-line
          const filterV = v.replace(/\s\[[^\[\]]*\]\s?/, ' ')
          if (notComponentContent.indexOf(filterV) < 0) {
            notComponentContent.push(filterV)
          }
        }
      })
  }

  // console.log(componentContent);
  const names = Object.keys(componentContent)
  const componentString = names
    .map((name) => {
      const list = componentContent[name].join('  ')
      return `* ${name}\n  ${list}`
    })
    .join('')

  const notComponnetString = notComponentContent.join('')

  return versionHeaderStr + componentString + notComponnetString
})
data = filterData.join('\n')
const customHeader = `---
order: 8
title: 更新日志
hiddenAnchor: true
---

`
data = customHeader + data
writeFileSync(path.resolve('./docs/guide/changelog.md'), data)
