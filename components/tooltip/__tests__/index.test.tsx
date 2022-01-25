import React from 'react'
import { mount } from 'enzyme'
import Tooltip from '../index'

describe('Tooltip', () => {
  it('should have displayName static property', () => {
    const wrapper = mount(
      <Tooltip tip="tips text">
        <span>text</span>
      </Tooltip>,
    )
    expect((wrapper.type() as any).displayName).toBe('Tooltip')
  })
})
