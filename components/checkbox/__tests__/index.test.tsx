import React from 'react'
import { mount, render } from 'enzyme'
import mountTest from '../../../tests/shared/mountTest'
import Checkbox, { CheckboxSizes, CheckboxTypes } from '../index'
import ConfigProvider from '../../config-provider'
import type { CheckboxSize, CheckboxType } from '../index'
const defaultCheckboxProps = {
  defaultChecked: false,
  indeterminate: false,
  disabled: false,
  onChange: jest.fn(),
}

describe('Checkbox', () => {
  // 1. mount Test
  mountTest(Checkbox)
  mountTest(Checkbox.Group)

  // 2. render test
  it('render test', () => {
    // defaultChecked
    const wrapper = mount(<Checkbox {...defaultCheckboxProps}>Text</Checkbox>)
    expect(wrapper).toMatchSnapshot() // snapshot

    const wrapperGroup = mount(
      <Checkbox.Group>
        <Checkbox {...defaultCheckboxProps}>Text</Checkbox>
      </Checkbox.Group>,
    )
    expect(wrapperGroup).toMatchSnapshot() // snapshot
  })

  // 3.warns in components
  describe('warns in components', () => {
    it('checkbox error Type', () => {
      const mockWarn = jest.fn()
      jest.spyOn(console, 'warn').mockImplementation(mockWarn)
      const shape = 'errorType' as any as CheckboxType
      render(<Checkbox checkboxType={shape} />)
      expect(mockWarn).toHaveBeenCalledTimes(1)
      expect(mockWarn.mock.calls[0][0]).toMatch("Warning: [kdesign]-checkbox: cannot found checkbox type 'errorType'")
    })
    it('checkbox error Size', () => {
      const mockWarn = jest.fn()
      jest.spyOn(console, 'warn').mockImplementation(mockWarn)
      const size = 'errorSize' as any as CheckboxSize
      render(<Checkbox size={size} />)
      expect(mockWarn).toHaveBeenCalledTimes(1)
      expect(mockWarn.mock.calls[0][0]).toMatch("Warning: [kdesign]-checkbox: cannot found size type 'errorSize'")
    })
    it('checkboxGroup: value should be unique', () => {
      const mockWarn = jest.fn()
      jest.spyOn(console, 'warn').mockImplementation(mockWarn)
      mount(
        <Checkbox.Group defaultValue={[1, 1]}>
          <Checkbox value={1} />
          <Checkbox value={2} />
        </Checkbox.Group>,
      )
      expect(mockWarn).toHaveBeenCalledTimes(1)
      expect(mockWarn.mock.calls[0][0]).toMatch(
        "Warning: [kdesign]-checkboxGroup: variable value's value should be unique ",
      )
    })
  })

  // 4. render null or undefined without errors
  it('render null or undefined without errors', () => {
    expect(
      mount(
        <Checkbox>
          {null}
          {undefined}
        </Checkbox>,
      ),
    ).toMatchSnapshot()

    expect(
      mount(
        <Checkbox.Group>
          {null}
          {undefined}
        </Checkbox.Group>,
      ),
    ).toMatchSnapshot()
  })

  // 5. displayName
  it('should have displayName static property', () => {
    const wrapper = mount(
      <Checkbox {...defaultCheckboxProps} checkboxType="default" size="middle">
        Text
      </Checkbox>,
    )
    expect((wrapper.type() as any).displayName).toBe('Checkbox')

    const wrapperGroup = mount(
      <Checkbox.Group>
        <Checkbox {...defaultCheckboxProps} checkboxType="default" size="middle">
          Text
        </Checkbox>
        ,
      </Checkbox.Group>,
    )
    expect((wrapperGroup.type() as any).displayName).toBe('CheckboxGroup')
  })

  // 6. API Test
  describe('API test', () => {
    it('test no text', () => {
      const wrapper = mount(<Checkbox {...defaultCheckboxProps} checkboxType="default" size="middle"></Checkbox>)
      expect(wrapper.find('.kd-checkbox-no-child').length).toBe(1)
    })

    it('test CheckboxTypes', () => {
      // checkboxType
      CheckboxTypes.forEach((type: CheckboxType) => {
        const wrapper = mount(
          <Checkbox checkboxType={type} {...defaultCheckboxProps}>
            Text
          </Checkbox>,
        )
        expect(wrapper.find(`.kd-checkbox`)).toHaveClassName(`kd-checkbox-${type}`)
      })
    })

    it('test CheckboxSizes', () => {
      CheckboxSizes.forEach((size: CheckboxSize) => {
        const wrapper = mount(
          <Checkbox size={size} {...defaultCheckboxProps} checkboxType="default">
            Text
          </Checkbox>,
        )
        expect(wrapper.find(`.kd-checkbox`)).toHaveClassName(`kd-checkbox-${size}`)
      })
    })

    it('test checked', () => {
      const wrapper = mount(
        <Checkbox size={'middle'} checked {...defaultCheckboxProps} checkboxType="default">
          Text
        </Checkbox>,
      )
      expect(wrapper.find(`.kd-checkbox-input`)).toBeChecked()
      wrapper.setProps({ checked: false })
      expect((wrapper.find(`.kd-checkbox-input`).getDOMNode() as any).checked).toBe(false)
    })

    it('test disabled when checkbox is checked', () => {
      // disabled
      const wrapper = mount(
        <Checkbox size={'middle'} checked {...defaultCheckboxProps} checkboxType="default" disabled>
          Text
        </Checkbox>,
      )
      expect(wrapper.find(`.kd-checkbox-default-disabled`).length).toBe(1)
      expect(wrapper.find(`.kd-checkbox-default-checked-disabled`).length).toBe(1)
      wrapper.setProps({ checkboxType: 'square' })
      expect(wrapper.find(`.kd-checkbox-square-disabled`).length).toBe(1)
      expect(wrapper.find(`.kd-checkbox-square-checked-disabled`).length).toBe(1)
      expect(wrapper.find(`.kd-checkbox-square-triangle-disabled`).length).toBe(1)
    })

    it('test disabled when checkbox is not checked', () => {
      const wrapper = mount(
        <Checkbox size={'middle'} {...defaultCheckboxProps} checkboxType="default" disabled>
          Text
        </Checkbox>,
      )
      expect(wrapper.find(`.kd-checkbox-default-disabled`).length).toBe(2)
      expect(wrapper.find(`.kd-checkbox-default-checked-disabled`).length).toBe(0)
      wrapper.setProps({ checkboxType: 'square' })
      expect(wrapper.find(`.kd-checkbox-square-disabled`).length).toBe(2)
      expect(wrapper.find(`.kd-checkbox-square-checked-disabled`).length).toBe(0)
      expect(wrapper.find(`.kd-checkbox-square-triangle-disabled`).length).toBe(1)
    })

    it('test indeterminate', () => {
      const wrapper = mount(
        <Checkbox size={'middle'} {...defaultCheckboxProps} checkboxType="default" indeterminate>
          Text
        </Checkbox>,
      )
      expect(wrapper.find(`.kd-checkbox-default-indeterminate`).length).toBe(1)
    })

    it('test onChange callback', () => {
      const onChange = jest.fn((e) => {
        expect(e.target.checked).toEqual(true)
      })
      const wrapper = mount(
        <Checkbox checkboxType="default" onChange={onChange}>
          Text
        </Checkbox>,
      )
      wrapper
        .find(`.kd-checkbox-input`)
        .at(0)
        .simulate('change', { target: { checked: true } }) // to be true
    })

    // defaultChecked Checked
    it('should display checked when both checked and defaultChecked exist', () => {
      const wrapper = mount(<Checkbox checked={true} defaultChecked={false} />)
      expect(wrapper.find('.kd-checkbox-input').at(0)).toBeChecked()
    })

    it('should change value when component change', () => {
      const onChange = jest.fn()
      const wrapper = mount(<Checkbox defaultChecked={false} onChange={onChange} />)
      wrapper
        .find('.kd-checkbox-input')
        .at(0)
        .simulate('change', { target: { checked: true } })
      expect(wrapper.find('.kd-checkbox-input').at(0)).toBeChecked()
    })

    it('should not change value when component controlled by `checked` props', () => {
      const wrapper = mount(<Checkbox checked={false} />)
      const dom = wrapper.find('.kd-checkbox-input')
      expect(wrapper).not.toBeChecked()
      dom.simulate('change', { target: { checked: true } })
      expect(wrapper).not.toBeChecked()
    })

    it('should change value when component controlled by `checked` props & onChange set `checked`', () => {
      const changeValue = false
      const onChange = jest.fn((e) => {
        wrapper.setProps({ checked: e.target.checked })
      })
      const wrapper = mount(<Checkbox checked={changeValue} onChange={onChange} />)
      const dom = wrapper.find('.kd-checkbox-input').at(0)
      dom.simulate('change', { target: { checked: true } })
      expect(wrapper.find('.kd-checkbox-input').at(0)).toBeChecked()
    })

    // checkbox group test
    it('test checkbox group props can effect in checkbox', () => {
      const wrapper = mount(
        <Checkbox.Group checkboxType="square" defaultValue={[1]} disabled name="kd_checked" size="small">
          <Checkbox value={1}>Option A</Checkbox>
          <Checkbox value={2}>Option B</Checkbox>
          <Checkbox value={3}>Option C</Checkbox>
        </Checkbox.Group>,
      )
      expect(wrapper.find('.kd-checkbox').length).toBe(3)
      expect(wrapper.find('.kd-checkbox-input').at(0)).toBeChecked() // defalutValue
      wrapper.find('.kd-checkbox').forEach((checkbox) => {
        expect(checkbox).toHaveClassName('kd-checkbox-square')
        expect(checkbox).toHaveClassName('kd-checkbox-square-disabled')
        expect(checkbox).toHaveClassName('kd-checkbox-small')
        expect(checkbox.find('.kd-checkbox-input').getDOMNode().getAttribute('name')).toEqual('kd_checked')
      })
    })

    it('checkbox group change Value ', () => {
      const value = [1]
      const onChange = jest.fn((checkedValue) => {
        expect(checkedValue).toEqual([1, 2])
      })
      const wrapper = mount(
        <Checkbox.Group onChange={onChange} defaultValue={value} checkboxType="default">
          <Checkbox value={1}>Option A</Checkbox>
          <Checkbox value={2}>Option B</Checkbox>
          <Checkbox value={3}>Option C</Checkbox>
        </Checkbox.Group>,
      )
      expect(wrapper.find('.kd-checkbox-input').at(0)).toBeChecked()
      const dom = wrapper.find('.kd-checkbox-input').at(1)
      dom.simulate('change', { target: { checked: true } }) // onChange checked
    })

    it('checkbox group should display value when both value and defaultValue exist ', () => {
      const wrapper = mount(
        <Checkbox.Group value={[3]} defaultValue={[1, 2]} checkboxType="default">
          <Checkbox value={1}>Option A</Checkbox>
          <Checkbox value={2}>Option B</Checkbox>
          <Checkbox value={3}>Option C</Checkbox>
        </Checkbox.Group>,
      )
      expect(wrapper.find('.kd-checkbox-input').at(0)).not.toBeChecked()
      expect(wrapper.find('.kd-checkbox-input').at(1)).not.toBeChecked()
      expect(wrapper.find('.kd-checkbox-input').at(2)).toBeChecked()
    })

    it('group should not change value when component controlled by `value` props', () => {
      const onChange = jest.fn()
      const wrapper = mount(
        <Checkbox.Group onChange={onChange} value={[1]} checkboxType="default">
          <Checkbox value={1}>Option A</Checkbox>
          <Checkbox value={2}>Option B</Checkbox>
          <Checkbox value={3}>Option C</Checkbox>
        </Checkbox.Group>,
      )
      const dom = wrapper.find('.kd-checkbox-input').at(1)
      dom.simulate('change', { target: { checked: true } })
      expect(wrapper.find('.kd-checkbox-input').at(1)).not.toBeChecked()
    })

    it('group should change value when component controlled by `value` props & onChange set `value`', () => {
      const value = [1]
      const onChange = jest.fn((changeValue) => {
        wrapper.setProps({ value: changeValue })
      })
      const wrapper = mount(
        <Checkbox.Group onChange={onChange} value={value} checkboxType="default">
          <Checkbox value={1}>Option A</Checkbox>
          <Checkbox value={2}>Option B</Checkbox>
          <Checkbox value={3}>Option C</Checkbox>
        </Checkbox.Group>,
      )
      const dom = wrapper.find('.kd-checkbox-input').at(1)
      dom.simulate('change', { target: { checked: true } })
      expect(wrapper.find('.kd-checkbox-input').at(0)).toBeChecked()
      expect(wrapper.find('.kd-checkbox-input').at(1)).toBeChecked()
    })
  })

  // 7. class or style state
  it('class or style state', () => {
    const wrapper = mount(<Checkbox className="test-checkbox" data-test="test" style={{ color: 'red' }} />)
    expect(wrapper).toHaveClassName('test-checkbox')
    expect(wrapper).toHaveStyle({ color: 'red' })
    expect(wrapper.find('.kd-checkbox').prop('data-test')).toEqual('test')
    const wrapperGroup = mount(
      <Checkbox.Group className="test-checkbox-group" data-test="test" style={{ color: 'red' }}>
        <Checkbox />
      </Checkbox.Group>,
    )
    expect(wrapperGroup).toHaveClassName('test-checkbox-group')
    expect(wrapperGroup).toHaveStyle({ color: 'red' })
    expect(wrapperGroup.find('.kd-checkbox-group').prop('data-test')).toEqual('test')
  })
  // 8. component interaction(event)
  // 9.config Provider
  describe('config Provider', () => {
    it('checkbox config provider', () => {
      const checkboxConfig = {
        compDefaultProps: {
          Checkbox: {
            checkboxType: 'square',
          },
        },
      }
      const wrapper = mount(
        <ConfigProvider value={checkboxConfig}>
          <Checkbox></Checkbox>
        </ConfigProvider>,
      )
      expect(wrapper.find('.kd-checkbox')).toHaveClassName('.kd-checkbox-square')
    })

    // it('checkboxgroup config provider', () => {
    //   const checkboxConfig = {
    //     compDefaultProps: {
    //       CheckboxGroup: {
    //         checkboxType: 'square',
    //       },
    //     },
    //   }
    //   const wrapper = mount(
    //     <ConfigProvider value={checkboxConfig}>
    //       <Checkbox.Group>
    //         <Checkbox></Checkbox>
    //       </Checkbox.Group>
    //     </ConfigProvider>,
    //   )
    //   expect(wrapper.find('.kd-checkbox-group .kd-checkbox').at(0)).toHaveClassName('.kd-checkbox-square')
    // })
  })
  // 10. ref test
  // 11. special case
})
