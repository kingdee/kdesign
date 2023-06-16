import React from 'react'
import { mount, render, ReactWrapper } from 'enzyme'
import Modal from '../index'
import { ModalType, ModalTypes } from '../modal'
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
const prefixClassName = 'kd-modal'
const classNameMap = {
  container: `.${prefixClassName}-container`,
  ok: `button.${prefixClassName}-ok-btn`,
  cancel: `button.${prefixClassName}-cancel-btn`,
  closeIcon: `.${prefixClassName}-close-icon`,
  mask: `.${prefixClassName}-mask`,
  containerBox: `.${prefixClassName}-container-box`,
  body: `.${prefixClassName}-body`,
  footer: `.${prefixClassName}-footer`,
  showline: `.${prefixClassName}-showline`,
}
const unmountHelp = (wrapper: ReactWrapper) => {
  expect(() => {
    wrapper.unmount()
  }).not.toThrow()
}
describe('Modal', () => {
  // 1.mount test
  ModalTypes.forEach((type) => {
    mountTest(() => <Modal type={type} getContainer={false} />)
  })

  // 2.render test
  it('renders correctly', () => {
    expect(render(<Modal getContainer={false} />)).toMatchSnapshot()
    ModalTypes.forEach((type) => {
      expect(render(<Modal type={type} getContainer={false} />)).toMatchSnapshot()
    })
  })

  // 3. warns in component
  it('warns if type is wrong', () => {
    const mockWarn = jest.fn()
    jest.spyOn(console, 'warn').mockImplementation(mockWarn)
    const type = 'who am I' as any as ModalType
    render(<Modal type={type} getContainer={false} />)
    expect(mockWarn).toHaveBeenCalledTimes(1)
    expect(mockWarn.mock.calls[0][0]).toMatch("Warning: [kdesign]-modal: cannot found modal type 'who am I'")
  })

  // 5. displayName
  it('should have displayName static property', () => {
    const wrapper = mount(<Modal></Modal>)
    expect((wrapper.type() as any).displayName).toBe('Modal')
  })

  // 6. class state
  it('should className or style use right', () => {
    const wrapper = mount(
      <Modal
        body={'test'}
        bodyClassName={'test-body'}
        bodyStyle={{ overflow: 'hidden' }}
        className={'test-over'}
        maskStyle={{ color: 'red' }}
        maskClassName={'mask-test'}
        style={{ background: 'red' }}
        data-test="test"
      />,
    )
    expect(wrapper.exists('.test-body')).toBe(true)
    expect(wrapper.find('.test-body')).toHaveStyle('overflow', 'hidden')
    expect(wrapper.exists('.test-over')).toBe(true)
    expect(wrapper.find(classNameMap.mask)).toHaveStyle('color', 'red')
    expect(wrapper.find(classNameMap.mask).exists('.mask-test')).toBe(true)
    expect(wrapper.find('.kd-modal')).toHaveStyle('background', 'red')
    expect(wrapper.prop('data-test')).toEqual('test')
    unmountHelp(wrapper)
  })

  const customedReactNodeProp = ['body', 'title', 'footer', 'titleIcon']
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
    'should custom element use right',
    (prop: string, CustomedNode, className) => {
      const wrapper = mount(<Modal {...{ [prop]: <CustomedNode /> }} />)
      expect(wrapper.exists(className)).toBe(true)
      expect(() => {
        wrapper.unmount()
      }).not.toThrow()
    },
  )
  // 7.component interaction(event)
  it('should draggable use right', () => {
    ;[true, false].forEach((draggable) => {
      expect(render(<Modal draggable={draggable} getContainer={false} />)).toMatchSnapshot()
    })
  })
  it('should focusTriggerAfterClose use right', () => {
    const div = document.createElement('div')
    div.classList.add('first-test-div')
    const anotherDiv = document.createElement('div')
    anotherDiv.classList.add('second-test-div')
    const spyDivFocus = jest.spyOn(div, 'focus')
    const anotherSpyDivFocus = jest.spyOn(anotherDiv, 'focus')
    const activeSelectedElement = (div: HTMLElement) => {
      return Reflect.defineProperty(document, 'activeElement', {
        get() {
          return div
        },
        configurable: true,
      })
    }
    // kinds of close modal's type
    // click button
    activeSelectedElement(div)
    const onOk = () =>
      wrapper.setProps({
        visible: false,
      })
    const onCancel = () =>
      wrapper.setProps({
        visible: false,
      })
    const wrapper = mount(
      <Modal
        focusTriggerAfterClose
        visible={true}
        onOk={onOk}
        onCancel={onCancel}
        keyboard
        maskClosable
        closable
        getContainer={false}
      />,
    )
    const setWrapperVisible = setWrapperVisibleFC()
    wrapper.find(classNameMap.ok).simulate('click')
    wrapper.update()
    expect(spyDivFocus).toBeCalledTimes(1)
    activeSelectedElement(anotherDiv)
    setWrapperVisible(wrapper)
    wrapper.find(classNameMap.cancel).simulate('click')
    wrapper.update()
    expect(anotherSpyDivFocus).toBeCalledTimes(1)

    activeSelectedElement(div)
    setWrapperVisible(wrapper)
    wrapper.find(classNameMap.closeIcon).simulate('click')
    wrapper.update()
    expect(spyDivFocus).toBeCalledTimes(2)

    // keydown
    // esc
    activeSelectedElement(anotherDiv)
    setWrapperVisible(wrapper)
    simulateEvent(document.body, 'keydown', {
      key: 'Escape',
    })
    wrapper.update()
    expect(anotherSpyDivFocus).toBeCalledTimes(2)

    // enter
    activeSelectedElement(div)
    setWrapperVisible(wrapper)
    wrapper.find(classNameMap.containerBox).simulate('keydown', {
      key: 'Enter',
    })
    wrapper.update()
    expect(spyDivFocus).toBeCalledTimes(3)

    // click mask
    activeSelectedElement(anotherDiv)
    setWrapperVisible(wrapper)
    wrapper.find(classNameMap.mask).simulate('click')
    wrapper.update()
    expect(anotherSpyDivFocus).toBeCalledTimes(3)

    // IE Esc
    activeSelectedElement(div)
    setWrapperVisible(wrapper)
    simulateEvent(document.body, 'keydown', {
      key: 'Esc',
    })
    wrapper.update()
    expect(spyDivFocus).toBeCalledTimes(4)

    // closeIcon showline
    wrapper.setProps({ closable: false, showline: false })
    expect(wrapper.exists(classNameMap.closeIcon)).toBe(false)
    expect(wrapper.exists(classNameMap.showline)).toBe(false)

    unmountHelp(wrapper)
  })

  it('should visible use right', () => {
    const onOk = () =>
      setTimeout(() => {
        wrapper.setProps({
          visible: false,
        })
      }, 5000)
    const onCancel = () =>
      setTimeout(() => {
        wrapper.setProps({
          visible: false,
        })
      }, 3000)
    const wrapper = mount(<Modal visible onOk={onOk} onCancel={onCancel} getContainer={false} />)
    expect(wrapper.exists(classNameMap.containerBox)).toBe(true)
    wrapper.find(classNameMap.ok).simulate('click')
    wrapper.update()
    jest.advanceTimersByTime(4000)
    expect(wrapper.exists(classNameMap.containerBox)).toBe(true)
    jest.advanceTimersByTime(1000)
    wrapper.update()
    expect(wrapper.exists(classNameMap.container)).toBe(true)
    expect((wrapper.find(classNameMap.container).getDOMNode() as HTMLElement).style.display).toBe('')
    wrapper.setProps({
      visible: true,
    })
    wrapper.update()
    wrapper.find(classNameMap.cancel).simulate('click')
    wrapper.update()
    jest.advanceTimersByTime(2000)
    expect(wrapper.exists(classNameMap.containerBox)).toBe(true)
    jest.advanceTimersByTime(1000)
    wrapper.update()
    expect(wrapper.exists(classNameMap.containerBox)).toBe(true)

    unmountHelp(wrapper)
  })

  it('should keyboard use right', () => {
    const onOk = jest.fn(() =>
      wrapper.setProps({
        visible: false,
      }),
    )
    const onCancel = jest.fn(() =>
      wrapper.setProps({
        visible: false,
      }),
    )
    const wrapper = mount(
      <Modal
        visible
        onOk={onOk}
        onCancel={onCancel}
        cancelText="cancel"
        okText="ok"
        cancelButtonProps={{ style: { color: 'red' } }}
        okButtonProps={{ style: { color: 'red' } }}
        keyboard
      />,
    )

    simulateEvent(document.body, 'keydown', {
      key: 'Escape',
    })
    wrapper.update()
    // cancelText okText cancelButtonProps okButtonProps
    expect(wrapper.find(classNameMap.ok).text()).toBe('ok')
    expect(wrapper.find(classNameMap.cancel).text()).toBe('cancel')
    expect(wrapper.find(classNameMap.ok)).toHaveStyle('color', 'red')
    expect(wrapper.find(classNameMap.cancel)).toHaveStyle('color', 'red')
    expect(onOk).not.toHaveBeenCalled()
    expect(onCancel).toHaveBeenCalled()
    expect(wrapper.exists(classNameMap.container)).toBe(true)
    expect((wrapper.find(classNameMap.container).getDOMNode() as HTMLElement).style.display).toBe('')
    unmountHelp(wrapper)
  })

  it('should keydown enter can be used right', () => {
    const onOk = jest.fn(() =>
      wrapper.setProps({
        visible: false,
      }),
    )
    const onCancel = jest.fn(() =>
      wrapper.setProps({
        visible: false,
      }),
    )
    const wrapper = mount(<Modal visible onOk={onOk} onCancel={onCancel} keyboard />)

    wrapper.find(classNameMap.mask).simulate('keydown', {
      key: 'Enter',
    })
    wrapper.update()
    expect(onOk).not.toHaveBeenCalled()
    expect(onCancel).not.toHaveBeenCalled()

    wrapper.find(classNameMap.containerBox).simulate('keydown', {
      key: 'Enter',
    })
    expect(onOk).toHaveBeenCalled()
    expect(onCancel).not.toHaveBeenCalled()
    expect(wrapper.exists(classNameMap.container)).toBe(true)
    expect((wrapper.find(classNameMap.container).getDOMNode() as HTMLElement).style.display).toBe('')
    unmountHelp(wrapper)
  })

  it('should mask use right', () => {
    const wrapper = mount(<Modal mask={false} keyboard />)
    expect(wrapper.exists(classNameMap.mask)).toBe(false)

    wrapper.setProps({
      mask: true,
    })
    wrapper.update()
    expect(wrapper.exists(classNameMap.mask)).toBe(true)
    unmountHelp(wrapper)
  })

  it('should getContainer use right', () => {
    const mockWarn = jest.fn()
    jest.spyOn(console, 'warn').mockImplementation(mockWarn)
    const TestComp = () => {
      const ref = React.useRef(null)
      return (
        <div ref={ref}>
          <Modal getContainer={() => false} />
        </div>
      )
    }
    const renderComp = render(<TestComp />)
    expect(renderComp).toMatchSnapshot()
    expect(renderComp.find(classNameMap.containerBox)).toBeDefined()

    const AnotherTestComp = () => {
      const ref = React.useRef(null)
      return (
        <div ref={ref}>
          <Modal getContainer={() => false} />
        </div>
      )
    }
    const anotherRenderComp = render(<AnotherTestComp />)
    expect(anotherRenderComp).toMatchSnapshot()
    expect(anotherRenderComp.find(classNameMap.containerBox)).toBeDefined()
    expect((document.body.querySelector(classNameMap.container) as HTMLElement).style.display).toBe('')

    const ClassTestComp = () => {
      return (
        <div className={'test-get-container'}>
          <Modal getContainer={() => false} />
        </div>
      )
    }
    const classRenderComp = render(<ClassTestComp />)
    expect(classRenderComp).toMatchSnapshot()
    expect(classRenderComp.find(classNameMap.containerBox)).toBeDefined()

    const ErrorTestComp = () => {
      return (
        <div className={'test-get-container'}>
          <Modal getContainer={() => ':::'} />
        </div>
      )
    }
    const errorRenderComp = mount(<ErrorTestComp />)
    expect(errorRenderComp).toMatchSnapshot()
    expect(errorRenderComp.find(classNameMap.containerBox)).toBeDefined()
    expect(mockWarn.mock.calls[0][0]).toMatch(
      'Warning: [kdesign]-modal: getContainer"s returnValue/value is not a correct CSSSelector',
    )
  })

  it('should width & height use right', () => {
    const wrapper = mount(<Modal height={1000} width={500} />)
    expect((wrapper.find(classNameMap.containerBox).getDOMNode() as HTMLElement).style.height).toBe('1000px')
    expect((wrapper.find(classNameMap.containerBox).getDOMNode() as HTMLElement).style.width).toBe('500px')
    unmountHelp(wrapper)
  })

  it('should destroyOnClose use right', () => {
    const wrapper = mount(<Modal destroyOnClose body={'body'} />)
    expect((wrapper.find(classNameMap.body).getDOMNode() as HTMLElement).textContent).toBe('body')
    wrapper.find(classNameMap.cancel).at(0).simulate('click')
    wrapper.update()
    expect(wrapper.exists(classNameMap.body)).toBe(false)
    unmountHelp(wrapper)
  })

  it('should footerBtnOrder use right', () => {
    const wrapper = mount(<Modal footerBtnOrder="reverse" />)
    expect((wrapper.find(classNameMap.footer).getDOMNode() as HTMLElement).style.flexDirection).toBe('row-reverse')
    unmountHelp(wrapper)
  })

  // 8.config provider
  it('should config use config provider', () => {
    const modalConfig = {
      compDefaultProps: {
        Modal: {
          type: 'warning',
        },
      },
    }
    const wrapper = mount(
      <ConfigProvider value={modalConfig}>
        <Modal></Modal>
      </ConfigProvider>,
    )
    expect(wrapper.find('.kd-modal-footer')).toHaveClassName('.kd-modal-warning-footer')
  })

  // 9. ref test
  describe('9. ref test', () => {
    it('should get Demo element from ref', () => {
      const ref = React.createRef() as any
      mount(<Modal ref={ref}></Modal>)
      expect((ref.current as HTMLElement).classList.contains('kd-modal-container-box')).toBe(true)
    })
  })
})
