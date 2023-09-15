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
    `import React, { FunctionComponentElement, useContext } from 'react'
import classNames from 'classnames'
import ConfigContext from '../config-provider/ConfigContext'
import { getCompProps } from '../_utils'

export interface I${componentObject}Props {
  style?: Record<string, unknown> // 内联样式
  className?: string // 样式名
  prefixCls?: string // 样式前缀
  disabled?: boolean // 是否禁用
  children?: React.ReactNode
  props1?: React.CSSProperties
  props2?: React.ReactNode
  props3?: (e: React.MouseEvent) => void
}

const ${componentObject} = (props: I${componentObject}Props): FunctionComponentElement<I${componentObject}Props> => {
  // prefixCls 是默认提供的类名前缀，默认值是'kd';
  // compDefaultProps存放了所有组件全局化配置的默认值，用户可以通过ConfigProvider这个组件区去做修改；
  const { getPrefixCls, prefixCls, compDefaultProps: userDefaultProps } = useContext(ConfigContext)
  // 这里将用户传入的 props 和 ${componentObject} 组件的全局化默认配置 userDefaultProps 做了合并处理，得到最终 ${componentObject} 组件渲染的prop
  const ${componentName}Props = getCompProps('${componentObject}', userDefaultProps, props)
  // 解构获取需要的操作的属性值 customPrefixcls最终组件的默认类名前缀，如果用户不通过ConfigProvider全局化配置传入，则默认为‘kd’，否则为用户传入值
  const { className, prefixCls: customPrefixcls, disabled, ...others } = ${componentName}Props
  // 获取组件的基类样式前缀，此时${componentName}PrefixCls的值为 kd-${componentName} ，后续的${componentObject}组件的样式名都以此开头，使用中划线连接
  const ${componentName}PrefixCls = getPrefixCls!(prefixCls, '${componentName}', customPrefixcls)
  // 混合用户传入的类名 与 组件内部定义的样式名
  const ${componentName}Class = classNames(${componentName}PrefixCls, className)
  return (
    <div className={${componentName}Class} disabled={disabled} {...others}>
      ${componentObject}, my classname prefix is {${componentName}PrefixCls}
    </div>
  )
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
subtitle: 未知组件
---
## 使用场景
这是一个使用场景的描述文字

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
    `@import '../../style/themes/index';
@import './mixin.less';
@${componentName}-prefix-cls: ~'@{kd-prefix}-${componentName}';

.@{${componentName}-prefix-cls} {
  .${componentName};

  padding: @${componentName}-spacing-padding-horizontal;
}
`,
  )
  fs.writeFileSync(
    `${componentDir}/style/mixin.less`,
    `@import './token.less';

.${componentName}() {
  color: @${componentName}-color-text;
  font-size: @${componentName}-font-size;
}
`,
  )
  fs.writeFileSync(
    `${componentDir}/style/token.less`,
    `@import '../../style/themes/token.less';

@${componentName}-custom-prefix: ~'--@{kd-prefix}-c-${componentName}';

// color
@${componentName}-color-text: var(~'@{${componentName}-custom-prefix}-color-text', @color-theme); // color-theme为全局token

// font
@${componentName}-font-size: var(~'@{${componentName}-custom-prefix}-font-size', 30px); // 组件级token

// line-height

// motion

// radius

// shadow

// sizing

// spacing
@${componentName}-spacing-padding-horizontal: var(~'@{${componentName}-custom-prefix}-spacing-padding-horizontal', 10px);

// z-index
`,
  )

  fs.mkdirSync(`${componentDir}/__tests__`)
  fs.writeFileSync(
    `${componentDir}/__tests__/index.test.tsx`,
    `import React from 'react'
import { render, mount } from 'enzyme'
import ConfigProvider from '../../config-provider/index'
import ${componentObject} from '../index'
import mountTest from '../../../tests/shared/mountTest'

