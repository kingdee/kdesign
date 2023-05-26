import React from 'react'
import { mount, render } from 'enzyme'
import Image from '..'
import mountTest from '../../../tests/shared/mountTest'
import Icon from '../../icon'

const src = 'https://kui.kingdee.com/assets/image/img02.jpg'

describe('Image', () => {
  mountTest(Image)

  it('renders correctly', () => {
    expect(render(<Image width={42} src={src} />)).toMatchSnapshot()
  })

  it('should have displayName static property', () => {
    const wrapper = mount(<Image>Text</Image>)
    expect((wrapper.type() as any).displayName).toBe('Image')
  })

  it('should not show preview when preview is false', () => {
    const wrapper = mount(<Image src={src} preview={false} />)
    wrapper.simulate('click')
    expect(wrapper.find('.kd-image-preview')).toHaveLength(0)
  })

  it('should show fallback when image fails to load', () => {
    const src = 'error'
    const fallback = 'https://kui.kingdee.com/assets/image/img02.jpg'
    const wrapper = mount(<Image width={142} src={src} fallback={fallback} />)
    expect(wrapper.find('img')).toHaveLength(1)
    // console.log(wrapper.debug())
    // console.dir(wrapper.find('img').props())
    wrapper.find('img').simulate('load')
    setTimeout(() => {
      expect(wrapper.find('img').props().src).toEqual(fallback)
      wrapper.unmount()
    }, 0)
  })

  it('renders operations', () => {
    const operations = [
      <Icon
        key="1"
        title="下载"
        type="download"
        onClick={() => {
          //
        }}
      />,
      <Icon
        key="2"
        title="删除"
        type="del"
        onClick={() => {
          //
        }}
      />,
    ]
    const wrapper = mount(
      <Image
        width={142}
        operations={operations}
        src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAAoHBwgHBgoICAgLCgoLDhgQDg0NDh0VFhEYIx8lJCIfIiEmKzcvJik0KSEiMEExNDk7Pj4+JS5ESUM8SDc9Pjv/2wBDAQoLCw4NDhwQEBw7KCIoOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozv/wAARCADDAMIDASIAAhEBAxEB/8QAGgABAAMBAQEAAAAAAAAAAAAAAAEDBAIFB//EACwQAQACAQIEBAYCAwAAAAAAAAABAgMEERIhMZFRUnGBExQzQUJhIjIjYqH/xAAVAQEBAAAAAAAAAAAAAAAAAAAAAf/EABYRAQEBAAAAAAAAAAAAAAAAAAARAf/aAAwDAQACEQMRAD8A+wgKgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACvNmjFWJ23mekM86y/2rV3rI5Un1ZVF06vJ/rHsidTln8tvZUAsnPln85XaWb3m1rWmduW0yyrdNk4Mu09Lcgac+T4eKZjrPKGX5jL55a9RTjw2j7xzhgMFnzOXz/wDIT81l8Y7Ktp2325ALvmsv67LcGonJfgtEc+kwyLdN9evuDcAgAAAAAAAAAAAAz6z6cT+2Rt1Uf4fdiXAAEHeGnHlrHcpives2rXeIX6OsbWt9+gq7LeMeObT7MWCkXyxE9FmqvM5OD7VU1tNLRaOsA9HaIjbbkxamkUy/x5RMb7LY1ldudJ3Z8l5yXm0g5XaX63spXaT60+gjaAigAAAAAAAAAAAKtTG+C3swt+eN8NvRgXAWYcU5beFY6y5x45y24Y958G+lIpWK1jlAJiIrEREbRCIpFbzaOW/WHQgyayu14t4wzvRyUjJSayx1097ZJpMbbdZUVxW1t9omdvBD0aUrjrw1hn1GDbe9I5feCjMv0f1Z9FDRo/729AawEAAAAAAAAAAAAHOSN8Vo/UvOiOK0R4y9K0b1mPGHmrg9DHjjFThj3nxdvN4rT+U90EHozesdbR3TF62/raJ9Jea0aWeV6x/aY5EGn4lPPXunjr5o7vN6SEHpbx4wl5gQXanFGO0TXpb7O9H1v7M2+7Vo45Xn0BpAQAAAAAAAAAAAAFdsGK07zSN1gCuMGKPwh1GLHH4V7OgERWsdIjskANkcNfCOyQHPBTyV7I+Fj8lezsBx8HH5I7OoiKxtEbR+kgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/2Q=="
      />,
    )

    wrapper.find('img').simulate('load')
    setTimeout(() => {
      wrapper.find('.kd-image').simulate('mouseenter')
      wrapper.update()
      console.log(wrapper.debug())
      console.log(wrapper.html())
      expect(wrapper.find('.kd-image-action').first()).toHaveStyle('opacity', '1')
    }, 0)
  })
})
