import React from 'react'
import { mount, render } from 'enzyme'
import Radio, { Group, Button } from '..'
import focusTest from '../../../tests/shared/focusTest'
import mountTest from '../../../tests/shared/mountTest'

describe('Radio', () => {
  focusTest(Radio, { refFocus: true })
  mountTest(Radio)
  mountTest(Group)
  mountTest(Button)

  it('should render correctly', () => {
    const wrapper = render(
      <Radio className="customized" style={{ color: 'red' }} radioType="square" prefixCls="myPrefix">
        Test
      </Radio>,
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('responses change events', () => {
    const onChange = jest.fn()

    const wrapper = mount(<Radio onChange={onChange}>Test</Radio>)

    wrapper.find('.kd-radio-input').simulate('change')
    expect(onChange).toHaveBeenCalled()
  })

  it('should have displayName static property', () => {
    const wrapper = mount(<Radio />)
    expect((wrapper.type() as any).displayName).toBe('Radio')
  })
})
