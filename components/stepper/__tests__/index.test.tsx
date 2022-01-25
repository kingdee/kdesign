import React from 'react'
import { render, mount } from 'enzyme'
import Stepper from '../index'
import { StepTypes } from '../stepper'
import mountTest from '../../../tests/shared/mountTest'

describe('Stepper', () => {
  // 1.mount test
  mountTest(Stepper)
  StepTypes.forEach((type) => {
    mountTest(() => <Stepper type={type} />)
  })

  // 2.render test
  it('renders correctly', () => {
    expect(render(<Stepper />)).toMatchSnapshot()
    StepTypes.forEach((type) => {
      expect(render(<Stepper type={type} />)).toMatchSnapshot()
    })
  })

  // 5. displayName
  it('should have displayName static property', () => {
    const wrapper = mount(<Stepper />)
    expect((wrapper.type() as any).displayName).toBe('Stepper')
  })

  // 6. class state
  it('should class use right', () => {
    const BaseStepInput = mount(<Stepper type="base" />)
    expect(BaseStepInput.find('.kd-inputNumber-baseStep')).toHaveLength(2)
    const EmbedStepInput = mount(<Stepper type="embed" />)
    expect(EmbedStepInput.find('.kd-inputNumber-embedStep')).toHaveLength(1)
  })

  // 7.component interaction(event)
  it('baseStep handleStepChang', () => {
    let value = '0'
    const onChange = jest.fn((e) => {
      value = e.target.value
    })
    const wrapper = mount(<Stepper type="base" onChange={onChange} />)
    wrapper.find('.kd-inputNumber-baseStep').at(0).simulate('mousedown')
    expect(value).toBe('-1')
    wrapper.find('.kd-inputNumber-baseStep').at(1).simulate('mousedown')
    expect(value).toBe('0')
  })

  it('embedStep handleStepChang', () => {
    let value = '0'
    const onChange = jest.fn((e) => {
      value = e.target.value
    })
    const wrapper = mount(<Stepper type="embed" onChange={onChange} />)
    wrapper.find('.kd-inputNumber-embedStep-minus').simulate('mousedown')
    expect(value).toBe('-1')
    wrapper.find('.kd-inputNumber-embedStep-plus').simulate('mousedown')
    expect(value).toBe('0')
  })

  // 9. ref test
  it('should get stepper element from ref', () => {
    const ref = React.createRef()
    mount(<Stepper ref={ref} />)
    expect(ref.current instanceof HTMLInputElement).toBe(true)
  })
})
