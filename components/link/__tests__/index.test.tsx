import React from 'react'
import { mount } from 'enzyme'
import Link from '../index'

describe('Link', () => {
  it('should have displayName static property', () => {
    const wrapper = mount(<Link>Text</Link>)
    expect((wrapper.type() as any).displayName).toBe('Link')
  })
})
