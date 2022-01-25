/* eslint-disable */
const chalk = require('chalk')
const fs = require('fs')
const path = require('path')
const camelCase = require('lodash/camelCase')
const upperFirst = require('lodash/upperFirst')
const { JsxEmit } = require('typescript')
function createComponent() {
  const args = process.argv
  const componentName = args[2]

  if (componentName === undefined) {
    console.log(chalk.red('Component name is required'))
    process.exit(1)
  }

  if (/[A-Z]+/.test(componentName)) {
    console.log(chalk.red(`Component name cannot has uppercase letter, please named like 'button' or 'input-number' `))
    process.exit(2)
  }

  const componentDir = `${path.resolve(__dirname, '../components')}/${componentName}`
  const componentObject = upperFirst(camelCase(componentName))

  if (fs.existsSync(componentDir)) {
    console.log(chalk.red(`${componentDir} already exists, please choose another name.`))
    process.exit(3)
  }

  fs.mkdirSync(componentDir)
  fs.writeFileSync(
    `${componentDir}/index.tsx`,
    `import ${componentObject} from './${componentName}'
export * from './${componentName}'
export default ${componentObject}
`,
  )
  fs.writeFileSync(
    `${componentDir}/${componentName}.tsx`,
    `import React, { FunctionComponentElement } from 'react'

// remove this line and code ${componentObject} component here
const ${componentObject} = (props: { name?: string; children?: any }): FunctionComponentElement<any> => {
  return <div>${componentObject}, name is {props.name}</div>
}

${componentObject}.displayName = '${componentObject}'
export default ${componentObject}
`,
  )
  fs.writeFileSync(
    `${componentDir}/index.md`,
    `---
category: Components
type: 基础
title: ${componentObject}
---
## 使用场景

## API

| 属性 | 说明 | 类型 | 默认值 | 可选值 | 版本 |
| --- | --- | --- | --- | --- | --- |
`,
  )

  fs.mkdirSync(`${componentDir}/style`)
  fs.writeFileSync(
    `${componentDir}/style/index.tsx`,
    `import '../../style/index.less'
import './index.less'
`,
  )
  fs.writeFileSync(
    `${componentDir}/style/index.less`,
    `
@import '../../style/themes/index';
@import './mixin.less';
`,
  )
  fs.writeFileSync(
    `${componentDir}/style/mixin.less`,
    `
// code component mixin here
.test() {
  display: inline;
}
`,
  )

  fs.mkdirSync(`${componentDir}/__tests__`)
  fs.writeFileSync(
    `${componentDir}/__tests__/index.test.tsx`,
    `import React from 'react'
import { mount } from 'enzyme'
import ${componentObject} from '../index'

describe('${componentObject}', () => {
  it('should have displayName static property', () => {
    const wrapper = mount(<${componentObject}>Text</${componentObject}>)
    expect((wrapper.type() as any).displayName).toBe('${componentObject}')
  })
})
`,
  )

  fs.mkdirSync(`${componentDir}/demo`)
  fs.writeFileSync(
    `${componentDir}/demo/basic.md`,
    `---
title: 基本使用
order: 0
---
\`\`\`jsx
<${componentObject} name="${componentObject}" />
\`\`\`
`,
  )

  fs.appendFileSync(
    `${path.resolve(__dirname, '../components')}/index.tsx`,
    `
export { default as ${componentObject} } from './${componentName}'

`,
  )
}

createComponent()
