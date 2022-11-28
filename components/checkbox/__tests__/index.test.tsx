import React from 'react'
import { mount } from 'enzyme'
import mountTest from '../../../tests/shared/mountTest'
import Checkbox, { CheckboxSizes, CheckboxTypes } from '../index'
import type { CheckboxSize, CheckboxType } from '../index'
const defaultCheckboxProps = {
  defaultChecked: false,
  // checkboxType: 'default',
  indeterminate: false,
  disabled: false,
  onChange: jest.fn(),
  // size: 'middle',
}

const defaultCheckboxGroupProps = {
  checkboxType: 'default',
  disabled: false,
  onChange: jest.fn(),
}

const optionsWithDisabled = [
  { label: 'Apple', value: 'Apple' },
  { label: 'Pear', value: 'Pear' },
  { label: 'Orange', value: 'Orange', disabled: true },
]

describe('Checkbox', () => {
  mountTest(Checkbox)
  it('should have displayName static property', () => {
    const wrapper = mount(
      <Checkbox {...defaultCheckboxProps} checkboxType="default" size="middle">
        Text
      </Checkbox>,
    )
    expect((wrapper.type() as any).displayName).toBe('Checkbox')
  })
  it('test no text', () => {
    const wrapper = mount(<Checkbox {...defaultCheckboxProps} checkboxType="default" size="middle"></Checkbox>)
    expect(wrapper.find('.kd-checkbox-no-child').length).toBe(1)
  })

  it('test CheckboxTypes', () => {
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
    expect((wrapper.find(`.kd-checkbox-input`).getDOMNode() as any).checked).toBe(true)
    wrapper.setProps({ checked: false })
    expect((wrapper.find(`.kd-checkbox-input`).getDOMNode() as any).checked).toBe(false)
  })

  it('test disabled when checkbox is checked', () => {
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
    const wrapper = mount(
      <Checkbox size={'middle'} {...defaultCheckboxProps} checkboxType="default" indeterminate>
        Text
      </Checkbox>,
    )
    wrapper.find(`.kd-checkbox-input`).simulate('click')
    // expect(defaultCheckboxProps.onChange).toHaveBeenCalled()
    // expect((wrapper.find('.kd-checkbox-input').getDOMNode() as any).checked).toBe(true)
  })

  it('test checkbox group setting by children ', () => {
    const value = [1]
    const wrapper = mount(
      <Checkbox.Group
        {...defaultCheckboxGroupProps}
        onChange={defaultCheckboxGroupProps.onChange}
        value={value}
        checkboxType="default"
      >
        <Checkbox value={1}>Option A</Checkbox>
        <Checkbox value={2}>Option B</Checkbox>
        <Checkbox value={3}>Option C</Checkbox>
      </Checkbox.Group>,
    )
    expect(wrapper.find('.kd-checkbox').length).toBe(3)
    expect((wrapper.find('.kd-checkbox-input').at(0).getDOMNode() as any).checked).toBe(true)
    const dom = wrapper.find('.kd-checkbox').at(0)
    dom.simulate('click')
    // expect((wrapper.find('.kd-checkbox-input').at(0).getDOMNode() as any).checked).toBe(false)
    // expect(defaultCheckboxProps.onChange).toHaveBeenCalled()
  })

  it('test checkbox group setting by options', () => {
    const value = ['Apple', 'Orange']
    const wrapper = mount(
      <Checkbox.Group options={optionsWithDisabled} onChange={defaultCheckboxGroupProps.onChange} value={value} />,
    )
    expect(wrapper.find('.kd-checkbox').length).toBe(3)
    expect((wrapper.find('.kd-checkbox-input').at(0).getDOMNode() as any).checked).toBe(true)
    const dom = wrapper.find('.kd-checkbox').at(0)
    dom.simulate('click')
    // expect((wrapper.find('.kd-checkbox-input').at(0).getDOMNode() as any).checked).toBe(false)
    // expect(defaultCheckboxProps.onChange).toHaveBeenCalled()
  })
})
