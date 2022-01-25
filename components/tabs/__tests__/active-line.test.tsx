import React from 'react'
import { render, mount } from 'enzyme'
import mountTest from '../../../tests/shared/mountTest'
import Line from '../active-line'

describe('Tabs Active Line', () => {
  mountTest(Line)

  it('renders correctly', () => {
    const wrapper = render(<Line left={0} width={100} />)
    expect(wrapper).toMatchSnapshot()
  })

  it('should have displayName static property', () => {
    const wrapper = mount(<Line left={0} width={100} />)
    expect((wrapper.type() as any).displayName).toBe('Line')
  })
})
