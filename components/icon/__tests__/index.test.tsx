import React from 'react'
import { mount, render } from 'enzyme'
import Icon from '../index'
import matchMediaPolyfill from 'mq-polyfill'

beforeAll(() => {
  matchMediaPolyfill(window)
  window.resizeTo = function resizeTo(width, height) {
    Object.assign(this, {
      innerWidth: width,
      innerHeight: height,
      outerWidth: width,
      outerHeight: height,
    }).dispatchEvent(new this.Event('resize'))
  }
})

describe('Icon', () => {
  it('should render Icon', () => {
    const wrapper = render(<Icon type="add" />)
    expect(wrapper).toMatchSnapshot()
  })

  it('when className is kingdee', () => {
    const wrapper = mount(<Icon type="add" className="kingdee" />)
    console.log('wrapper', wrapper.find('i').first())
    expect(wrapper.find('i').first()).toHaveClassName('kingdee')
  })

  it('when prefix is kd', () => {
    const wrapper = mount(<Icon type="add" prefix="kd" />)
    expect(wrapper.find('i').first()).toHaveClassName('kd-add')
  })

  it('when rotate is 90', () => {
    const wrapper = mount(<Icon type="add" rotate={90} />)
    expect(wrapper.find('i').first()).toHaveStyle({ transform: 'rotate(90deg)' })
  })

  it('when spin	is true ', () => {
    const wrapper = mount(<Icon type="add" spin={true} />)
    expect(wrapper.find('i').first()).toHaveClassName('icon-spin')
  })

  it('when style is color:red ', () => {
    const wrapper = mount(<Icon type="add" style={{ color: 'red' }} />)
    expect(wrapper.find('i').first()).toHaveStyle({ color: 'red' })
  })
})
