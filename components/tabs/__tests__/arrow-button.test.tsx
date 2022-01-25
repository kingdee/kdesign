import React from 'react'
import { render, mount } from 'enzyme'
import mountTest from '../../../tests/shared/mountTest'
import ArrowButton from '../arrow-button'

describe('Tabs Arrow Button', () => {
  mountTest(ArrowButton)

  it('renders correctly', () => {
    const leftWrapper = render(<ArrowButton direction="left" />)
    const rightWrapper = render(<ArrowButton direction="right" />)
    expect(leftWrapper).toMatchSnapshot()
    expect(rightWrapper).toMatchSnapshot()
  })

  it('should clickable', () => {
    const onClickLeft = jest.fn()
    const onClickRight = jest.fn()
    const leftWrapper = mount(<ArrowButton direction="left" onClick={onClickLeft} />)
    const rightWrapper = mount(<ArrowButton direction="right" onClick={onClickRight} />)
    leftWrapper.find('.kd-arrow-button-left').simulate('click')
    rightWrapper.find('.kd-arrow-button-right').simulate('click')
    expect(onClickLeft).toHaveBeenCalled()
    expect(onClickRight).toHaveBeenCalled()
  })

  it('should have displayName static property', () => {
    const wrapper = mount(<ArrowButton direction="left" />)
    expect((wrapper.type() as any).displayName).toBe('ArrowButton')
  })
})
