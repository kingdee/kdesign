import React from 'react'
import { render, mount } from 'enzyme'
import InputNumber from '../index'
import { InputSiteTypes } from '../../input'
import mountTest from '../../../tests/shared/mountTest'
import ConfigProvider from '../../config-provider/index'

describe('InputNumber', () => {
  // 1.mount test
  mountTest(InputNumber)
  InputSiteTypes.forEach((type) => {
    mountTest(() => <InputNumber size={type} />)
  })

  // 2.render test
  it('renders correctly', () => {
    expect(render(<InputNumber />)).toMatchSnapshot()
    InputSiteTypes.forEach((type) => {
      expect(render(<InputNumber size={type} />)).toMatchSnapshot()
    })
  })

  // 5. displayName
  it('should have displayName static property', () => {
    const wrapper = mount(<InputNumber />)
    expect((wrapper.type() as any).displayName).toBe('InputNumber')
  })

  // 6. class state
  it('should class use right', () => {
    const DefaultInput = mount(<InputNumber className="my-test" style={{ color: 'red' }} date-test="test" />)
    expect(DefaultInput.find('.kd-input')).toHaveClassName('.kd-input-size-middle')
    expect(DefaultInput.find('.kd-input')).toHaveClassName('.kd-input-underline')
    expect(DefaultInput.find('input').prop('date-test')).toEqual('test')
    expect(DefaultInput.find('input')).toHaveClassName('.my-test')
    expect(DefaultInput.find('input')).toHaveStyle('color', 'red')
  })

  // 7.component interaction(event)
  // 受控与非受控测试（TODO）
  it('value', () => {
    const wrapper = mount(<InputNumber value="123" />)
    expect(wrapper.find('.kd-input').prop('value')).toEqual('123')
  })

  it('valueChange ', () => {
    let value = ''
    const onChange = jest.fn((e) => {
      value = e.target.value
    })
    const wrapper = mount(<InputNumber mask="#,###" symbol="$" onChange={onChange} />)
    wrapper.simulate('focus')
    wrapper.simulate('change', { target: { value: '12345' } })
    expect(onChange).toHaveBeenCalled()
    expect(value).toBe('12345')
    wrapper.simulate('blur')
    expect(wrapper.find('.kd-input').getDOMNode().getAttribute('value')).toBe('$12,345')
    wrapper.simulate('focus')
    expect(wrapper.find('.kd-input').getDOMNode().getAttribute('value')).toBe('12345')
  })

  it('digitLength but mustInPrecisionScope', () => {
    let value = ''
    const onChange = jest.fn((e) => {
      value = e.target.value
    })
    const wrapper = mount(<InputNumber digitLength={4} onChange={onChange} />)
    wrapper.simulate('change', { target: { value: '12345' } })
    expect(value).toBe('1234')
  })

  it('digitLength but not mustInPrecisionScope', () => {
    let value = ''
    const onChange = jest.fn((e) => {
      value = e.target.value
    })
    const onBlur = jest.fn((e) => {
      value = e.target.value
    })
    const wrapper = mount(
      <InputNumber digitLength={4} onChange={onChange} onBlur={onBlur} mustInPrecisionScope={false} />,
    )
    wrapper.simulate('focus')
    wrapper.simulate('change', { target: { value: '12345' } })
    expect(value).toBe('12345')
    wrapper.simulate('blur')
    expect(value).toBe('1234')
  })

  it('限定digitLength和decimalLength', () => {
    let value = ''
    const onChange = jest.fn((e) => {
      value = e.target.value
    })
    const wrapper = mount(<InputNumber decimalLength={2} digitLength={5} onChange={onChange} />)
    wrapper.simulate('change', { target: { value: '10000.1' } })
    expect(value).toBe('100')
    wrapper.simulate('change', { target: { value: '10.111' } })
    expect(value).toBe('10.11')
  })

  it('数值模式', () => {
    let value
    const onChange = jest.fn((e) => {
      value = e.target.value
    })
    const wrapper = mount(<InputNumber numberMode onChange={onChange} />)
    wrapper.simulate('change', { target: { value: '1234567' } })
    expect(value).toBe(1234567)
  })

  it('限定digitLength时是否显示小数尾部 0', () => {
    const wrapper = mount(<InputNumber decimalLength={2} value="1" />)
    expect(wrapper.find('input').props().value).toEqual('1')

    wrapper.setProps({ showDecimalTailZero: true })
    wrapper.update()
    expect(wrapper.find('input').props().value).toEqual('1.00')
  })

  it('限定digitLength但不限定decimalLength', () => {
    let value = ''
    const onChange = jest.fn((e) => {
      value = e.target.value
    })
    const wrapper = mount(<InputNumber digitLength={5} onChange={onChange} />)
    wrapper.simulate('change', { target: { value: '10000.1' } })
    expect(value).toBe('10000')
    wrapper.simulate('change', { target: { value: '10.1111' } })
    expect(value).toBe('10.111')
  })

  it('formatter', () => {
    const wrapper = mount(<InputNumber formatter={(value) => `$${value}`} value="123" />)
    expect(wrapper.find('input').props().value).toEqual('$123')
  })

  it('had min value and minMark is [', () => {
    let value = ''
    const onChange = jest.fn((e) => {
      value = e.target.value
    })
    const wrapper = mount(<InputNumber min={0} onChange={onChange} mustInScope />)
    wrapper.simulate('change', { target: { value: '-12312' } })
    expect(value).toBe('')
    wrapper.simulate('change', { target: { value: '0' } })
    expect(value).toBe('')
    wrapper.setProps({ minMark: '[' })
    wrapper.simulate('change', { target: { value: '0' } })
    expect(value).toBe('0')
  })

  it('had max value and maxMark is )', () => {
    let value = ''
    const onChange = jest.fn((e) => {
      value = e.target.value
    })
    const wrapper = mount(<InputNumber max={100} onChange={onChange} mustInScope />)
    wrapper.simulate('change', { target: { value: '101' } })
    expect(value).toBe('')
    wrapper.setProps({ maxMark: ')' })
    wrapper.simulate('change', { target: { value: '100' } })
    expect(value).toBe('')
    wrapper.setProps({ maxMark: ']' })
    wrapper.simulate('change', { target: { value: '100' } })
    expect(value).toBe('100')
  })

  it('整数字段不允许输入小数点', () => {
    let value = ''
    const onChange = jest.fn((e) => {
      value = e.target.value
    })
    const wrapper = mount(<InputNumber decimalLength={0} onChange={onChange} />)
    wrapper.simulate('change', { target: { value: '10.1' } })
    expect(value).toBe('')
    wrapper.simulate('change', { target: { value: '10' } })
    expect(value).toBe('10')
  })

  it('为零是否显示', () => {
    const wrapper = mount(<InputNumber value="0" />)
    expect(wrapper.find('input').props().value).toEqual('')
    wrapper.setProps({ zeroShow: true })
    wrapper.simulate('change', { target: { value: '0' } })
    expect(wrapper.find('input').props().value).toEqual('0')
  })

  // 8.config provider
  describe('8.config provider', () => {
    it('should config use config provider', () => {
      const inputNumberConfig = {
        compDefaultProps: {
          InputNumber: {
            size: 'small',
          },
        },
      }
      const wrapper = mount(
        <ConfigProvider value={inputNumberConfig}>
          <InputNumber />
        </ConfigProvider>,
      )
      expect(wrapper.find('.kd-input')).toHaveClassName('.kd-input-size-small')
    })
  })

  // 9. ref test
  it('should get inputNumber element from ref', () => {
    const ref: any = React.createRef()
    mount(<InputNumber ref={ref} />)
    expect((ref.current?.input as HTMLElement).classList.contains('kd-input')).toBe(true)
    expect(ref.current?.focus).toBeTruthy()
    expect(ref.current?.blur).toBeTruthy()
    expect(ref.current?.select).toBeTruthy()
  })
})
