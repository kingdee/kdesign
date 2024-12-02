import React from 'react'
import { render, mount } from 'enzyme'
import ConfigProvider from '../../config-provider/index'
import GeoZonePicker from '../index'
import mountTest from '../../../tests/shared/mountTest'
const countryList = [
  { code: '001', name: '中国' },
  { code: '002', name: '美国' },
  { code: '003', name: '印度' },
  { code: '004', name: '中非共和国' },
]
describe('GeoZonePicker', () => {
  // 1. mount test
  describe('1. mount test', () => {
    mountTest(() => <GeoZonePicker />)
  })

  // 2. render test
  /**
   * 1. 组件快照 可以测试多个不同props下组件生成的快照。当组件更新结构后，生成的快照会不同，这是跑组件的单测会导致报错
   * 2. 运行 yarn test:update 指令可以更新快照
   */
  describe('2. render test', () => {
    it('renders correctly', () => {
      expect(render(<GeoZonePicker />)).toMatchSnapshot()

      expect(render(<GeoZonePicker bordered />)).toMatchSnapshot()

      expect(render(<GeoZonePicker countryList={countryList} defaultCountry="001" />)).toMatchSnapshot()

      expect(render(<GeoZonePicker disabled></GeoZonePicker>)).toMatchSnapshot()
    })
  })

  // 3. render null or undefined without errors
  /**
   * 验证特殊值的渲染是否正确 针对还有子元素GeoZonePicker.Item的组件也需要对子组件进行验证
   */
  describe('3. render null or undefined without errors', () => {
    it('render null or undefined without errors', () => {
      const wrapper = (
        <GeoZonePicker>
          {null}
          {undefined}
        </GeoZonePicker>
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
      expect(GeoZonePicker.displayName).toBe('GeoZonePicker')
      // expect(GeoZonePicker.Item.displayName).toBe('GeoZonePickerItem')
    })
  })

  // 5. class state
  /**
   * 需测试className style能否正确挂载 disabeld状态下是否还能触发事件 data-test能传递下去
   */
  describe('5. class state', () => {
    it('className style disabled', () => {
      const wrapper = mount(
        <GeoZonePicker className="my-class" style={{ width: 60 }} disabled data-test="test">
          hello world
        </GeoZonePicker>,
      )
      // className
      expect(wrapper).toHaveClassName('my-class')
      // style
      const domNode = wrapper.getDOMNode() as HTMLElement
      expect(domNode.style.width).toEqual('60px')
      // disabled
      const DisabledWrapper = mount(<GeoZonePicker disabled />)
      expect(DisabledWrapper.find('.kd-geo-zone-picker')).toHaveClassName('.kd-geo-zone-picker-disabled')
      // 其余不同的属性(...others)能传递下去
      expect(wrapper.prop('data-test')).toEqual('test')
    })
  })

  // 7.config provider
  /**
   * 全局化配置测试
   * 1. 属性只需判断一个就好 如果有需要可以写多个
   * 2. 注意要和默认的属性区分开 比如size默认值为'middle',此时应该传入'small'或者'large'
   * 3. 如果有组件有配置国际化的代码，也需要进行测试
   */
  describe('7.config provider', () => {
    it('should config use config provider', () => {
      const geoZonePickerConfig = {
        compDefaultProps: {
          GeoZonePicker: {
            bordered: 'true',
          },
        },
      }
      const wrapper = mount(
        <ConfigProvider value={geoZonePickerConfig}>
          <GeoZonePicker>GeoZonePicker Text</GeoZonePicker>
        </ConfigProvider>,
      )
      expect(wrapper.find('.kd-geo-zone-picker')).toHaveClassName('.kd-geo-zone-picker-bordered')
    })
  })

  // 8. api test
  /**
   * 1. 需要对文档中的所有api进行测试 如果demo中提供了，测试案例中不好测试可以不用测试
   * 2. 针对一些api在上面步骤中已经测试到的也可以不用测试
   * 3. 这里需要特别注意的案例是受控用法的测试 如果提供了value和onChange api是必须要测试受控用法的
   */
  describe('8. api test', () => {
    // 受控与非受控需要测试
    it('defaultCountry', () => {
      const wrapper = mount(
        <GeoZonePicker countryList={countryList} defaultCountry="001">
          geo-zone-picker
        </GeoZonePicker>,
      )
      expect(wrapper.find('.kd-geo-zone-picker-country-input-text').text()).toEqual('中国')
    })
  })
})
