import React from 'react'
import { mount } from 'enzyme'
import BaseData from '../index'

describe('BaseData', () => {
  it('should have displayName static property', () => {
    const wrapper = mount(<BaseData />)
    expect((wrapper.type() as any).displayName).toBe('BaseData')
  })
})
