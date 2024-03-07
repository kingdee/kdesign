import React from 'react'
import { render, mount, ReactWrapper } from 'enzyme'
import Signature from '../index'
import mountTest from '../../../tests/shared/mountTest'
import ConfigProvider from '../../config-provider/index'

const unmountHelp = (wrapper: ReactWrapper) => {
  expect(() => {
    wrapper.unmount()
  }).not.toThrow()
}
describe('Signature', () => {
  // 1. mount test
  describe('1. mount test', () => {
    mountTest(() => <Signature />)
  })

  // 2.render test
  it('render correctly', () => {
    expect(render(<Signature getContainer={false} />)).toMatchSnapshot()
  })

  // 3. render no child without errors
  it('render no child without errors', () => {
    expect(mount(<Signature getContainer={false} />)).toMatchSnapshot()
  })

  // 4. render null or undefined without errors
  it('render null or undefined Signature without errors', () => {
    expect(
      mount(
        <Signature>
          {null}
          {undefined}
        </Signature>,
      ),
    ).toMatchSnapshot()
  })

  // 5. displayName
  it('should have displayName static property', () => {
    const wrapper = mount(<Signature></Signature>)
    expect((wrapper.type() as any).displayName).toBe('Signature')
  })

  // 6. class state
  it('should className or style use right', () => {
    const wrapper = mount(<Signature className="my-test" style={{ color: 'red' }} data-test="test"></Signature>)
    expect(wrapper.find('.kd-signature')).toHaveClassName('.my-test')
    expect(wrapper.find('.kd-signature')).toHaveStyle('color', 'red')
    expect(wrapper.prop('data-test')).toEqual('test')
  })

  // 7. getContainer
  it('should getContainer use right', () => {
    const mockWarn = jest.fn()
    jest.spyOn(console, 'warn').mockImplementation(mockWarn)
    const TestComp = () => {
      const ref = React.useRef(null)
      return (
        <div ref={ref}>
          <Signature getContainer={() => false}></Signature>
        </div>
      )
    }
    const renderComp = render(<TestComp />)
    expect(renderComp).toMatchSnapshot()
    expect(renderComp.find('kd-modal-container-box')).toBeDefined()

    const AnotherTestComp = () => {
      const ref = React.useRef(null)
      return (
        <div ref={ref}>
          <Signature getContainer={() => false}></Signature>
        </div>
      )
    }
    const anotherRenderComp = render(<AnotherTestComp />)
    expect(anotherRenderComp).toMatchSnapshot()
    expect(anotherRenderComp.find('kd-modal-container-box')).toBeDefined()

    const ClassTestComp = () => {
      return (
        <div className={'test-get-container'}>
          <Signature getContainer={() => false}></Signature>
        </div>
      )
    }
    const classRenderComp = render(<ClassTestComp />)
    expect(classRenderComp).toMatchSnapshot()
    expect(classRenderComp.find('.kd-modal-container-box')).toBeDefined()

    const ErrorTestComp = () => {
      return (
        <div className={'test-get-container'}>
          <Signature getContainer={() => ':::'} />
        </div>
      )
    }
    const errorRenderComp = mount(<ErrorTestComp />)
    expect(errorRenderComp).toMatchSnapshot()
    expect(errorRenderComp.find('.kd-modal-container-box')).toBeDefined()
    expect(mockWarn.mock.calls[0][0]).toMatch(
      'Warning: [kdesign]-modal: getContainer"s returnValue/value is not a correct CSSSelector',
    )
  })
  // 8. width & height
  it('should width & height use right', () => {
    const wrapper = mount(<Signature containerHeight={1000} containerWidth={500} />)
    expect((wrapper.find('.kd-modal-container-box').getDOMNode() as HTMLElement).style.height).toBe('1000px')
    expect((wrapper.find('.kd-modal-container-box').getDOMNode() as HTMLElement).style.width).toBe('500px')
    unmountHelp(wrapper)
  })

  // 9. api test
  it('api test', () => {
    const wrapper = mount(<Signature></Signature>)

    // disabled
    wrapper.setProps({ disabled: true })
    expect(wrapper.find('.kd-signature-disabled').exists()).toBe(true)
    wrapper.setProps({ disabled: false })
    expect(wrapper.find('.kd-signature-disabled').exists()).toBe(false)
  })
  // 10. config provider
  it('should config use config provider', () => {
    const localeData = {
      'Signature.clickToSign': '点击签名',
      'Signature.pleaseWriteHere': '请在此处横向书写签名',
    }
    const signatureConfig = {
      localeConfig: { localeData, locale: 'zh-EN' },
    }
    const wrapper = mount(
      <ConfigProvider value={signatureConfig}>
        <Signature></Signature>
      </ConfigProvider>,
    )
    expect(wrapper.find('.kd-signature')).toHaveText('点击签名')
  })
})
