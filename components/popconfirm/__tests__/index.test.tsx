import React from 'react'
import { mount } from 'enzyme'
import Popconfirm from '../index'

describe('Popconfirm', () => {
  it('should have displayName static property', () => {
    const wrapper = mount(<Popconfirm>Text</Popconfirm>)
    expect((wrapper.type() as any).displayName).toBe('Popconfirm')
  })
})
