import React from 'react'
import { render, mount } from 'enzyme'
import Spin, { SpinType } from '../index'
import { SpinTypes } from '../spin'
// import Icon from '../../icon'
import mountTest from '../../../tests/shared/mountTest'
import ConfigProvider from '../../config-provider/index'

describe('Spin', () => {
  // 1. mount test
  mountTest(Spin)
  SpinTypes.forEach((type) => {
    mountTest(() => <Spin type={type} />)
  })

  // 2. render test
  it('renders correctly', () => {
    expect(render(<Spin>Text</Spin>)).toMatchSnapshot()

    SpinTypes.forEach((type) => {
      expect(render(<Spin type={type}>Text</Spin>)).toMatchSnapshot()
    })
  })

  // 3. warns in component
  it('warns if type is wrong', () => {
    const mockWarn = jest.fn()
    jest.spyOn(console, 'warn').mockImplementation(mockWarn)
    const type = 'who am I' as any as SpinType
    render(<Spin type={type} />)
    expect(mockWarn).toHaveBeenCalledTimes(1)
    expect(mockWarn.mock.calls[0][0]).toMatch("Warning: [kdesign]-spin: cannot found spin type 'who am I'")
  })

  // 4. render null or undefined without errors
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

  // 5. displayName
  it('should have displayName static property', () => {
    const wrapper = mount(<Spin>Text</Spin>)
    expect((wrapper.type() as any).displayName).toBe('Spin')
  })

  // 6. class state
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

  // 8.config provider
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

  // 9. ref test
  it('should get Spin element from ref', () => {
    const ref = React.createRef()
    mount(<Spin ref={ref} type="page"></Spin>)
    expect(ref.current instanceof HTMLDivElement).toBe(true)
  })
})
