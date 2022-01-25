import React from 'react'
import { mount } from 'enzyme'
import Upload from '../index'

describe('Upload', () => {
  it('should have displayName static property', () => {
    const wrapper = mount(<Upload>Text</Upload>)
    expect((wrapper.type() as any).displayName).toBe('Upload')
  })
})
