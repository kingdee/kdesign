import React from 'react'
import { render, mount } from 'enzyme'
// import Icon from '../../icon'
import ConfigProvider from '../../config-provider/index'
import Input, { InputSiteTypes, InputSiteType, BorderTypes, BorderType } from '../index'
import mountTest from '../../../tests/shared/mountTest'

describe('Input', () => {
  // 1.mount test
  mountTest(Input)
  InputSiteTypes.forEach((type) => {
    mountTest(() => <Input size={type} />)
  })

  // 2.render test
  it('renders correctly', () => {
    expect(render(<Input />)).toMatchSnapshot()

    InputSiteTypes.forEach((type) => {
      expect(render(<Input size={type} />)).toMatchSnapshot()
    })
    BorderTypes.forEach((type) => {
      expect(render(<Input borderType={type} />)).toMatchSnapshot()
    })
  })

  // 3.warns in component
  it('warns if size is wrong', () => {
    const mockWarn = jest.fn()
    jest.spyOn(console, 'warn').mockImplementation(mockWarn)
    const size = 'who am I' as any as InputSiteType
    render(<Input size={size} />)
    expect(mockWarn).toHaveBeenCalledTimes(1)
    expect(mockWarn.mock.calls[0][0]).toMatch("Warning: [kdesign]-input: cannot found input size 'who am I'")
  })
  it('warns if borderType is wrong', () => {
    const mockWarn = jest.fn()
    jest.spyOn(console, 'warn').mockImplementation(mockWarn)
    const borderType = 'who am I' as any as BorderType
    render(<Input borderType={borderType} />)
    expect(mockWarn).toHaveBeenCalledTimes(1)
    expect(mockWarn.mock.calls[0][0]).toMatch("Warning: [kdesign]-input: cannot found input borderType 'who am I'")
  })

  // 5. displayName
  it('should have displayName static property', () => {
    const wrapper = mount(<Input />)
    expect((wrapper.type() as any).displayName).toBe('Input')
  })

  // 6. class state
  it('should class use right', () => {
    // default
    const DefaultInput = mount(<Input />)
    expect(DefaultInput.find('.kd-input')).toHaveClassName('.kd-input-size-middle')
    expect(DefaultInput.find('.kd-input')).toHaveClassName('.kd-input-underline')

    // disabled
    const DisabledInput = mount(<Input disabled />)
    expect(DisabledInput.find('.kd-input')).toHaveClassName('.kd-input-disabled')

    InputSiteTypes.forEach((size) => {
      const TestButton = mount(<Input size={size} />)
      expect(TestButton.find(`.kd-input`)).toHaveClassName(`.kd-input-size-${size}`)
    })

    BorderTypes.forEach((type) => {
      if (type === 'bordered') return
      const TestButton = mount(<Input borderType={type} />)
      expect(TestButton.find(`.kd-input`)).toHaveClassName(`.kd-input-${type === 'none' ? 'borderless' : type}`)
    })

    // allowClear
    const AllowClearInput = mount(<Input allowClear />)
    expect(AllowClearInput.find('.kd-input-clear-icon')).toHaveLength(1)

    // suffix and prefix
    const FixClearInput = mount(<Input placeholder="请输入" prefix="金额" suffix="rmb" />)
    expect(FixClearInput.find('.kd-input-suffix')).toHaveLength(1)
    expect(FixClearInput.find('.kd-input-prefix')).toHaveLength(1)
    const PrefixlearInput = mount(<Input placeholder="请输入" prefix="金额" />)
    expect(PrefixlearInput.find('.kd-input-suffix')).toHaveLength(0)
    expect(PrefixlearInput.find('.kd-input-prefix')).toHaveLength(1)

    // addonBefore and addonAfter
    const AddonInput = mount(<Input placeholder="请输入" borderType="bordered" addonBefore="金额" addonAfter="rmb" />)
    expect(AddonInput.find('.kd-input-group')).toHaveLength(1)
    expect(AddonInput.find('.kd-input-group-addon')).toHaveLength(2)
  })

  // 7.component interaction(event)
  it('onChange ', () => {
    let value = ''
    const onChange = jest.fn((e) => {
      value = e.target.value
    })
    const wrapper = mount(<Input onChange={onChange} />)
    wrapper.simulate('change', { target: { value: '12' } })
    expect(onChange).toHaveBeenCalled()
    expect(value).toBe('12')
  })

  it('Focus ', () => {
    const onFocus = jest.fn()
    const wrapper = mount(<Input onFocus={onFocus} />)
    wrapper.find('input').simulate('focus', { target: { value: '12' } })
    expect(onFocus).toHaveBeenCalled()
  })

  it('Blur ', () => {
    const onBlur = jest.fn()
    const wrapper = mount(<Input onBlur={onBlur} />)
    wrapper.find('input').simulate('blur', { target: { value: '12' } })
    expect(onBlur).toHaveBeenCalled()
  })

  it('Reset', () => {
    let value = '123'
    const onChange = jest.fn((e) => {
      value = e.target.value
    })
    const wrapper = mount(<Input onChange={onChange} allowClear />)
    wrapper.find('.kd-input-clear-icon').simulate('click')
    expect(onChange).toHaveBeenCalled()
    expect(value).toBe('')
  })

  it('key enter', () => {
    const onKeyUp = jest.fn()
    const wrapper = mount(<Input onKeyUp={onKeyUp} />)
    wrapper.simulate('focus')
    wrapper.simulate('keyup', { key: 'Enter' })
    expect(onKeyUp).toHaveBeenCalled()
  })

  // 8.config provider
  it('should config use config provider', () => {
    const buttonConfig = {
      compDefaultProps: {
        Input: {
          disabled: true,
        },
      },
    }
    const wrapper = mount(
      <ConfigProvider value={buttonConfig}>
        <Input />
      </ConfigProvider>,
    )
    expect(wrapper.find('.kd-input')).toHaveClassName('.kd-input-disabled')
  })

  // 9. ref test
  it('should get button element from ref', () => {
    const ref = React.createRef()
    mount(<Input ref={ref} />)
    expect(ref.current instanceof HTMLInputElement).toBe(true)
  })
})
