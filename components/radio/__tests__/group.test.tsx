import React from 'react'
import { mount, render } from 'enzyme'
import Radio from '..'
import RadioGroup from '../group'
import RadioButton from '../radio-button'

describe('Radio Group', () => {
  function createRadioGroup(props = {}) {
    return (
      <RadioGroup {...props}>
        <Radio value="A">A</Radio>
        <Radio value="B">B</Radio>
        <Radio value="C">C</Radio>
      </RadioGroup>
    )
  }

  function createRadioGroupByOption(props = {}) {
    const options = [
      { label: 'A', value: 'A' },
      { label: 'B', value: 'B' },
      { label: 'C', value: 'C' },
    ]

    return <RadioGroup {...props} options={options} />
  }

  it('fire change events when value changes', () => {
    const onChange = jest.fn()

    const wrapper = mount(
      createRadioGroup({
        onChange,
      }),
    )
    const radios = wrapper.find('input')

    // controlled component
    wrapper.setProps({ value: 'A' })
    radios.at(1).simulate('change')
    expect(onChange.mock.calls.length).toBe(1)
  })

  it('both of radio and radioGroup will trigger onchange event when they exists', () => {
    const onChange = jest.fn()
    const onChangeRadioGroup = jest.fn()

    const wrapper = mount(
      <RadioGroup onChange={onChangeRadioGroup}>
        <Radio value="A" onChange={onChange}>
          A
        </Radio>
        <Radio value="B" onChange={onChange}>
          B
        </Radio>
        <Radio value="C" onChange={onChange}>
          C
        </Radio>
      </RadioGroup>,
    )
    const radios = wrapper.find('input')

    // controlled component
    wrapper.setProps({ value: 'A' })
    radios.at(1).simulate('change')
    expect(onChange.mock.calls.length).toBe(1)
  })

  it('Trigger onChange when both of radioButton and radioGroup exists', () => {
    const onChange = jest.fn()

    const wrapper = mount(
      <RadioGroup onChange={onChange}>
        <RadioButton value="A">A</RadioButton>
        <RadioButton value="B">B</RadioButton>
        <RadioButton value="C">C</RadioButton>
      </RadioGroup>,
    )
    const radios = wrapper.find('input')

    // controlled component
    wrapper.setProps({ value: 'A' })
    radios.at(1).simulate('change')
    expect(onChange.mock.calls.length).toBe(1)
  })

  it('should only trigger once when in group with options', () => {
    const onChange = jest.fn()
    const options = [{ label: 'Bamboo', value: 'Bamboo' }]
    const wrapper = mount(<RadioGroup options={options} onChange={onChange} />)

    wrapper.find('input').simulate('change')
    expect(onChange).toHaveBeenCalledTimes(1)
  })

  it("won't fire change events when value not changes", () => {
    const onChange = jest.fn()

    const wrapper = mount(
      createRadioGroup({
        onChange,
      }),
    )
    const radios = wrapper.find('input')

    // controlled component
    wrapper.setProps({ value: 'A' })
    radios.at(0).simulate('change')
    expect(onChange.mock.calls.length).toBe(0)
  })

  it('optional should correct render', () => {
    const wrapper = mount(createRadioGroupByOption())
    const radios = wrapper.find('input')

    expect(radios.length).toBe(3)
  })

  it('all children should have a name property', () => {
    const GROUP_NAME = 'radiogroup'
    const wrapper = mount(createRadioGroup({ name: GROUP_NAME }))

    wrapper.find('input[type="radio"]').forEach((el) => {
      expect(el.props().name).toEqual(GROUP_NAME)
    })
  })

  it('passes prefixCls down to radio', () => {
    const options = [
      { label: 'Apple', value: 'Apple' },
      { label: 'Orange', value: 'Orange', style: { fontSize: 12 } },
    ]

    const wrapper = render(<RadioGroup prefixCls="my-radio" options={options} />)

    expect(wrapper).toMatchSnapshot()
  })

  it('should forward ref', () => {
    let radioGroupRef
    const wrapper = mount(
      createRadioGroupByOption({
        ref: (ref: HTMLDivElement) => {
          radioGroupRef = ref
        },
      }),
    )

    expect(radioGroupRef).toBe(wrapper.children().getDOMNode())
  })

  describe('value is null or undefined', () => {
    it('use `defaultValue` when `value` is undefined', () => {
      const options = [{ label: 'Bamboo', value: 'bamboo' }]
      const wrapper = mount(<RadioGroup defaultValue="bamboo" value={undefined} options={options} />)
      expect(wrapper.find('.kd-radio').hasClass('kd-radio-checked')).toBe(true)
    })

    new Array([undefined, null]).forEach((newValue) => {
      it(`should set value back when value change back to ${newValue}`, () => {
        const options = [{ label: 'Bamboo', value: 'bamboo' }]
        const wrapper = mount(<RadioGroup value="bamboo" options={options} />)
        expect(wrapper.find('.kd-radio').hasClass('kd-radio-checked')).toBe(true)
        wrapper.setProps({ value: newValue })
        wrapper.update()
        expect(wrapper.find('.kd-radio').hasClass('kd-radio-checked')).toBe(false)
      })
    })
  })
  // api test
  describe('10.api test', () => {
    it('api test', () => {
      // defaultValue
      const options = [{ label: 'Bamboo', value: 'bamboo' }]
      const defaultValueRadioGroup = mount(<RadioGroup defaultValue="bamboo" options={options} />)
      expect(defaultValueRadioGroup.find('.kd-radio').hasClass('kd-radio-checked')).toBe(true)
      // disabled
      const disabledRadioGroup = mount(
        <Radio.Group name="radiogroup" disabled options={['Apple', 'Pear', 'Orange']}></Radio.Group>,
      )
      expect(disabledRadioGroup.find(`.kd-radio`).at(0)).toHaveClassName(`.kd-radio-disabled`)
      expect(disabledRadioGroup.find(`.kd-radio`).at(1)).toHaveClassName(`.kd-radio-disabled`)
      expect(disabledRadioGroup.find(`.kd-radio`).at(2)).toHaveClassName(`.kd-radio-disabled`)
      // name
      expect(disabledRadioGroup.find(`.kd-radio`).at(0).find('input').prop('name')).toEqual(`radiogroup`)
      expect(disabledRadioGroup.find(`.kd-radio`).at(1).find('input').prop('name')).toEqual(`radiogroup`)
      expect(disabledRadioGroup.find(`.kd-radio`).at(2).find('input').prop('name')).toEqual(`radiogroup`)
      // size
    })
  })
})
