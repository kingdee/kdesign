import React from 'react'
import { render, mount } from 'enzyme'
// import Icon from '../../icon'
import ConfigProvider from '../../config-provider/index'
import Input, { InputSiteTypes, InputSiteType, BorderTypes, BorderType } from '../index'
import mountTest from '../../../tests/shared/mountTest'

describe('Input', () => {
  // 1.mount test
  mountTest(Input)

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

  // 4. render null or undefined without errors
  describe('4. render null or undefined without errors', () => {
    it('render null or undefined without errors', () => {
      const wrapper = (
        <Input>
          {null}
          {undefined}
        </Input>
      )
      expect(wrapper).toMatchSnapshot()
    })
  })

  // 5. displayName
  it('should have displayName static property', () => {
    const wrapper = mount(<Input />)
    expect((wrapper.type() as any).displayName).toBe('Input')
  })

  // 6. class state
  it('class & style', () => {
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

    // count
    const CountInput = mount(<Input count />)
    CountInput.find('input').simulate('focus')
    expect(CountInput.find('.kd-input-input-mark-inner')).toHaveLength(1)

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

    // style & data-test & className & disabled
    const onClick = jest.fn()
    const otherInput = mount(
      <Input style={{ width: 60 }} data-test={'test'} className="my-class" disabled onClick={onClick} />,
    )
    expect(otherInput.find('input').props().style?.width).toEqual(60)
    expect(otherInput.find('input').prop('data-test')).toEqual('test')
    expect(otherInput.find('input')).toHaveClassName('my-class')
    expect(otherInput.find('input').props().disabled).toBe(true)
    otherInput.simulate('click')
    expect(onClick).not.toHaveBeenCalled()
  })

  // 7.component interaction(event)
  it('event', () => {
    const onChange = jest.fn()
    const onFocus = jest.fn()
    const onBlur = jest.fn()
    const onKeyUp = jest.fn()
    const onPressEnter = jest.fn()
    const wrapper = mount(
      <Input
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        onKeyUp={onKeyUp}
        onPressEnter={onPressEnter}
        allowClear
      />,
    )

    // onChange
    wrapper.find('input').simulate('change')
    expect(onChange).toHaveBeenCalled()

    // onFocus
    wrapper.find('input').simulate('focus')
    expect(onFocus).toHaveBeenCalled()

    // onBlur
    wrapper.find('input').simulate('blur')
    expect(onBlur).toHaveBeenCalled()

    // onPressEnter
    wrapper.find('input').simulate('focus')
    wrapper.find('input').simulate('keyup', { key: 'Enter' })
    expect(onBlur).toHaveBeenCalled()
    expect(onKeyUp).toHaveBeenCalled()
    expect(onPressEnter).toHaveBeenCalled()
  })

  // 8.config provider
  it('should config use config provider', () => {
    const buttonConfig = {
      compDefaultProps: {
        Input: {
          disabled: true,
          size: 'small',
          borderType: 'none',
        },
      },
    }
    const wrapper = mount(
      <ConfigProvider value={buttonConfig}>
        <Input />
      </ConfigProvider>,
    )
    expect(wrapper.find('.kd-input')).toHaveClassName('.kd-input-disabled')
    expect(wrapper.find(`.kd-input`)).toHaveClassName(`.kd-input-size-small`)
    expect(wrapper.find(`.kd-input`)).toHaveClassName(`.kd-input-borderless`)
  })

  // 9. ref test
  it('ref', () => {
    const ref: any = React.createRef()
    const onBlur = jest.fn()
    const onFocus = jest.fn()
    mount(<Input ref={ref} onBlur={onBlur} onFocus={onFocus} />)
    expect((ref.current?.input as HTMLElement).classList.contains('kd-input')).toBe(true)
    expect(ref.current?.focus).toBeTruthy()
    expect(ref.current?.blur).toBeTruthy()
    expect(ref.current?.select).toBeTruthy()
  })

  // 10. api test
  describe('api test', () => {
    it('value & defaultValue', () => {
      const wrapperDefault = mount(<Input defaultValue={'defaultValue'} />)
      expect(wrapperDefault.find('input').props().value).toBe('defaultValue')

      let value = 'value'
      const onChange = jest.fn((e) => {
        value = e.target.value
      })
      const wrapperValue = mount(<Input defaultValue={'defaultValue'} value={value} onChange={onChange} />)
      expect(wrapperValue.find('input').props().value).toBe('value')
      wrapperValue.find('input').simulate('change', { target: { value: '12' } })
      expect(onChange).toHaveBeenCalled()
      expect(value).toBe('12')
    })

    it('placeholder', () => {
      const wrapper = mount(<Input placeholder={'kd'} />)
      expect(wrapper.find('.kd-input').props().placeholder).toBe('kd')
    })

    it('allowClear', () => {
      let value = '123'
      const onChange = jest.fn((e) => {
        value = e.target.value
      })
      const onBlur = jest.fn()
      const wrapper = mount(<Input onChange={onChange} onBlur={onBlur} allowClear />)
      wrapper.find('.kd-input-clear-icon').simulate('click')
      expect(onChange).toHaveBeenCalled()
      expect(onBlur).not.toHaveBeenCalled()
      expect(value).toBe('')
    })

    it('maxLength & minLength', () => {
      // maxLength
      const wrapperMax = mount(<Input maxLength={2} />)
      expect(wrapperMax.find('input').props().maxLength).toBe(2)

      // minLength
      const wrapperMin = mount(<Input minLength={2} />)
      expect(wrapperMin.find('input').props().minLength).toBe(2)
    })
  })
})
