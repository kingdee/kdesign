import React from 'react'
import { mount, render } from 'enzyme'
// import ConfigProvider from '../../config-provider/index'
import QRCode, { QRCodeErrorLevels, QRCodeStatus, QRCodeTypes } from '../index'
import mountTest from '../../../tests/shared/mountTest'
import 'jest-canvas-mock'

const value = 'https://www.kingdee.design/'
describe('QRCode', () => {
  // 1. mount test
  describe('1. mount test', () => {
    mountTest(() => <QRCode value={value} />)
  })

  // 2. render test
  /**
   * 1. 组件快照 可以测试多个不同props下组件生成的快照。当组件更新结构后，生成的快照会不同，这是跑组件的单测会导致报错
   * 2. 运行 yarn test:update 指令可以更新快照
   */
  describe('2. render test', () => {
    it('renders correctly', () => {
      QRCodeTypes.forEach((type) => {
        expect(render(<QRCode value={value} type={type} />)).toMatchSnapshot()
      })

      QRCodeStatus.forEach((status) => {
        expect(render(<QRCode value={value} status={status} />)).toMatchSnapshot()
      })

      QRCodeErrorLevels.forEach((errorLevel) => {
        expect(render(<QRCode value={value} errorLevel={errorLevel} />)).toMatchSnapshot()
      })
    })
  })

  // 3. render null or undefined without errors
  /**
   * 验证特殊值的渲染是否正确 针对还有子元素QRCode.Item的组件也需要对子组件进行验证
   */
  describe('3. render null or undefined without errors', () => {
    it('render null or undefined without errors', () => {
      const wrapper = (
        <QRCode value={value}>
          {null}
          {undefined}
        </QRCode>
      )
      expect(wrapper).toMatchSnapshot()
    })
  })

  // 4. displayName
  /**
   * 1. 组件的displayName使用驼峰的命名方式
   * 2. 针对父子组件结合的组件，比如dropDown和dropDown.Item都需要测试displayName
   */
  describe('4. displayName', () => {
    it('should have displayName static property', () => {
      expect(QRCode.displayName).toBe('QRCode')
    })
  })

  // 5. class state
  /**
   * 需测试className style能否正确挂载 disabeld状态下是否还能触发事件 data-test能传递下去
   */
  describe('5. class state', () => {
    it('className style', () => {
      const wrapper = mount(
        <QRCode value={value} className="my-class" style={{ background: '#FFF' }} data-test="test" />,
      )
      // className
      expect(wrapper).toHaveClassName('my-class')
      // style
      expect(wrapper).toHaveStyle({ background: '#FFF' })
      // 其余不同的属性(...others)能传递下去
      expect(wrapper.prop('data-test')).toEqual('test')
    })

    it('borderless', () => {
      const borderlessQRCode = mount(<QRCode value={value} bordered={false} />)

      // bordered
      expect(borderlessQRCode.find('.kd-qrcode')).toHaveClassName('kd-qrcode-borderless')
    })
  })
})
