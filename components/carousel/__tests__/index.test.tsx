import React from 'react'
import { mount } from 'enzyme'
import Carousel from '../index'
import { act } from 'react-dom/test-utils'
const itemStyle = {
  backgroundColor: 'blue',
  height: '160px',
  width: '100px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  color: '#fff',
}

const props = {
  autoplay: true,
  dotPosition: 'bottom',
  dots: true,
  easing: 'linear',
  effect: 'scrollx',
  intervalTime: 4000,
  afterChange: jest.fn(),
  beforeChange: jest.fn(),
}

describe('Carousel', () => {
  it('test mount and unmount', () => {
    const wrapper = mount(
      <Carousel>
        <div style={itemStyle}>
          <h3>1</h3>
        </div>
        <div style={itemStyle}>
          <h3>2</h3>
        </div>
        <div style={itemStyle}>
          <h3>3</h3>
        </div>
        <div style={itemStyle}>
          <h3>4</h3>
        </div>
      </Carousel>,
    )
    wrapper.unmount()
  })
  it('should have displayName static property', () => {
    const wrapper = mount(
      <Carousel>
        <div style={itemStyle}>
          <h3>1</h3>
        </div>
        <div style={itemStyle}>
          <h3>2</h3>
        </div>
        <div style={itemStyle}>
          <h3>3</h3>
        </div>
        <div style={itemStyle}>
          <h3>4</h3>
        </div>
      </Carousel>,
    )
    expect((wrapper.type() as any).displayName).toBe('Carousel')
  })
  it('test autoplay', () => {
    jest.useFakeTimers()
    const wrapper = mount(
      <Carousel {...props}>
        <div style={itemStyle}>
          <h3>1</h3>
        </div>
        <div style={itemStyle}>
          <h3>2</h3>
        </div>
        <div style={itemStyle}>
          <h3>3</h3>
        </div>
        <div style={itemStyle}>
          <h3>4</h3>
        </div>
      </Carousel>,
    )
    act(() => {
      jest.advanceTimersByTime(4000)
    })
    wrapper.setProps({ effect: 'fade' })
    act(() => {
      jest.advanceTimersByTime(4000)
    })
    // const dom = wrapper.find('.kd-carousel-slidelist').getDOMNode() as HTMLElement
    // expect(dom.style.transform).toBe('translateX(-100px)')  resize监听无法触发
    jest.useRealTimers()
  })
  it('test dotPosition include `left right top bottom`', () => {
    const wrapper = mount(
      <Carousel {...props}>
        <div style={itemStyle}>
          <h3>1</h3>
        </div>
        <div style={itemStyle}>
          <h3>2</h3>
        </div>
        <div style={itemStyle}>
          <h3>3</h3>
        </div>
        <div style={itemStyle}>
          <h3>4</h3>
        </div>
      </Carousel>,
    )
    wrapper.setProps({ dotPosition: 'left' })
    expect(wrapper.find('.kd-carousel-slidebar-left').length).toBe(1)
    wrapper.setProps({ dotPosition: 'right' })
    expect(wrapper.find('.kd-carousel-slidebar-right').length).toBe(1)
    wrapper.setProps({ dotPosition: 'top' })
    expect(wrapper.find('.kd-carousel-slidebar-top').length).toBe(1)
    wrapper.setProps({ dotPosition: 'bottom' })
    expect(wrapper.find('.kd-carousel-slidebar-bottom').length).toBe(1)
  })
  it('test dots', () => {
    const wrapper = mount(
      <Carousel {...props}>
        <div style={itemStyle}>
          <h3>1</h3>
        </div>
        <div style={itemStyle}>
          <h3>2</h3>
        </div>
        <div style={itemStyle}>
          <h3>3</h3>
        </div>
        <div style={itemStyle}>
          <h3>4</h3>
        </div>
      </Carousel>,
    )
    expect(wrapper.find('.kd-carousel-slidebar-dot').length).toBe(4)
    wrapper.setProps({ dots: false })
    expect(wrapper.find('.kd-carousel-slidebar-dot').length).toBe(0)
  })
  it('test fade effect', () => {
    const wrapper = mount(
      <Carousel {...props}>
        <div style={itemStyle}>
          <h3>1</h3>
        </div>
        <div style={itemStyle}>
          <h3>2</h3>
        </div>
        <div style={itemStyle}>
          <h3>3</h3>
        </div>
        <div style={itemStyle}>
          <h3>4</h3>
        </div>
      </Carousel>,
    )
    wrapper.setProps({ effect: 'fade' })
    expect(wrapper.find('.kd-carousel-list-fade').length).toBe(1)
  })
  it('test afterChange callback', () => {
    const wrapper = mount(
      <Carousel {...props}>
        <div style={itemStyle}>
          <h3>1</h3>
        </div>
        <div style={itemStyle}>
          <h3>2</h3>
        </div>
        <div style={itemStyle}>
          <h3>3</h3>
        </div>
        <div style={itemStyle}>
          <h3>4</h3>
        </div>
      </Carousel>,
    )
    wrapper.find('.kd-carousel-slidebar-dot button').at(3).simulate('click')
    expect(wrapper.find('.kd-carousel-slidebar-dot').at(3).hasClass('kd-carousel-slidebar-dot-active')).toBe(true)
  })
  it('test beforeChange callback', () => {
    const wrapper = mount(
      <Carousel {...props}>
        <div style={itemStyle}>
          <h3>1</h3>
        </div>
        <div style={itemStyle}>
          <h3>2</h3>
        </div>
        <div style={itemStyle}>
          <h3>3</h3>
        </div>
        <div style={itemStyle}>
          <h3>4</h3>
        </div>
      </Carousel>,
    )
    wrapper.find('.kd-carousel-slidebar-dot button').first().simulate('click')
    expect(props.beforeChange).toHaveBeenCalled()
  })
  it('stop play when mouse enter', () => {
    const wrapper = mount(
      <Carousel {...props}>
        <div style={itemStyle}>
          <h3>1</h3>
        </div>
        <div style={itemStyle}>
          <h3>2</h3>
        </div>
        <div style={itemStyle}>
          <h3>3</h3>
        </div>
        <div style={itemStyle}>
          <h3>4</h3>
        </div>
      </Carousel>,
    )
    wrapper.find('.kd-carousel-root').simulate('mouseenter')
    wrapper.find('.kd-carousel-root').simulate('mouseleave')
    wrapper.setProps({ effect: 'fade' })
    wrapper.find('.kd-carousel-root').simulate('mouseenter')
    wrapper.find('.kd-carousel-root').simulate('mouseleave')
  })
  it('test onTransitionEnd', () => {
    const wrapper = mount(
      <Carousel {...props}>
        <div style={itemStyle}>
          <h3>1</h3>
        </div>
        <div style={itemStyle}>
          <h3>2</h3>
        </div>
        <div style={itemStyle}>
          <h3>3</h3>
        </div>
        <div style={itemStyle}>
          <h3>4</h3>
        </div>
      </Carousel>,
    )
    wrapper.find('.kd-carousel-root').simulate('transitionend')
    expect(props.afterChange).toHaveBeenCalled()
    wrapper.setProps({ effect: 'fade' })
    wrapper.find('.kd-carousel-root').simulate('transitionend')
    expect(props.afterChange).toHaveBeenCalled()
  })
  it('test ref', () => {
    const carouselRef = React.createRef<any>()
    mount(
      <Carousel {...props} ref={carouselRef}>
        <div style={itemStyle}>
          <h3>1</h3>
        </div>
        <div style={itemStyle}>
          <h3>2</h3>
        </div>
        <div style={itemStyle}>
          <h3>3</h3>
        </div>
        <div style={itemStyle}>
          <h3>4</h3>
        </div>
      </Carousel>,
    )
    act(() => {
      expect(() => {
        carouselRef.current.prev()
      }).not.toThrow()
    })
    act(() => {
      expect(() => {
        carouselRef.current.getRef()
      }).not.toThrow()
    })
    act(() => {
      expect(() => {
        carouselRef.current.next()
      }).not.toThrow()
    })
    act(() => {
      expect(() => {
        carouselRef.current.jumpTo(3, false)
      }).not.toThrow()
    })
  })
})
