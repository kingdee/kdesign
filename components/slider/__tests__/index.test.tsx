import React from 'react'
import { mount } from 'enzyme'
import Slider from '../index'

describe('Slider', () => {
  it('should have displayName static property', () => {
    const wrapper = mount(<Slider>Text</Slider>)
    expect((wrapper.type() as any).displayName).toBe('Slider')
  })
})
