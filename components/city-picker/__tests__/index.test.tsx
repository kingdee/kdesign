import React from 'react'
import { mount } from 'enzyme'
import CityPicker from '../index'

describe('CityPicker', () => {
  it('should have displayName static property', () => {
    const wrapper = mount(<CityPicker>Text</CityPicker>)
    expect((wrapper.type() as any).displayName).toBe('CityPicker')
  })
})
