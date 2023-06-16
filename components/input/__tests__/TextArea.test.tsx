import React from 'react'
import { render, mount } from 'enzyme'
// import Icon from '../../icon'
import ConfigProvider from '../../config-provider/index'
import { TextArea, InputSiteTypes, BorderTypes, BorderType } from '../index'
import mountTest from '../../../tests/shared/mountTest'

describe('TextArea', () => {
  // 1. mount test
  mountTest(TextArea)

  // 2. render test
  it('renders correctly', () => {
    expect(render(<TextArea />)).toMatchSnapshot()

    expect(render(<TextArea autoSize={{ minRows: 2, maxRows: 6 }} />)).toMatchSnapshot()

    InputSiteTypes.forEach((type) => {
      expect(render(<TextArea size={type} />)).toMatchSnapshot()
    })
    BorderTypes.forEach((type) => {
      expect(render(<TextArea borderType={type} />)).toMatchSnapshot()
    })
  })

  // 3. warns in component
  it('warns if borderType is wrong', () => {
    const mockWarn = jest.fn()
    jest.spyOn(console, 'warn').mockImplementation(mockWarn)
    const borderType = 'who am I' as any as BorderType
    render(<TextArea borderType={borderType} />)
    expect(mockWarn).toHaveBeenCalledTimes(1)
    expect(mockWarn.mock.calls[0][0]).toMatch(
      "Warning: [kdesign]-textarea: cannot found textarea borderType 'who am I'",
    )
  })

  // 4. render null or undefined without errors
  describe('4. render null or undefined without errors', () => {
    it('render null or undefined without errors', () => {
      const wrapper = (
        <TextArea>
          {null}
          {undefined}
        </TextArea>
      )
      expect(wrapper).toMatchSnapshot()
    })
  })

  // 5. displayName
  it('should have displayName static property', () => {
    const wrapper = mount(<TextArea />)
    expect((wrapper.type() as any).displayName).toBe('TextArea')
  })

  // 6. class state
  it('should class use right', () => {
    // default
    const DefaultInput = mount(<TextArea />)
    expect(DefaultInput.find('.kd-input-textarea')).toHaveClassName('.kd-input-size-middle')
    expect(DefaultInput.find('.kd-input-textarea')).toHaveClassName('.kd-input-underline')

    // disabled
    const DisabledInput = mount(<TextArea disabled />)
    expect(DisabledInput.find('.kd-input-textarea')).toHaveClassName('.kd-input-disabled')

    InputSiteTypes.forEach((size) => {
      const TestButton = mount(<TextArea size={size} />)
      expect(TestButton.find(`.kd-input-textarea`)).toHaveClassName(`.kd-input-size-${size}`)
    })

    BorderTypes.forEach((type) => {
      if (type === 'bordered') return
      const TestButton = mount(<TextArea borderType={type} />)
      expect(TestButton.find(`.kd-input-textarea`)).toHaveClassName(
        `.kd-input-${type === 'none' ? 'borderless' : type}`,
      )
    })

    // allowClear
    const AllowClearInput = mount(<TextArea allowClear />)
    expect(AllowClearInput.find('.kd-input-allowClear-spacing')).toHaveLength(1)
    expect(AllowClearInput.find('.kd-input-textarea-clear-icon')).toHaveLength(1)

    // cannotResize
    const CannotResizeInput = mount(<TextArea canResize={false} />)
    expect(CannotResizeInput.find('.kd-input-no-resize')).toHaveLength(1)

    // style & data-test & className & disabled
    const onClick = jest.fn()
    const otherInput = mount(
      <TextArea style={{ width: 60 }} data-test={'test'} className="my-class" disabled onClick={onClick} />,
    )
    expect(otherInput.find('textarea').props().style?.width).toEqual(60)
    expect(otherInput.find('textarea').prop('data-test')).toEqual('test')
    expect(otherInput.find('textarea')).toHaveClassName('my-class')
    expect(otherInput.find('textarea').props().disabled).toBe(true)
    otherInput.simulate('click')
    expect(onClick).not.toHaveBeenCalled()
  })

  // 7.component interaction(event)
  it('onChange ', () => {
    let value = ''
    const onChange = jest.fn((e) => {
      value = e.target.value
    })
    const wrapper = mount(
      <TextArea style={{ boxSizing: 'border-box' }} onChange={onChange} autoSize={{ minRows: 2, maxRows: 6 }} />,
    )
    wrapper.find('textarea').simulate('change', { target: { value: '12' } })
    expect(onChange).toHaveBeenCalled()
    expect(value).toBe('12')
  })
  it('Focus ', () => {
    const onFocus = jest.fn()
    const wrapper = mount(<TextArea onFocus={onFocus} />)
    wrapper.find('textarea').simulate('focus', { target: { value: '12' } })
    expect(onFocus).toHaveBeenCalled()
  })
  it('Blur ', () => {
    const onBlur = jest.fn()
    const wrapper = mount(<TextArea onBlur={onBlur} />)
    wrapper.find('textarea').simulate('blur', { target: { value: '12' } })
    expect(onBlur).toHaveBeenCalled()
  })
  it('Reset', () => {
    let value = '123'
    const onChange = jest.fn((e) => {
      value = e.target.value
    })
    const wrapper = mount(<TextArea onChange={onChange} allowClear />)
    wrapper.find('.kd-input-textarea-clear-icon').simulate('click')
    expect(onChange).toHaveBeenCalled()
    expect(value).toBe('')
  })
  it('key enter', () => {
    const onKeyUp = jest.fn()
    const wrapper = mount(<TextArea onKeyUp={onKeyUp} />)
    wrapper.find('textarea').simulate('focus')
    wrapper.find('textarea').simulate('keyup', { key: 'Enter' })
    expect(onKeyUp).toHaveBeenCalled()
  })

  // 8.config provider
  it('should config use config provider', () => {
    const buttonConfig = {
      compDefaultProps: {
        TextArea: {
          disabled: true,
        },
      },
    }
    const wrapper = mount(
      <ConfigProvider value={buttonConfig}>
        <TextArea />
      </ConfigProvider>,
    )
    expect(wrapper.find('.kd-input-textarea')).toHaveClassName('.kd-input-disabled')
  })

  // 9. ref test
  it('should get button element from ref', () => {
    const ref = React.createRef()
    mount(<TextArea ref={ref} />)
    expect((ref.current as HTMLElement).classList.contains('kd-input-textarea')).toBe(true)
  })

  // 10. api test
  describe('api test', () => {
    it('value & defaultValue', () => {
      const wrapperDefault = mount(<TextArea defaultValue={'defaultValue'} />)
      expect(wrapperDefault.find('textarea').props().value).toBe('defaultValue')

      let value = 'value'
      const onChange = jest.fn((e) => {
        value = e.target.value
      })
      const wrapperValue = mount(<TextArea defaultValue={'defaultValue'} value={value} onChange={onChange} />)
      expect(wrapperValue.find('textarea').props().value).toBe('value')
      wrapperValue.find('textarea').simulate('change', { target: { value: '12' } })
      expect(onChange).toHaveBeenCalled()
      expect(value).toBe('12')
    })

    it('allowClear', function () {
      let value = '123'
      const onChange = jest.fn((e) => {
        value = e.target.value
      })
      const onBlur = jest.fn()
      const wrapper = mount(<TextArea onChange={onChange} onBlur={onBlur} allowClear />)
      wrapper.find('textarea').simulate('mouseenter')
      wrapper.find('.kd-input-textarea-clear-icon').simulate('click')
      expect(onChange).toHaveBeenCalled()
      expect(onBlur).not.toHaveBeenCalled()
      expect(value).toBe('')
    })

    it('maxLength & minLength', function () {
      // maxLength
      const wrapperMax = mount(<TextArea maxLength={2} />)
      expect(wrapperMax.find('textarea').props().maxLength).toBe(2)

      // minLength
      const wrapperMin = mount(<TextArea minLength={2} />)
      expect(wrapperMin.find('textarea').props().minLength).toBe(2)
    })

    it('count & countPosition', function () {
      // count
      const wrapperCount = mount(<TextArea defaultValue={'defaultValue'} count />)
      wrapperCount.find('textarea').simulate('focus')
      expect(wrapperCount.find('.kd-input-textarea-mark').text()).toBe('12/255')

      // count max
      wrapperCount.setProps({ maxLength: 12 })
      wrapperCount.update()
      wrapperCount.find('textarea').simulate('focus')
      expect(wrapperCount.find('.kd-input-textarea-mark').text()).toBe('12/12')

      // countPosition
      wrapperCount.setProps({ countPosition: 'inner' })
      wrapperCount.update()
      wrapperCount.find('textarea').simulate('focus')
      expect(wrapperCount.find('.kd-input-textarea-mark-inner')).toHaveLength(1)

      // can't keyup
      wrapperCount.find('textarea').simulate('keyDown', { keyCode: 90 })
      expect(wrapperCount.find('textarea').props().value).toBe('defaultValue')
    })

    it('placeholder', () => {
      const wrapper = mount(<TextArea placeholder={'kd'} />)
      expect(wrapper.find('textarea').at(0).props().placeholder).toBe('kd')
    })
  })
})
