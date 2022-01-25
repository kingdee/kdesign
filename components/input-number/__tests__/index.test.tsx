import React from 'react'
import { render, mount } from 'enzyme'
import InputNumber from '../index'
import { InputSiteTypes } from '../../input'
import mountTest from '../../../tests/shared/mountTest'

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
    // default
    const DefaultInput = mount(<InputNumber />)
    expect(DefaultInput.find('.kd-input')).toHaveClassName('.kd-input-size-middle')
    expect(DefaultInput.find('.kd-input')).toHaveClassName('.kd-input-underline')
  })

  // 7.component interaction(event)
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

  it('had min value', () => {
    let value = ''
    const onChange = jest.fn((e) => {
      value = e.target.value
    })
    const wrapper = mount(<InputNumber min={0} onChange={onChange} mustInScope />)
    wrapper.simulate('change', { target: { value: '-12312' } })
    expect(value).toBe('')
  })

  it('had max value', () => {
    let value = ''
    const onChange = jest.fn((e) => {
      value = e.target.value
    })
    const wrapper = mount(<InputNumber max={100} maxMark="]" onChange={onChange} mustInScope />)
    wrapper.simulate('change', { target: { value: '101' } })
    expect(value).toBe('')
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

  // 9. ref test
  it('should get inputNumber element from ref', () => {
    const ref = React.createRef()
    mount(<InputNumber ref={ref} />)
    expect(ref.current instanceof HTMLInputElement).toBe(true)
  })
})
