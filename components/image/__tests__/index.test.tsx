import React from 'react'
import { mount, render } from 'enzyme'
import Image from '..'
import mountTest from '../../../tests/shared/mountTest'

const src = 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'

describe('Image', () => {
  mountTest(Image)

  it('renders correctly', () => {
    expect(render(<Image width={42} src={src} />)).toMatchSnapshot()
  })

  it('should have displayName static property', () => {
    const wrapper = mount(<Image>Text</Image>)
    expect((wrapper.type() as any).displayName).toBe('Image')
  })
})
