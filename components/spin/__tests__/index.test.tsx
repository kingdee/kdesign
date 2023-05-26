import React from 'react'
import { render, mount } from 'enzyme'
import Spin, { SpinType } from '../index'
import { SpinTypes } from '../spin'
// import Icon from '../../icon'
import mountTest from '../../../tests/shared/mountTest'
import ConfigProvider from '../../config-provider/index'
import { act } from 'react-dom/test-utils'

describe('Spin', () => {
  mountTest(Spin)
  SpinTypes.forEach((type) => {
    mountTest(() => <Spin type={type} />)
  })

  it('renders correctly', () => {
    expect(render(<Spin>Text</Spin>)).toMatchSnapshot()

    SpinTypes.forEach((type) => {
      expect(render(<Spin type={type}>Text</Spin>)).toMatchSnapshot()
    })
  })

  it('should render custom indicator', () => {
    const customIndicator = <div className="custom-indicator" />
    const result = render(<Spin indicator={customIndicator} />)
    expect(result.first()).toMatchSnapshot()
  })

  it('warns if type is wrong', () => {
    const mockWarn = jest.fn()
    jest.spyOn(console, 'warn').mockImplementation(mockWarn)
    const type = 'who am I' as any as SpinType
    render(<Spin type={type} />)
    expect(mockWarn).toHaveBeenCalledTimes(1)
    expect(mockWarn.mock.calls[0][0]).toMatch("Warning: [kdesign]-spin: cannot found spin type 'who am I'")
  })

  it('render null or undefined spin without errors', () => {
    expect(
      mount(
        <Spin>
          {null}
          {undefined}
        </Spin>,
      ),
    ).not.toBeEmptyRender()

    const notLoadingWrapper = mount(<Spin spinning={false}></Spin>)
    expect(notLoadingWrapper).toBeEmptyRender()
  })

  it('render tip', async () => {
    const wrapper = mount(
      <Spin tip="Loading">
        <div className="content">content</div>
      </Spin>,
    )
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      wrapper.update()
    })
    expect(wrapper.find('.kd-spin')).toHaveClassName('.kd-spin-has-children')
    expect(wrapper.find('.kd-spin').text()).toEqual('Loading')
  })

  it('should have displayName static property', () => {
    const wrapper = mount(<Spin>Text</Spin>)
    expect((wrapper.type() as any).displayName).toBe('Spin')
  })

  it('should class use right', () => {
    const DefaultSpin = mount(<Spin>Text</Spin>)
    expect(DefaultSpin.find('.kd-spin')).toHaveClassName('.kd-spin-page')

    SpinTypes.forEach((type) => {
      const TestSpin = mount(<Spin type={type}>Text</Spin>)
      expect(TestSpin.find(`.kd-spin`)).toHaveClassName(`.kd-spin-${type}`)
    })

    const hasChildSpin = mount(
      <Spin>
        <div></div>
      </Spin>,
    )
    expect(hasChildSpin.find(`.kd-spin`)).toHaveClassName(`.kd-spin-has-children`)
    expect(hasChildSpin.find(`.kd-spin-children-wrapper`)).toExist()
    expect(hasChildSpin.find(`.kd-spin-children-container`)).toExist()
  })

  it('should config use config provider', () => {
    const tagConfig = {
      compDefaultProps: {
        Spin: {
          type: 'component',
        },
      },
    }
    const wrapper = mount(
      <ConfigProvider value={tagConfig}>
        <Spin>Tag Text</Spin>
      </ConfigProvider>,
    )
    expect(wrapper.find('.kd-spin')).toHaveClassName('.kd-spin-component')
  })

  it('should get Spin element from ref', () => {
    const ref = React.createRef()
    mount(<Spin ref={ref} type="page"></Spin>)
    expect(ref.current instanceof HTMLDivElement).toBe(true)
  })
})
