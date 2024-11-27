import React from 'react'
import { render, mount } from 'enzyme'
import mountTest from '../../../tests/shared/mountTest'
import Line from '../line'

describe('Progress Line', () => {
  mountTest(Line)

  it('renders correctly', () => {
    expect(render(<Line />)).toMatchSnapshot()
  })

  it('should have displayName static property', () => {
    const wrapper = mount(<Line />)
    expect((wrapper.type() as React.ComponentType).displayName).toBe('Line')
  })
})