describe('${componentObject}', () => {
  // 1. mount test
  describe('1. mount test', () => {
    mountTest(() => <${componentObject} />)
  })

  // 2. render test
  /**
   * 1. 组件快照 可以测试多个不同props下组件生成的快照。当组件更新结构后，生成的快照会不同，这是跑组件的单测会导致报错
   * 2. 运行 yarn test:update 指令可以更新快照
   */
  describe('2. render test', () => {
    it('renders correctly', () => {
      expect(render(<${componentObject} />)).toMatchSnapshot()

      expect(render(<${componentObject} props1={{ width: 100 }} />)).toMatchSnapshot()

      expect(render(<${componentObject} props2={'00268'} />)).toMatchSnapshot()

      expect(
        render(
          <${componentObject}
            props3={(e) => {
              console.log(e)
            }}
          ></${componentObject}>,
        ),
      ).toMatchSnapshot()
    })
  })

  // 3. warns in component
  /**
   * 针对不存在的 api 属性值的验证。看各组件内是否需要类似的代码检测，没有的话可以不用验证
   */
  describe('3. warns in component', () => {
    it('warns if prop1 is wrong', () => {
      const mockWarn = jest.fn()
      jest.spyOn(console, 'warn').mockImplementation(mockWarn)
      const props2 = 'who am I'
      render(<${componentObject} props2={props2} />)
      expect(mockWarn).toHaveBeenCalledTimes(1)
      expect(mockWarn.mock.calls[0][0]).toMatch("Warning: [kdesign]-${componentName}: cannot found ${componentName} props2 'who am I'")
    })
  })

  // 4. render null or undefined without errors
  /**
   * 验证特殊值的渲染是否正确 针对还有子元素${componentObject}.Item的组件也需要对子组件进行验证
   */
  describe('4. render null or undefined without errors', () => {
    it('render null or undefined without errors', () => {
      const wrapper = (
        <${componentObject}>
          {null}
          {undefined}
        </${componentObject}>
      )
      expect(wrapper).toMatchSnapshot()
    })
    // it('render null or undefined without errors', () => {
    //   const wrapper = (
    //     <${componentObject}>
    //       <${componentObject}.Item>
    //         {null}
    //         {undefined}
    //       </${componentObject}.Item>
    //     </${componentObject}>
    //   )
    //   expect(wrapper).toMatchSnapshot()
    // })
  })

  // 5. displayName
  /**
   * 1. 组件的displayName使用驼峰的命名方式
   * 2. 针对父子组件结合的组件，比如dropDown和dropDown.Item都需要测试displayName
   */
  describe('5. displayName', () => {
    it('should have displayName static property', () => {
      expect(${componentObject}.displayName).toBe('${componentObject}')
      // expect(${componentObject}.Item.displayName).toBe('${componentObject}Item')
    })
  })

  // 6. class state
  /**
   * 需测试className style能否正确挂载 disabeld状态下是否还能触发事件 data-test能传递下去
   */
  describe('6. class state', () => {
    it('className style disabled', () => {
      const handleClick = jest.fn()
      const wrapper = mount(
        // @ts-ignore
        <${componentObject} className="my-class" style={{ width: 60 }} disabled onClick={handleClick} data-test="test">
          hello world
        </${componentObject}>,
      )
      // className
      expect(wrapper).toHaveClassName('my-class')
      // style
      expect(wrapper.prop('width')).toEqual('60px')
      // disabled
      expect(wrapper.find('.${componentName}-disabed')).toExist()
      const triggerDom = wrapper.find('.${componentName}-click-dom')
      // 禁用状态下点击事件不应该被触发
      triggerDom.simulate('click')
      expect(handleClick).not.toHaveBeenCalled()
      // 其余不同的属性(...others)能传递下去
      expect(wrapper.prop('data-test')).toEqual('test')
    })

    // 上面是整合在一起进行测试，也可以单独对style className disabled进行测试
    // it('style', () => {
    //   const wrapper = mount(<${componentObject} style={{width: 60}}>hello world</${componentObject}>)
    //   expect(wrapper.prop('width')).toEqual('60px')
    // })

    // it('disabled', () => {
    //   const handleClick = jest.fn()
    //   const wrapper = mount(<${componentObject} disabled={{width: 60}} onClick={handleClick}>hello world</${componentObject}>)
    //   expect(wrapper.find('.${componentName}-disabed')).toExist()
    //   const triggerDom = wrapper.find('.${componentName}-click-dom')
    //   triggerDom.simulate('click')
    //   expect(handleClick).not.toHaveBeenCalled()
    // })
  })

  // 7.component interaction(event)
  /**
   * 事件测试
   */
  describe('7.component interaction(event)', () => {
    it('should not clickable when ${componentObject} is loading', () => {
      const onClick = jest.fn()
      const wrapper = mount(
        // @ts-ignore
        <${componentObject} loading onClick={onClick}>
          ${componentName}
        </${componentObject}>
      )
      wrapper.simulate('click')
      expect(onClick).not.toHaveBeenCalledWith()
    })

    it('should clickable ', () => {
      const onClick = jest.fn()
      // @ts-ignore
      const wrapper = mount(<${componentObject} onClick={onClick}>${componentName}</${componentObject}>)
      wrapper.simulate('click')
      expect(onClick).toHaveBeenCalled()
    })
  })

  // 8.config provider
  /**
   * 全局化配置测试
   * 1. 属性只需判断一个就好 如果有需要可以写多个
   * 2. 注意要和默认的属性区分开 比如size默认值为'middle',此时应该传入'small'或者'large'
   * 3. 如果有组件有配置国际化的代码，也需要进行测试
   */
  describe('8.config provider', () => {
    it('should config use config provider', () => {
      const ${componentName}Config = {
        compDefaultProps: {
          ${componentObject}: {
            type: 'primary',
            size: 'large',
            placement: 'left'
          },
        },
      }
      const wrapper = mount(
        <ConfigProvider value={${componentName}Config}>
          <${componentObject}>${componentObject} Text</${componentObject}>
        </ConfigProvider>
      )
      expect(wrapper.find('.kd-${componentName}')).toHaveClassName('.kd-${componentName}-primary')
      expect(wrapper.find('.kd-${componentName}')).toHaveClassName('.kd-${componentName}-large')
      expect(wrapper.find('.kd-${componentName}')).toHaveClassName('.kd-${componentName}-left')
    })
  })

  // 9. ref test
  /**
   * ref的挂载测试
   * 1. 不是必测项，开放出去了就需要测试
   * 2. 不是每个组件都需要开放ref出去，看具体的业务场景
   */
  describe('9. ref test', () => {
    it('should get ${componentObject} element from ref', () => {
      const ref = React.createRef()
      // @ts-ignore
      mount(<${componentObject} ref={ref}></${componentObject}>)
      // 有的组件开放出去的ref是一个对象 比如Select组件此时获取dom对象就需要使用ref.current.input获取 如果开放出去的ref对象还提供有特殊的方法也需要测试 比如 focus、blur、scrollToIndex等
      expect((ref.current as HTMLElement).classList.contains('.kd-${componentName}')).toBe(true)
    })
  })

  // 10. api test
  /**
   * 1. 需要对文档中的所有api进行测试 如果demo中提供了，测试案例中不好测试可以不用测试
   * 2. 针对一些api在上面步骤中已经测试到的也可以不用测试
   * 3. 这里需要特别注意的案例是受控用法的测试 如果提供了value和onChange api是必须要测试受控用法的
   */
  describe('10. api test', () => {
    // 受控与非受控需要测试
    it('defaultValue', () => {
      // @ts-ignore
      const wrapper = mount(<${componentObject} defaultValue='123'>${componentName}</${componentObject}>)
      expect(wrapper.find('.kd-${componentName}-input').prop('value')).toEqual('123')
    })

    it('value', () => {
      // @ts-ignore
      const wrapper = mount(<${componentObject} value='123'>${componentName}</${componentObject}>)
      expect(wrapper.find('.kd-${componentName}-input').prop('value')).toEqual('123')
    })

    /**
     * 1. onChange的触发一般通过一系列的点击操作(click, mousedown)去实现,然后去检测onChange事件是否被触发
     * 2. 对于input checkbox radio等能通过input change事件触发的可以使用simulate('change', {})
     */
    it('onChange', () => {
      let tempV = ''
      const handleChange = jest.fn((e) => {
        tempV = e.target.value
      })
      // @ts-ignore
      const wrapper = mount(<${componentObject} onChange={handleChange}>${componentName}</${componentObject}>)
      // 通过一系列的点击操作去触发
      wrapper.find('.${componentName}-trigger1').simulate('click')
      wrapper.find('.${componentName}-trigger2').simulate('click')
      // 通过simulate去触发input的change事件触发
      // const triggerDom = wrapper.find('.kd-${componentName}-input')
      // triggerDom.simulate('change', { target: { value: '123' } })
      expect(handleChange).toHaveBeenCalled()
      expect(tempV).toEqual('123')
      // 对于存在有下拉面板的需要判断change后输入框与下拉面板是否真的都有变化值切一致 比如说date-picker
      // expect(wrapper.find('.${componentName}-input').prop('value').toEqual('123'))
      // expect(wrapper.find('.${componentName}-dropdown').prop('value').toEqual('123'))
    })

    // 受控测试
    it('value defaultValue onChange', () => {
      let tempV = ''
      const handleChange = jest.fn((e) => {
        tempV = e.target.value
      })
      const wrapper = mount(
        // @ts-ignore
        <${componentObject} defaultValue="000" value="123" onChange={handleChange}>
          ${componentName}
        </${componentObject}>,
      )
      // 测试value的值覆盖defaultValue
      expect(wrapper.find('.kd-${componentName}-input').prop('value')).toEqual('123')
      // 通过点击事件触发onChange
      wrapper.find('.${componentName}-trigger1').simulate('click')
      // onChange返回值已经更改 但是界面上的值保持123不变
      expect(tempV).toEqual('456')
      expect(wrapper.find('.kd-${componentName}-input').prop('value')).toEqual('123')
    })

    // 联动受控
    it('value onChange', () => {
      let tempV = ''
      const handleChange = jest.fn((e) => {
        tempV = e.target.value
        wrapper.setProps({value: tempV})
      })
      const wrapper = mount(
        // @ts-ignore
        <${componentObject} value="000" onChange={handleChange}>
          ${componentName}
        </${componentObject}>,
      )
      wrapper.find('.${componentName}-trigger1').simulate('click')
      expect(tempV).toEqual('123')
      expect(wrapper.find('.kd-${componentName}-input').prop('value')).toEqual('123')
    })

    // 复合组件只需要测试本组件的api 针对引用的其他组件api只需要测试个别的api，看能否挂载出去。比如说dropdown引用了tooltip 可以测试popperClassName能否挂载到下拉面板
    it('popperClassName', () => {
      // @ts-ignore
      const wrapper = mount(<${componentObject} popperClassName='my-class' popperStyle={{width: 100}}></${componentObject}>)
      const dropdownPanel = wrapper.find('.kd-${componentName}-dropdown-panel')
      expect(dropdownPanel).toHaveClassName('my-class')
      // @ts-ignore
      expect(dropdownPanel.props().style.width).toEqual('100px')
    })
  })

  // 11. special case
  /**
   * 这里写的单测一般是开发在使用过程中在github issues上提出来的 上面的单测没覆盖到的针对一些特殊使用和边界情况的补充。比如点击清空按钮应该触发onClear，而不应该触发onChange
   */
  describe('11. special case', () => {
    it('in windows case should render correctly', () => {})
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

这是基本使用方法的描述性文字

\`\`\`jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { ${componentObject} } from '@kdcloudjs/kdesign'

function Demo() {
  // 改下面的代码
  return (
    <div>
      <${componentObject}>${componentObject}</${componentObject}>
    </div>
  )
}

ReactDOM.render(<Demo />, mountNode)
\`\`\`
`,
  )

  fs.appendFileSync(
    `${path.resolve(__dirname, '../components')}/index.tsx`,
    `
export { default as ${componentObject} } from './${componentName}'
`,
  )

  const compDefaultPropString = fs.readFileSync(
    `${path.resolve(__dirname, '../components/config-provider')}/compDefaultProps.tsx`,
    'utf-8',
  )
  const insertIndexArr = /(\r?\n)*}(\r?\n)*export\sdefault\scompDefaultProps(\r?\n)/g.exec(compDefaultPropString)
  const newCompDefaultPropString =
    compDefaultPropString.substring(0, insertIndexArr.index) +
    `
  ${componentObject}: {},` +
    insertIndexArr[0]
  fs.writeFileSync(
    `${path.resolve(__dirname, '../components/config-provider')}/compDefaultProps.tsx`,
    newCompDefaultPropString,
    'utf-8',
  )
}

createComponent()
