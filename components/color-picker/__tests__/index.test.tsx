import React from 'react'
import { mount } from 'enzyme'
import ColorPicker from '../index'

describe('ColorPicker', () => {
  it('should have displayName static property', () => {
    const wrapper = mount(<ColorPicker>Text</ColorPicker>)
    expect((wrapper.type() as any).displayName).toBe('ColorPicker')
  })
})
