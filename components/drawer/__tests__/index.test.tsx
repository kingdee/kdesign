import React from 'react'
import { mount, render, ReactWrapper } from 'enzyme'
import Drawer from '../index'
import { PlacementType, PlacementTypes } from '../drawer'
// import { act } from 'react-dom/test-utils'
import mountTest from '../../../tests/shared/mountTest'
import { simulateEvent } from '../../../tests/shared/simulateEvent'
import ConfigProvider from '../../config-provider/index'

jest.useFakeTimers()
const setWrapperVisibleFC = () => {
  return (wrapper: ReactWrapper) => {
    wrapper.setProps({
      visible: true,
    })
    wrapper.update()
  }
}
const prefixClassName = 'kd-drawer'
const classNameMap = {
  closeIcon: `.${prefixClassName}-close-icon`,
  mask: `.${prefixClassName}-mask`,
  title: `.${prefixClassName}-title`,
  containerBox: `.${prefixClassName}-container-box`,
  body: `.${prefixClassName}-body`,
  footer: `.${prefixClassName}-footer`,
  box: `.${prefixClassName}`,
  hideBox: `.${prefixClassName}-hide`,
}

const unmountHelp = (wrapper: ReactWrapper) => {
  expect(() => {
    wrapper.unmount()
  }).not.toThrow()
}
describe('Drawer', () => {
  // 1. mount test
  mountTest(Drawer)
  PlacementTypes.forEach((type) => {
    mountTest(() => <Drawer placement={type} />)
  })
  // 2. render test
  it('renders correctly', () => {
    expect(render(<Drawer getContainer={false} />)).toMatchSnapshot()
    PlacementTypes.forEach((type) => {
      expect(render(<Drawer placement={type} getContainer={false} />)).toMatchSnapshot()
    })
  })
  it('warns if type is wrong', () => {
    const mockWarn = jest.fn()
    jest.spyOn(console, 'warn').mockImplementation(mockWarn)
    const type = 'who am I' as any as PlacementType
    render(<Drawer placement={type} getContainer={false} />)
    expect(mockWarn).toHaveBeenCalledTimes(1)
    expect(mockWarn.mock.calls[0][0]).toMatch("Warning: [kdesign]-drawer: cannot found drawer type 'who am I'")
  })
  // 3. render no child without errors
  it('render no child without errors', () => {
    expect(mount(<Drawer></Drawer>)).toMatchSnapshot()
  })
  // 4. render null or undefined without errors
  it('render null or undefined without errors', () => {
    expect(
      mount(
        <Drawer>
          {null}
          {undefined}
        </Drawer>,
      ),
    ).toMatchSnapshot()
  })
  // 5. displayName
  it('should have displayName static property', () => {
    const wrapper = mount(<Drawer></Drawer>)
    expect((wrapper.type() as any).displayName).toBe('Drawer')
  })

  // 6.className state
  it('should class use right', () => {
    const wrapper = mount(<Drawer className="my-test" visible data-test="test"></Drawer>)
    expect(wrapper.prop('data-test')).toEqual('test')
    expect(wrapper.find(classNameMap.box)).toHaveClassName('my-test')
  })

  const customedReactNodeProp = ['title', 'footer', 'closeIcon']
  const generatorCustomedReactNode = (prop: string) => {
    return [
      prop,
      () => {
        return <div className={`customed-${prop}`}></div>
      },
      `.customed-${prop}`,
    ]
  }
  it.each(customedReactNodeProp.map(generatorCustomedReactNode))(
    'should %s use right',
    (prop: string, CustomedNode, className) => {
      const wrapper = mount(<Drawer {...{ [prop]: <CustomedNode /> }} />)
      expect(wrapper.exists(className)).toBe(true)
      expect(() => {
        wrapper.unmount()
      }).not.toThrow()
    },
  )
  // 7. api
  // className footerClassName headerClassName maskClassName titleClassName
  it('should className use right', () => {
    const wrapper = mount(
      <Drawer
        visible
        maskClassName={'test-mask'}
        className={'test-over'}
        maskStyle={{ color: 'red' }}
        title={'test'}
        titleClassName={'test-title'}
        titleStyle={{ color: 'black' }}
        footer={'footer'}
        footerClassName={'test-footer'}
        footerStyle={{ color: 'blue' }}
      />,
    )
    expect(wrapper.exists('.test-mask')).toBe(true)
    expect(wrapper.exists('.test-title')).toBe(true)
    expect(wrapper.exists('.test-footer')).toBe(true)
    expect(wrapper.exists('.test-over')).toBe(true)
    expect((wrapper.find(classNameMap.mask).getDOMNode() as HTMLElement).style.color).toBe('red')
    expect((wrapper.find(classNameMap.title).getDOMNode() as HTMLElement).style.color).toBe('black')
    expect((wrapper.find(classNameMap.footer).getDOMNode() as HTMLElement).style.color).toBe('blue')

    unmountHelp(wrapper)
  })
  // closable
  it('should closable use right', () => {
    const wrapper = mount(<Drawer closable={false} />)
    expect(wrapper.exists(classNameMap.closeIcon)).toBe(false)
    unmountHelp(wrapper)
  })
  // keyboard
  it('should keyboard use right', () => {
    const onClose = () => {
      wrapper.setProps({
        visible: false,
      })
    }
    const wrapper = mount(<Drawer keyboard={true} visible onClose={onClose} />)
    simulateEvent(document.body, 'keydown', {
      key: 'Escape',
    })
    wrapper.update()
    expect(wrapper.exists(classNameMap.hideBox)).toBe(true)
    const setWrapperVisible = setWrapperVisibleFC()
    setWrapperVisible(wrapper)
    expect(wrapper.exists(classNameMap.hideBox)).toBe(false)
    simulateEvent(document.body, 'keydown', {
      key: 'Esc',
    })
    wrapper.update()
    expect(wrapper.exists(classNameMap.hideBox)).toBe(true)
    setWrapperVisible(wrapper)
    simulateEvent(document.body, 'keydown', {
      key: 'enter',
    })
    wrapper.update()
    expect(wrapper.exists(classNameMap.hideBox)).toBe(false)
    wrapper.setProps({
      keyboard: false,
    })
    wrapper.update()
    simulateEvent(document.body, 'keydown', {
      key: 'Escape',
    })
    wrapper.update()
    expect(wrapper.exists(classNameMap.hideBox)).toBe(false)
    simulateEvent(document.body, 'keydown', {
      key: 'Esc',
    })
    wrapper.update()
    expect(wrapper.exists(classNameMap.hideBox)).toBe(false)
    unmountHelp(wrapper)
  })
  // maskClosable
  it('should maskClosable use right', () => {
    const onClose = () => {
      wrapper.setProps({
        visible: false,
      })
    }
    const wrapper = mount(<Drawer maskClosable visible onClose={onClose} />)
    wrapper.find(classNameMap.mask).simulate('click')
    wrapper.update()
    expect(wrapper.exists(classNameMap.hideBox)).toBe(true)
    const setWrapperVisible = setWrapperVisibleFC()
    setWrapperVisible(wrapper)
    wrapper.setProps({
      maskClosable: false,
    })
    wrapper.find(classNameMap.mask).simulate('click')
    wrapper.update()
    expect(wrapper.exists(classNameMap.hideBox)).toBe(false)
    unmountHelp(wrapper)
  })
  // mask
  it('should mask use right', () => {
    const wrapper = mount(<Drawer mask={false} visible />)
    expect(wrapper.exists(classNameMap.mask)).toBe(false)

    wrapper.setProps({
      mask: true,
    })
    wrapper.update()
    expect(wrapper.exists(classNameMap.mask)).toBe(true)
    unmountHelp(wrapper)
  })
  // visible
  it('should visible use right', () => {
    const onClose = () =>
      setTimeout(() => {
        wrapper.setProps({
          visible: false,
        })
      }, 5000)
    const wrapper = mount(<Drawer visible onClose={onClose} />)
    expect(wrapper.exists(classNameMap.hideBox)).toBe(false)
    wrapper.find(classNameMap.closeIcon).simulate('click')
    wrapper.update()
    jest.advanceTimersByTime(4000)
    expect(wrapper.exists(classNameMap.hideBox)).toBe(false)
    jest.advanceTimersByTime(1000)
    wrapper.update()
    expect(wrapper.exists(classNameMap.hideBox)).toBe(true)
    wrapper.update()

    unmountHelp(wrapper)
  })
  // width
  it.each([['width', ['left', 'right']]])('should %s use right', (prop: 'width', placementTypesList) => {
    PlacementTypes.forEach((type) => {
      const wrapper = mount(<Drawer visible {...{ [prop]: 500 }} placement={type} />)
      const node = () => wrapper.find(classNameMap.containerBox).getDOMNode() as HTMLElement
      if (placementTypesList.includes(type)) {
        expect(node().style[prop]).toBe('500px')
        wrapper.setProps({
          [prop]: '60%',
        })
        expect((wrapper.find(classNameMap.containerBox).getDOMNode() as HTMLElement).style[prop]).toBe('60%')
        unmountHelp(wrapper)
      } else {
        expect(node().style[prop]).not.toBe('500px')
        wrapper.setProps({
          [prop]: '60%',
        })
        expect((wrapper.find(classNameMap.containerBox).getDOMNode() as HTMLElement).style[prop]).not.toBe('60%')
        unmountHelp(wrapper)
      }
    })
  })
  // zIndex
  it('should zIndex use right', () => {
    const wrapper = mount(<Drawer visible width={500} zIndex={10} />)
    expect((wrapper.find(classNameMap.box).getDOMNode() as HTMLElement).style.zIndex).toBe('10')
    unmountHelp(wrapper)
  })

  // get container
  it('should getContainer use right', () => {
    // 通过relative来验证
    const mockWarn = jest.fn()
    jest.spyOn(console, 'warn').mockImplementation(mockWarn)
    const TestComp = () => {
      const ref = React.useRef<HTMLDivElement>(null)
      return (
        <div ref={ref} className="test-ref">
          <Drawer getContainer={() => ref.current} visible />
        </div>
      )
    }
    const renderComp = mount(<TestComp />)
    // 需要setProps一下才触发
    renderComp.setProps({})
    renderComp.update()
    // expect(window.getComputedStyle((renderComp.find('.test-ref').getDOMNode() as HTMLElement)).getPropertyValue('position')).toBe('relative')
    // expect((renderComp.find('.test-ref').getDOMNode() as HTMLElement).style.position).toBe('relative')
    expect(mockWarn.mock.calls[0][0]).toMatch(
      'Warning: [kdesign]-drawer: getContainer"s returnValue/value is not a relative/absolute/fixed positioned DOM',
    )
    const AnotherTestComp = () => {
      const ref = React.useRef(null)
      return (
        <div ref={ref} className="test-body">
          <Drawer getContainer={() => null} visible />
        </div>
      )
    }
    const anotherRenderComp = mount(<AnotherTestComp />)
    anotherRenderComp.setProps({})
    anotherRenderComp.update()
    // expect((anotherRenderComp.find('.test-body').getDOMNode() as HTMLElement).style.position).not.toBe('relative')
    // const ClassTestComp = () => {
    //   return (
    //     <div className={'test-get-container'}>
    //       <Drawer getContainer={() => ((document.querySelector('.test-get-container') as HTMLElement) || '.test-get-container')} visible />
    //     </div>
    //   )
    // }
    // const classRenderComp = mount(<ClassTestComp />)
    // 这个不管用
    // classRenderComp.setProps({
    // })
    // classRenderComp.update()
    // expect((classRenderComp.find('.test-get-container').getDOMNode() as HTMLElement).style.position).toBe('relative')

    const ErrorTestComp = () => {
      return (
        <div className={'test-get-container'}>
          <Drawer getContainer={() => ':::'} visible />
        </div>
      )
    }
    const errorRenderComp = mount(<ErrorTestComp />)
    errorRenderComp.setProps({})
    errorRenderComp.update()
    expect((errorRenderComp.find('.test-get-container').getDOMNode() as HTMLElement).style.position).not.toBe(
      'relative',
    )
    expect(mockWarn.mock.calls[1][0]).toMatch(
      'Warning: [kdesign]-drawer: getContainer"s returnValue/value is not a correct CSSSelector',
    )
  })
  // forceRender
  it('should forceRender use right', () => {
    const onClose = () => {
      wrapper.setProps({
        visible: false,
      })
    }
    const wrapper = mount(
      <Drawer onClose={onClose}>
        <div className="test-force" />
      </Drawer>,
    )
    expect(wrapper.exists('.test-force')).toBe(false)
    wrapper.setProps({
      visible: true,
    })
    expect(wrapper.exists('.test-force')).toBe(true)
    wrapper.find(classNameMap.closeIcon).simulate('click')
    wrapper.update()
    expect(wrapper.exists('.test-force')).toBe(false)
    wrapper.setProps({
      forceRender: true,
    })
    wrapper.update()
    expect(wrapper.exists('.test-force')).toBe(true)
    wrapper.setProps({
      visible: true,
    })
    expect(wrapper.exists('.test-force')).toBe(true)
    wrapper.find(classNameMap.closeIcon).simulate('click')
    wrapper.update()
    expect(wrapper.exists('.test-force')).toBe(true)
    unmountHelp(wrapper)
  })
  // destroyOnClose
  it('should destroyOnClose, use right', () => {
    const onClose = () => {
      wrapper.setProps({
        visible: false,
      })
    }
    const wrapper = mount(
      <Drawer forceRender destroyOnClose visible onClose={onClose}>
        <div className="test-force" />
      </Drawer>,
    )
    expect(wrapper.exists('.test-force')).toBe(true)
    wrapper.find(classNameMap.closeIcon).simulate('click')
    wrapper.update()
    // destroyOnClose优先级高
    expect(wrapper.exists('.test-force')).toBe(false)

    unmountHelp(wrapper)
  })

  // 8.ConfigProvider
  it('should config use config provider', () => {
    const modalConfig = {
      compDefaultProps: {
        Drawer: {
          placement: 'left',
        },
      },
    }
    const wrapper = mount(
      <ConfigProvider value={modalConfig}>
        <Drawer></Drawer>
      </ConfigProvider>,
    )
    expect(wrapper.find(classNameMap.containerBox)).toHaveClassName(`.${prefixClassName}-container-left`)
  })
  // 9. ref test
  it('should get Demo element from ref', () => {
    const ref = React.createRef()
    mount(<Drawer visible ref={ref} />)
    expect(ref.current instanceof HTMLElement).toBe(true)
    expect((ref.current as HTMLElement).classList.contains('kd-drawer')).toBe(true)
  })
})
