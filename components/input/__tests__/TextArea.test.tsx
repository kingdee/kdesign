import React from 'react'
import { render, mount } from 'enzyme'
// import Icon from '../../icon'
import ConfigProvider from '../../config-provider/index'
import { TextArea, BorderTypes, BorderType } from '../index'
// import mountTest from '../../../tests/shared/mountTest'

describe('TextArea', () => {
  // 1.mount test
  // mountTest(TextArea)

  // 2.render test
  it('renders correctly', () => {
    expect(render(<TextArea />)).toMatchSnapshot()
    BorderTypes.forEach((type) => {
      expect(render(<TextArea borderType={type} />)).toMatchSnapshot()
    })
  })

  // 3.warns in component
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

  // 5. displayName
  it('should have displayName static property', () => {
    const wrapper = mount(<TextArea style={{ height: 200 }} />)
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

  // // 9. ref test
  it('should get button element from ref', () => {
    const ref = React.createRef()
    mount(<TextArea ref={ref} />)
    expect(ref.current instanceof HTMLTextAreaElement).toBe(true)
  })
})
