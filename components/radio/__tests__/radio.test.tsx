import React from 'react'
import { mount, render } from 'enzyme'
import ConfigProvider from '../../config-provider/index'
import Radio, { Group, Button } from '..'
import focusTest from '../../../tests/shared/focusTest'
import mountTest from '../../../tests/shared/mountTest'

describe('Radio', () => {
  // 1.mount test
  describe('1.mount test', () => {
    focusTest(Radio, { refFocus: true })
    mountTest(Radio)
    mountTest(Group)
    mountTest(Button)
  })

  // 2.render test
  describe('2.render test', () => {
    it('should render correctly', () => {
      const wrapper = render(
        <Radio className="customized" style={{ color: 'red' }} radioType="square" prefixCls="myPrefix">
          Test
        </Radio>,
      )
      expect(wrapper).toMatchSnapshot()
    })
  })

  // 3.render no child without errors
  describe('3.render no child without errors', () => {
    it('render no child without errors', () => {
      expect(mount(<Radio></Radio>)).toMatchSnapshot()
    })
  })

  // 4.render null or undefined without errors
  describe('4. render null or undefined without errors', () => {
    it('render null or undefined without errors', () => {
      expect(
        mount(
          <Radio>
            {null}
            {undefined}
          </Radio>,
        ),
      ).toMatchSnapshot()
    })
  })

  // 5. displayName
  describe('5. displayName', () => {
    it('should have displayName static property', () => {
      const wrapper = mount(<Radio />)
      expect((wrapper.type() as any).displayName).toBe('Radio')
    })
  })

  // 6.class state
  describe('6. class state', () => {
    it('should class use right', () => {
      const DefaultRadio = mount(<Radio />)
      expect(DefaultRadio.find('.kd-radio')).toBeTruthy()
      const squareRadio = mount(<Radio radioType="square">Square Radio</Radio>)
      expect(squareRadio.find('.kd-radio-square')).toBeTruthy()
    })
  })

  // 7.component interaction(event)
  describe('7.component interaction(event)', () => {
    it('responses change events', () => {
      const onChange = jest.fn()

      const wrapper = mount(<Radio onChange={onChange}>Test</Radio>)

      wrapper.find('.kd-radio-input').simulate('change')
      expect(onChange).toHaveBeenCalled()
    })
  })

  // 8.config provider
  describe('8.config provider', () => {
    it('should config use config provider', () => {
      const radioConfig = {
        compDefaultProps: {
          Radio: {
            radioType: 'square',
          },
        },
      }
      const wrapper = mount(
        <ConfigProvider value={radioConfig}>
          <Radio />
        </ConfigProvider>,
      )
      expect(wrapper.find('.kd-radio-square')).toBeTruthy()
    })
  })

  // 9.api test
  describe('9. api test', () => {
    it('api test', () => {
      // kd-radio-checked
      const checkedRadio = mount(<Radio />)
      expect(checkedRadio.find('.kd-radio-checked')).toBeTruthy()
      // defaultChecked
      const defaultCheckedRadio = mount(<Radio />)
      expect(defaultCheckedRadio.find('.kd-radio-checked')).toBeTruthy()
      // disabled
      const disabledRadio = mount(<Radio disabled />)
      expect(disabledRadio.find('.kd-radio')).toHaveClassName(`.kd-radio-disabled`)
      // value
      const valueRadio = mount(
        <Radio.Group name="radiogroup" defaultValue={'AAAA'}>
          <Radio value={'AAAA'}>A</Radio>
          <Radio value={'BBBB'}>B</Radio>
        </Radio.Group>,
      )
      expect(valueRadio.find('.kd-radio-checked').at(0).find('input').prop('value')).toEqual(`AAAA`)
    })
  })
})
