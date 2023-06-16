import React from 'react'
import { mount, render } from 'enzyme'
import Icon from '../index'
import { IconTypes } from '../interface'
import ConfigProvider from '../../config-provider/index'

import matchMediaPolyfill from 'mq-polyfill'
import mountTest from '../../../tests/shared/mountTest'

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
  // 1. mount test
  describe('1. mount test', () => {
    mountTest(Icon)
    IconTypes.forEach((type) => {
      mountTest(() => <Icon type={type} />)
    })
  })

  // 2.render test
  describe('2. render test', () => {
    it('should render Icon', () => {
      const wrapper = render(<Icon type="add" />)
      expect(wrapper).toMatchSnapshot()
    })
  })

  // 3.warns in component

  // 4. render null or undefined without errors
  describe('4. render null or undefined without errors', () => {
    it('render null or undefined without errors', () => {
      expect(
        mount(
          <Icon type="add">
            {null}
            {undefined}
          </Icon>,
        ).find('.kdicon'),
      ).toMatchSnapshot()
    })
  })

  // 5. displayName
  it('should have displayName static property', () => {
    expect(Icon.displayName).toBe('Icon')
  })

  // 6. api test
  describe('api test', () => {
    it('when className is kingdee', () => {
      const wrapper = mount(<Icon type="add" className="kingdee" />)
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

    it('when spin	is true', () => {
      const wrapper = mount(<Icon type="add" spin={true} />)
      expect(wrapper.find('i').first()).toHaveClassName('icon-spin')
    })

    it('when style is color:red', () => {
      const wrapper = mount(<Icon type="add" style={{ color: 'red' }} />)
      expect(wrapper.find('i').first()).toHaveStyle({ color: 'red' })
    })

    it('data-test style className', () => {
      const wrapper = mount(<Icon type="add" data-test="icon-test" style={{ padding: 0 }} className="my-className" />)
      expect(wrapper.find('[data-test="icon-test"]')).toExist()
      expect(wrapper.find('.kdicon.kdicon-add')).toHaveStyle('padding', 0)
      expect(wrapper.find('.kdicon.my-className.kdicon-add')).toExist()
    })
  })

  // 7.component interaction(event)

  // 8.config provider
  describe('8.config provider', () => {
    it('should config use config provider', () => {
      const Config = {
        compDefaultProps: {
          Icon: {
            prefix: 'kingdeeicon',
          },
        },
      }
      const wrapper = mount(
        <ConfigProvider value={Config}>
          <Icon type="add" />
        </ConfigProvider>,
      )
      expect(wrapper.find('.kingdeeicon-add')).toExist()
    })
  })

  // 9. ref test
  // it('should get Icon element from ref', () => {
  //   const ref = React.createRef()
  //   mount(<Icon ref={ref} type="add"></Icon>)
  //   expect(ref.current instanceof HTMLSpanElement).toBe(true)
  // })
})
