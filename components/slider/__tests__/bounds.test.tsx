import React from 'react'
import { mount } from 'enzyme'
import { act } from 'react-dom/test-utils'
import Slider from '../index'

describe('Slider bounds changes during dragging', () => {
  it.each([
    { before: 80, min: 0, max: 60, expected: 60 },
    { before: 20, min: 40, max: 100, expected: 40 },
  ])('commits within current bounds', ({ before, min, max, expected }) => {
    const onAfterChange = jest.fn()
    const wrapper = mount(<Slider defaultValue={50} onAfterChange={onAfterChange} />)
    const root = wrapper.find('.kd-slider').getDOMNode() as HTMLElement
    root.getBoundingClientRect = () =>
      ({ left: 0, top: 0, right: 100, bottom: 20, width: 100, height: 20 } as DOMRect)
    wrapper.find('.kd-slider').simulate('mouseDown', { pageX: 50, clientX: 50, target: root })
    act(() => { document.dispatchEvent(new MouseEvent('mousemove', { clientX: before, bubbles: true })) })
    wrapper.setProps({ min, max })
    act(() => { document.dispatchEvent(new MouseEvent('mouseup', { clientX: before, bubbles: true })) })
    expect(onAfterChange).toHaveBeenLastCalledWith(expected)
    wrapper.unmount()
  })
})
