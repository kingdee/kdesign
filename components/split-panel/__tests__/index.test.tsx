import React from 'react'
import { render, mount } from 'enzyme'
import { act } from 'react-dom/test-utils'
import SplitPanel, { SplitPanelModes } from '../split-panel'
import { SplitPanelMode } from '../interface'
import Icon from '../../icon'
import mountTest from '../../../tests/shared/mountTest'
import ConfigProvider from '../../config-provider/index'

const current = {
  clientWidth: 200,
  clientHeight: 200,
  getBoundingClientRect() {
    return {
      top: 0,
      left: 0,
    }
  },
}

jest.mock('react', () => {
  const mockedModule = jest.genMockFromModule('react')
  const originalModule = jest.requireActual('react')
  return Object.assign({}, mockedModule, originalModule, {
    useRef: jest.fn(() =>
      Object.defineProperty({}, 'current', {
        get: () => current,
        set: () => current,
      }),
    ),
  })
})

describe('SplitPanel', () => {
  // 1.mount test
  mountTest(SplitPanel)

  SplitPanelModes.forEach((mode) => {
    mountTest(() => <SplitPanel mode={mode} />)
  })

  // 2.render test
  it('renders correctly', () => {
    SplitPanelModes.forEach((mode) => {
      expect(render(<SplitPanel mode={mode} />)).toMatchSnapshot()
    })
  })

  // 3.render no child without errors
  it('render no child without errors', () => {
    expect(mount(<SplitPanel></SplitPanel>)).toMatchSnapshot()
  })

  // 4.render null or undefined without errors
  it('render null or undefined without errors', () => {
    expect(
      mount(
        <SplitPanel>
          {null}
          {undefined}
        </SplitPanel>,
      ),
    ).toMatchSnapshot()
  })
  // 5.test warn
  // warns if mode is wrong
  it('warns if type is wrong', () => {
    const mockWarn = jest.fn()
    jest.spyOn(console, 'warn').mockImplementation(mockWarn)
    const mode = 'any mode' as SplitPanelMode
    render(<SplitPanel mode={mode} />)
    expect(mockWarn).toHaveBeenCalledTimes(1)
    expect(mockWarn.mock.calls[0][0]).toMatch(
      "Warning: [kdesign]-split-panel: cannot found split-panel mode 'any mode'",
    )
  })

  // warns if defaultSplit is wrong
  it('warns if defaultSplit is wrong', () => {
    const mockWarn = jest.fn()
    jest.spyOn(console, 'warn').mockImplementation(mockWarn)
    const defaultSplit = 'abc'
    render(<SplitPanel defaultSplit={defaultSplit} />)
    expect(mockWarn).toHaveBeenCalledTimes(1)
    expect(mockWarn.mock.calls[0][0]).toMatch("Warning: [kdesign]-split-panel: incorrect prop 'defaultSplit'")
  })

  // 6.displayName
  it('should have displayName static property', () => {
    const wrapper = mount(<SplitPanel></SplitPanel>)
    expect((wrapper.type() as any).displayName).toBe('SplitPanel')
  })

  // 7.className state
  it('should class use right', () => {
    const wrapper = mount(<SplitPanel className="my-test" style={{ color: 'red' }} data-test="test"></SplitPanel>)
    expect(wrapper.prop('data-test')).toEqual('test')
    expect(wrapper.find('.kd-split-wrapper')).toHaveClassName('my-test')
    expect(wrapper.find('.kd-split-wrapper')).toHaveStyle('color', 'red')
  })

  // 8.test defaultSplit compute correctly
  it('test defaultSplit compute correctly', () => {
    const wrapper = mount(<SplitPanel defaultSplit="50px" />)
    expect(wrapper.find('.kd-split-panel').first().prop('style')).toHaveProperty('right', '75%')
    wrapper.setProps({ defaultSplit: '210px' })
    wrapper.update()
    expect(wrapper.find('.kd-split-panel').first().prop('style')).toHaveProperty('right', '0%')
    wrapper.setProps({ defaultSplit: '-10px' })
    wrapper.update()
    expect(wrapper.find('.kd-split-panel').first().prop('style')).toHaveProperty('right', '100%')
  })

  // 9.test compute min and max correctly
  it('test compute min and max correctly', () => {
    const wrapper = mount(<SplitPanel min={0.6} max={0.6} />)
    expect(wrapper.find('.kd-split-panel').first().prop('style')).toHaveProperty('right', '60%')
    wrapper.setProps({
      min: '40px',
      max: '120px',
    })
    wrapper.update()
    expect(wrapper.find('.kd-split-panel').first().prop('style')).toHaveProperty('right', '60%')
    wrapper.setProps({
      min: '120px',
      max: '40px',
    })
    wrapper.update()
    expect(wrapper.find('.kd-split-panel').first().prop('style')).toHaveProperty('right', '40%')
  })

  // 10.test drag trigger line
  it('test drag trigger line', () => {
    document.documentElement.scrollLeft = 0
    document.documentElement.scrollTop = 0
    const onMoveStart = jest.fn()
    const onMoving = jest.fn()
    const onMoveEnd = jest.fn()
    const wrapper = mount(
      <SplitPanel min={0.2} max={0.2} onMoveStart={onMoveStart} onMoving={onMoving} onMoveEnd={onMoveEnd} />,
    )
    wrapper.find('.kd-split-trigger').simulate('mousedown')
    expect(onMoveStart).toHaveBeenCalledTimes(1)
    act(() => {
      const event = new MouseEvent('mousemove')
      Object.defineProperties(event, {
        pageX: {
          value: 50,
        },
        pageY: {
          value: 50,
        },
      })
      document.dispatchEvent(event)
    })
    expect(onMoving).toHaveBeenCalledTimes(1)
    wrapper.update()
    expect(wrapper.find('.kd-split-panel').first().prop('style')).toHaveProperty('right', '75%')
    act(() => {
      const event = new MouseEvent('mouseup')
      document.dispatchEvent(event)
    })
    expect(onMoveEnd).toHaveBeenCalledTimes(1)
  })

  // 11.test move instance is over the min or max value
  it('test move instance is over the min or max value', () => {
    document.documentElement.scrollLeft = 0
    document.documentElement.scrollTop = 0
    const onMoveStart = jest.fn()
    const onMoveEnd = jest.fn()
    const wrapper = mount(<SplitPanel min={0.2} max={0.2} onMoveStart={onMoveStart} onMoveEnd={onMoveEnd} />)
    wrapper.find('.kd-split-trigger').simulate('mousedown')
    expect(onMoveStart).toHaveBeenCalledTimes(1)
    act(() => {
      const event = new MouseEvent('mousemove')
      Object.defineProperties(event, {
        pageX: {
          value: 10,
        },
        pageY: {
          value: 10,
        },
      })
      document.dispatchEvent(event)
    })
    wrapper.update()
    expect(wrapper.find('.kd-split-panel').first().prop('style')).toHaveProperty('right', '80%')
    act(() => {
      const event = new MouseEvent('mousemove')
      Object.defineProperties(event, {
        pageX: {
          value: 190,
        },
        pageY: {
          value: 190,
        },
      })
      document.dispatchEvent(event)
    })
    wrapper.update()
    expect(wrapper.find('.kd-split-panel').first().prop('style')).toHaveProperty('right', '20%')
    act(() => {
      const event = new MouseEvent('mouseup')
      document.dispatchEvent(event)
    })
    expect(onMoveEnd).toHaveBeenCalledTimes(1)
  })

  // 12.Api test
  it('test fold correctly', () => {
    const onFold = jest.fn()
    const wrapper = mount(<SplitPanel min={0.2} max={0.2} onFold={onFold} />)
    const firstFoldNode = wrapper.find('.kd-split-trigger-arrow').first()
    const lastFoldNode = wrapper.find('.kd-split-trigger-arrow').last()
    act(() => {
      firstFoldNode.simulate('click')
    })
    wrapper.update()
    expect(wrapper.find('.kd-split-panel').first().prop('style')).toHaveProperty('right', '100%')
    act(() => {
      lastFoldNode.simulate('click')
    })
    wrapper.update()
    expect(wrapper.find('.kd-split-panel').first().prop('style')).toHaveProperty('right', '80%')
    act(() => {
      lastFoldNode.simulate('click')
    })
    wrapper.update()
    expect(wrapper.find('.kd-split-panel').first().prop('style')).toHaveProperty('right', '50%')
    act(() => {
      lastFoldNode.simulate('click')
    })
    wrapper.update()
    expect(wrapper.find('.kd-split-panel').first().prop('style')).toHaveProperty('right', '0%')
    act(() => {
      firstFoldNode.simulate('click')
    })
    wrapper.update()
    expect(wrapper.find('.kd-split-panel').first().prop('style')).toHaveProperty('right', '20%')
    act(() => {
      firstFoldNode.simulate('click')
    })
    wrapper.update()
    expect(wrapper.find('.kd-split-panel').first().prop('style')).toHaveProperty('right', '50%')
  })

  it('test disable mode', () => {
    const onFold = jest.fn()
    const onMoveStart = jest.fn()
    const wrapper = mount(<SplitPanel disabled min={0.2} max={0.2} onFold={onFold} onMoveStart={onMoveStart} />)
    const firstFoldNode = wrapper.find('.kd-split-trigger-arrow').first()
    const lastFoldNode = wrapper.find('.kd-split-trigger-arrow').last()
    wrapper.find('.kd-split-trigger').simulate('mousedown')
    expect(onMoveStart).not.toHaveBeenCalled()
    firstFoldNode.simulate('click')
    lastFoldNode.simulate('click')
    expect(onFold).not.toHaveBeenCalled()
  })

  it('test custom lineStyle', () => {
    const lineStyle = (mode: SplitPanelMode) => {
      if (mode === 'horizontal') {
        return { width: '2px', background: '#5582f3' }
      }
    }
    const wrapper = mount(<SplitPanel lineStyle={lineStyle} />)
    expect(wrapper.find('.kd-split-trigger').prop('style')).toEqual({
      width: '2px',
      background: '#5582f3',
    })
  })

  it('test canFold is false', () => {
    const wrapper = mount(<SplitPanel canFold={false} />)
    expect(wrapper.find('.kd-split-trigger-arrow').length).toBe(0)
  })

  it('test custom foldIcons', () => {
    const foldIcons = (mode: SplitPanelMode) => {
      if (mode === 'horizontal') {
        return [<Icon type="arrow-left" key="arrow-left" />, <Icon type="arrow-right" key="arrow-right" />]
      }
    }
    const wrapper = mount(<SplitPanel foldIcons={foldIcons} />)
    expect(wrapper.find('.kdicon-arrow-left').length).toBe(1)
    expect(wrapper.find('.kdicon-arrow-right').length).toBe(1)
  })

  // 13.config provider
  it('should config use config provider', () => {
    const splitPanelConfig = {
      compDefaultProps: {
        SplitPanel: {
          mode: 'vertical',
          defaultSplit: 0.7,
        },
      },
    }
    const wrapper = mount(
      <ConfigProvider value={splitPanelConfig}>
        <SplitPanel />
      </ConfigProvider>,
    )
    expect(wrapper.find('.kd-split-vertical').exists()).toBe(true)
    expect(wrapper.find('.kd-split-trigger-con').prop('style')).toHaveProperty('top', '70%')
  })
})
