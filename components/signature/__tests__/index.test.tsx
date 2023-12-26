import React from 'react'
import { render, mount } from 'enzyme'
import Signature from '../index'
import mountTest from '../../../tests/shared/mountTest'
import ConfigProvider from '../../config-provider/index'

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

  // 7. config provider
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

  // 10. api test
  it('api test', () => {
    const wrapper = mount(<Signature></Signature>)

    // disabled
    wrapper.setProps({ disabled: true })
    expect(wrapper.find('.kd-signature-disabled').exists()).toBe(true)
    wrapper.setProps({ disabled: false })
    expect(wrapper.find('.kd-signature-disabled').exists()).toBe(false)
  })
})
