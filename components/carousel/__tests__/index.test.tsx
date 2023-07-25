import React from 'react'
import { mount, render } from 'enzyme'
import Carousel from '../index'
import ConfigProvider from '../../config-provider/index'
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
  autoplay: false,
  dotPosition: 'bottom',
  dots: false,
  easing: 'linear',
  effect: 'scrollx',
  intervalTime: 4000,
  afterChange: jest.fn(),
  beforeChange: jest.fn(),
}

describe('Carousel', () => {
  // 1.mount test
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

  // 2.render test
  it('renders correctly', () => {
    expect(
      render(
        <Carousel>
          <div style={itemStyle}>
            <h3>1</h3>
          </div>
        </Carousel>,
      ),
    ).toMatchSnapshot()
  })

  // #region 3.warns in component
  it('should warns when set wrong "dotPosition" of prop', () => {
    const mockWarn = jest.fn()
    jest.spyOn(console, 'warn').mockImplementation(mockWarn)
    const props = {
      dotPosition: '123',
    }
    mount(<Carousel {...props} />)
    expect(mockWarn).toHaveBeenCalledTimes(1)
    expect(mockWarn.mock.calls[0][0]).toMatch("Warning: [kdesign]-carousel: cannot found dotPosition type '123'")
  })
  it('should warns when set wrong "effect" of prop', () => {
    const mockWarn = jest.fn()
    jest.spyOn(console, 'warn').mockImplementation(mockWarn)
    const props = {
      effect: 'wave',
    }
    mount(<Carousel {...props} />)
    expect(mockWarn).toHaveBeenCalledTimes(1)
    expect(mockWarn.mock.calls[0][0]).toMatch("Warning: [kdesign]-carousel: cannot found effect type 'wave'")
  })
  // #endregion

  // 4.render no child without errors
  it('render no child without errors', () => {
    expect(mount(<Carousel></Carousel>)).toMatchSnapshot()
  })

  // 5.render null or undefined without errors
  it('render null or undefined without errors', () => {
    const wrapper = mount(
      <Carousel>
        {null}
        {undefined}
      </Carousel>,
    )
    expect(wrapper).toMatchSnapshot()
    expect(wrapper.find('.kd-carousel-root')).toHaveText('')
  })

  // 6.displayName
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

  // #region 7.API
  //! 无法测试,元素没有表现切换的标志
  // autoplay
  it('should autoplay when set autoplay of props', () => {
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
    wrapper.setProps({ autoplay: 'true' })
    act(() => {
      jest.advanceTimersByTime(4000)
    })
    jest.useRealTimers()
  })

  // className
  it('should show correct class name when set "className" of props', () => {
    expect(mount(<Carousel className="my-carousel"></Carousel>)).toHaveClassName('my-carousel')
  })

  // style
  it("should show correct style when set 'style' of props", () => {
    expect(mount(<Carousel style={{ backgroundColor: 'red' }}></Carousel>)).toHaveStyle('backgroundColor', 'red')
  })

  // dotPosition && dots of boolean
  it('should show correct dot position when set "dotPosition" of props', () => {
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
    expect(wrapper.find('.kd-carousel-slidebar-bottom')).not.toExist()
    wrapper.setProps({ dots: true })
    wrapper.update()
    expect(wrapper.find('.kd-carousel-slidebar-bottom')).toExist()
    wrapper.setProps({ dotPosition: 'top' })
    wrapper.update()
    expect(wrapper.find('.kd-carousel-slidebar-top')).toExist()
    wrapper.setProps({ dotPosition: 'bottom' })
    wrapper.update()
    expect(wrapper.find('.kd-carousel-slidebar-bottom')).toExist()
    wrapper.setProps({ dotPosition: 'right' })
    wrapper.update()
    expect(wrapper.find('.kd-carousel-slidebar-right')).toExist()
    wrapper.setProps({ dotPosition: 'left' })
    wrapper.update()
    expect(wrapper.find('.kd-carousel-slidebar-left')).toExist()
  })

  // dots of object
  it('should show correct dot class name when set "dots" of props', () => {
    const wrapper = mount(
      <Carousel dots={{ dotsClassName: 'dots', activeDotsClassName: 'activeDot' }}>
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
    expect(wrapper.find('.dots').length).toEqual(4)
    expect(wrapper.find('.dots').at(0).hasClass('activeDot')).toBeTruthy()
  })

  // easing
  it('should show correct sliding speed when set "easing" of props', () => {
    const carouselRef = React.createRef<any>()
    const wrapper = mount(
      <Carousel easing="ease-in-out" ref={carouselRef}>
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
    carouselRef.current.next()
    expect((wrapper.find('.kd-carousel-list').getDOMNode() as HTMLUListElement).style).toHaveProperty(
      'transition',
      'all 0.3s ease-in-out',
    )
  })

  // effect
  it('should show correct slide animation effect when set "effect" of props', () => {
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
    expect(wrapper.find('.kd-carousel-list-slide')).toExist()
    expect(wrapper.find('.kd-carousel-list-fade')).not.toExist()
    expect(wrapper.find('.kd-carousel-list-display')).not.toExist()
    wrapper.setProps({ effect: 'fade' })
    wrapper.update()
    expect(wrapper.find('.kd-carousel-list-fade')).toExist()
    expect(wrapper.find('.kd-carousel-list-display')).not.toExist()
    expect(wrapper.find('.kd-carousel-list-slide')).not.toExist()
    wrapper.setProps({ effect: 'none' })
    wrapper.update()
    expect(wrapper.find('.kd-carousel-list-display')).toExist()
    expect(wrapper.find('.kd-carousel-list-slide')).not.toExist()
    expect(wrapper.find('.kd-carousel-list-fade')).not.toExist()
  })

  // intervalTime
  it('should show correct content at the right time when set "intervalTime" of props', () => {
    jest.useFakeTimers()
    const wrapper = mount(
      <Carousel autoplay={true} intervalTime={4000}>
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
      jest.advanceTimersByTime(1000)
    })
    expect((wrapper.find('.kd-carousel-list').getDOMNode() as HTMLUListElement).style).not.toHaveProperty(
      'transition',
      'all 0.3s cubic-bezier(0.4,0,0.6,1)',
    )
    act(() => {
      jest.advanceTimersByTime(3000)
    })
    expect((wrapper.find('.kd-carousel-list').getDOMNode() as HTMLUListElement).style).toHaveProperty(
      'transition',
      'all 0.3s cubic-bezier(0.4,0,0.6,1)',
    )
    jest.useRealTimers()
  })

  // #region afterChange
  // !afterChange只在autoplay的时候生效
  it('should trigger the "afterChange" function after plane switching', () => {
    jest.useFakeTimers()
    mount(
      <Carousel {...props} autoplay={true}>
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
    //! expect(props.afterChange).toHaveBeenCalled()
    jest.useRealTimers()
  })

  it('should get correct value when "afterChange" has been called', () => {
    let num = 0
    const handleAfterChange = jest.fn((currentIndex) => {
      num = currentIndex
    })
    jest.useFakeTimers()
    const wrapper = mount(
      <Carousel intervalTime={2000} autoplay={true} afterChange={handleAfterChange}>
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
    ;(wrapper.find(Carousel).props() as any).afterChange(1)
    expect(handleAfterChange).toHaveBeenCalled()
    expect(num).toEqual(1)
  })
  // #endregion

  // #region beforeChange
  it('should trigger the "beforeChange" function after plane switching', () => {
    jest.useFakeTimers()
    mount(
      <Carousel {...props} autoplay={true}>
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
    expect(props.beforeChange).toHaveBeenCalled()
    jest.useRealTimers()
  })

  it('should get correct value when "beforeChange" has been called', () => {
    let num1 = 0
    let num2 = 0
    const handleBeforeChange = jest.fn((from, to) => {
      num1 = from
      num2 = to
    })
    const wrapper = mount(
      <Carousel intervalTime={2000} beforeChange={handleBeforeChange}>
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
    ;(wrapper.find(Carousel).props() as any).beforeChange(0, 1)
    expect(handleBeforeChange).toHaveBeenCalled()
    expect(num1).toEqual(0)
    expect(num2).toEqual(1)
  })
  // #endregion

  // jumpNode
  it('should show correct jump node when set "jumpNode" props', () => {
    const jumpNode = [<div key={1}>上一页</div>, <div key={2}>下一页</div>]
    const wrapper = mount(
      <Carousel jumpNode={jumpNode}>
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
    expect(wrapper.find('.kd-carousel-jump-left')).toExist()
    expect(wrapper.find('.kd-carousel-jump-left')).toHaveText('上一页')
    expect(wrapper.find('.kd-carousel-jump-right')).toExist()
    expect(wrapper.find('.kd-carousel-jump-right')).toHaveText('下一页')
    expect((wrapper.find('.kd-carousel-list').getDOMNode() as HTMLUListElement).style).not.toHaveProperty(
      'transition',
      'all 0.3s cubic-bezier(0.4,0,0.6,1)',
    )
    wrapper.find('.kd-carousel-jump-right').childAt(0).simulate('click')
    expect((wrapper.find('.kd-carousel-list').getDOMNode() as HTMLUListElement).style).toHaveProperty(
      'transition',
      'all 0.3s cubic-bezier(0.4,0,0.6,1)',
    )
  })
  // #endregion

  // #region 8.methods
  // getRef()
  it('should get correct dom element when use "getRef" methods', () => {
    const carouselRef = React.createRef<any>()
    mount(
      <div className="test">
        <Carousel style={{ backgroundColor: 'red' }} ref={carouselRef}>
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
        </Carousel>
        ,
      </div>,
    )
    expect(carouselRef.current.getRef().style.backgroundColor).toEqual('red')
    expect(carouselRef.current.getRef().parentNode.className).toEqual('test')
    expect(carouselRef.current.getRef().firstChild.firstChild.firstChild.firstChild.tagName).toEqual('H3')
  })

  // jumpTo()
  it('should appear correct panel when use "jumpTo" function', () => {
    const carouselRef = React.createRef<any>()
    const wrapper = mount(
      <Carousel ref={carouselRef}>
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
    expect(wrapper.find('.kd-carousel-slidebar').childAt(0)).toHaveClassName('kd-carousel-slidebar-dot-active')
    expect(wrapper.find('.kd-carousel-slidebar').childAt(1)).not.toHaveClassName('kd-carousel-slidebar-dot-active')
    act(() => {
      carouselRef.current.jumpTo(1, false)
    })
    wrapper.update()
    expect(wrapper.find('.kd-carousel-slidebar').childAt(1)).toHaveClassName('kd-carousel-slidebar-dot-active')
    expect(wrapper.find('.kd-carousel-slidebar').childAt(0)).not.toHaveClassName('kd-carousel-slidebar-dot-active')
    expect((wrapper.find('.kd-carousel-list').getDOMNode() as HTMLUListElement).style).not.toHaveProperty(
      'transition',
      'all 0.3s cubic-bezier(0.4,0,0.6,1)',
    )
    act(() => {
      carouselRef.current.jumpTo(2, true)
    })
    wrapper.update()
    expect((wrapper.find('.kd-carousel-list').getDOMNode() as HTMLUListElement).style).toHaveProperty(
      'transition',
      'all 0.3s cubic-bezier(0.4,0,0.6,1)',
    )
  })

  // next()
  it('should appear correct panel when use "next" function', () => {
    const carouselRef = React.createRef<any>()
    const wrapper = mount(
      <Carousel ref={carouselRef}>
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
    expect(wrapper.find('.kd-carousel-slidebar').childAt(0)).toHaveClassName('kd-carousel-slidebar-dot-active')
    expect(wrapper.find('.kd-carousel-slidebar').childAt(1)).not.toHaveClassName('kd-carousel-slidebar-dot-active')
    act(() => {
      carouselRef.current.next()
    })
    wrapper.update()
    expect(wrapper.find('.kd-carousel-slidebar').childAt(1)).toHaveClassName('kd-carousel-slidebar-dot-active')
    expect(wrapper.find('.kd-carousel-slidebar').childAt(0)).not.toHaveClassName('kd-carousel-slidebar-dot-active')
  })

  // prev()
  it('should appear correct panel when use "prev" function', () => {
    const carouselRef = React.createRef<any>()
    const wrapper = mount(
      <Carousel ref={carouselRef}>
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
      carouselRef.current.next()
    })
    wrapper.update()
    expect(wrapper.find('.kd-carousel-slidebar').childAt(1)).toHaveClassName('kd-carousel-slidebar-dot-active')
    expect(wrapper.find('.kd-carousel-slidebar').childAt(0)).not.toHaveClassName('kd-carousel-slidebar-dot-active')
    act(() => {
      carouselRef.current.prev()
    })
    wrapper.update()
    expect(wrapper.find('.kd-carousel-slidebar').childAt(0)).toHaveClassName('kd-carousel-slidebar-dot-active')
    expect(wrapper.find('.kd-carousel-slidebar').childAt(1)).not.toHaveClassName('kd-carousel-slidebar-dot-active')
  })

  // #endregion

  // 8.class state
  // data-test向下传递
  it('should ensure native API or custom API can pass', () => {
    expect(mount(<Carousel data-index="1"></Carousel>)).toHaveProp('data-index', '1')
  })

  // 9.component interaction(event)
  it('the click of the previous button or the next button should be disabled when the jump node position is first or last', () => {
    const carouselRef = React.createRef<any>()
    const wrapper = mount(
      <Carousel ref={carouselRef} jumpNode={true}>
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
    expect(wrapper.find('.kd-carousel-jump').at(0)).toHaveClassName('kd-carousel-jump-disabled')
    expect(wrapper.find('.kd-carousel-jump').at(1)).not.toHaveClassName('kd-carousel-jump-disabled')
    act(() => {
      carouselRef.current.jumpTo(3, false)
    })
    wrapper.update()
    expect(wrapper.find('.kd-carousel-jump').at(0)).not.toHaveClassName('kd-carousel-jump-disabled')
    expect(wrapper.find('.kd-carousel-jump').at(1)).toHaveClassName('kd-carousel-jump-disabled')
  })

  it('should get the correct information when click the carousel item', () => {
    let num = 0
    const wrapper = mount(
      <Carousel jumpNode={true}>
        {[1, 2, 3, 4].map((item, i) => (
          <div
            onClick={() => {
              num = item
            }}
            style={itemStyle}
            key={i}
          >
            <h3>{item}</h3>
          </div>
        ))}
      </Carousel>,
    )
    expect(num).toEqual(0)
    wrapper.find('.kd-carousel-list-item').at(1).find('div').simulate('click')
    expect(num).toEqual(1)
  })

  // 10.config provider
  it('should provide the correct configuration by using configuration provider', () => {
    const carouselRef = React.createRef<any>()
    const carouselConfig = {
      compDefaultProps: {
        Carousel: {
          autoplay: true,
          dots: true,
          dotPosition: 'top',
          easing: 'cubic-bezier(0.4,0,0.6,1)',
          effect: 'scrollx',
          intervalTime: 4000,
        },
      },
    }
    const wrapper = mount(
      <ConfigProvider value={carouselConfig}>
        <Carousel ref={carouselRef}>
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
        </Carousel>
      </ConfigProvider>,
    )
    expect(wrapper.find('.kd-carousel-slidebar')).toExist()
    expect(wrapper.find('.kd-carousel-slidebar-top')).toExist()
    expect(wrapper.find('.kd-carousel-list-slide')).toExist()
    expect(wrapper.find('.kd-carousel-list-fade')).not.toExist()
    expect(wrapper.find('.kd-carousel-list-display')).not.toExist()
    carouselRef.current.next()
    expect((wrapper.find('.kd-carousel-list').getDOMNode() as HTMLUListElement).style).toHaveProperty(
      'transition',
      'all 0.3s cubic-bezier(0.4,0,0.6,1)',
    )
  })

  // 11.ref test
  it('should get correct dom from ref of props', () => {
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

  // 12.special case
  it('should correctly render contents when data is asynchronously fetched during compoennt is first render', async () => {
    const fetchData = jest.fn().mockResolvedValue({ list: [1, 2, 3, 4] })
    const wrapper = mount(
      <Carousel>
        {(await fetchData()).list.map((item: number, i: number) => {
          return <div key={i}>{item}</div>
        })}
      </Carousel>,
    )
    expect(wrapper.find('.kd-carousel-list-item')).toHaveLength(6)
    expect(wrapper.find('.kd-carousel-list-item').at(1)).toHaveClassName('kd-carousel-list-item-active')
  })
})
