import React from 'react'
import { mount, render, ReactWrapper } from 'enzyme'
import Alert from '../index'
import { AlertTypes, AlertType, allBannerAlertPortals } from '../alert'
import { act } from 'react-dom/test-utils'
import mountTest from '../../../tests/shared/mountTest'
import ConfigProvider from '../../config-provider/index'
jest.useFakeTimers()

describe('Alert', () => {
  mountTest(Alert!)
  AlertTypes.forEach((type) => {
    mountTest(() => <Alert type={type} delayOffTime={0} />)
  })
  it('renders correctly', () => {
    expect(render(<Alert />)).toMatchSnapshot()
    AlertTypes.forEach((type) => {
      expect(render(<Alert type={type} delayOffTime={0} />)).toMatchSnapshot()
    })
  })
  it('warns if type is wrong', () => {
    const mockWarn = jest.fn()
    jest.spyOn(console, 'warn').mockImplementation(mockWarn)
    const type = 'who am I' as any as AlertType
    render(<Alert type={type} delayOffTime={0} />)
    expect(mockWarn).toHaveBeenCalledTimes(1)
    expect(mockWarn.mock.calls[0][0]).toMatch("Warning: [kdesign]-alert: cannot found alert type 'who am I'")
  })

  it('should have displayName static property', () => {
    const wrapper = mount(<Alert type={'success'} delayOffTime={0}></Alert>)
    expect((wrapper.type() as any).displayName).toBe('Alert')
  })

  it('should delayOffTime, is zero, can be stay at original placement; is not zero, can be unvisible after delayOffTime ms', async () => {
    let wrapper: ReactWrapper
    await act(async () => {
      wrapper = mount(<Alert type={'success'} message={'Alert Component1'} delayOffTime={0} />)
    })
    let unvisibleWrapper: ReactWrapper
    await act(async () => {
      unvisibleWrapper = mount(<Alert type={'success'} message={'Alert Component1'} delayOffTime={1000} />)
    })
    expect(wrapper!.exists('.kd-alert-visible')).toBe(true)
    jest.runTimersToTime(1000)
    unvisibleWrapper!.update()
    expect(wrapper!.exists('.kd-alert-visible')).toBe(true)
    expect(unvisibleWrapper!.exists('.kd-alert-visible')).toBe(false)
    unvisibleWrapper!.setProps({
      delayOffTime: 0,
    })
    unvisibleWrapper!.update()
    expect(unvisibleWrapper!.exists('.kd-alert-visible')).toBe(true)
    wrapper!.setProps({
      delayOffTime: 1000,
    })
    expect(wrapper!.exists('.kd-alert-visible')).toBe(true)
    jest.runTimersToTime(1000)
    wrapper!.update()
    expect(wrapper!.exists('.kd-alert-visible')).toBe(false)
  })

  it('should showIcon & closable use right', () => {
    const showIconClosableArray = [
      [true, true],
      [true, false],
      [false, true],
      [false, false],
    ]
    showIconClosableArray.forEach(([showIcon, closable]) => {
      expect(
        render(<Alert type={'success'} showIcon={showIcon} closable={closable} delayOffTime={0} />),
      ).toMatchSnapshot()
    })
  })

  it('should class use right', () => {
    const wrapper = mount(
      <Alert type={'success'} message={'Alert Component'} delayOffTime={0} className={'class-test'} />,
    )
    expect(wrapper.exists('.class-test')).toBe(true)
  })

  it('should banner & bannerOffset use right', () => {
    const wrapper = mount(
      <Alert type={'success'} message={'Alert Component'} delayOffTime={0} banner className={'banner-test-a'} />,
    )
    const containerleft0Top0 = document.body.querySelector('.kd-alert-banner-container')
    expect(getComputedStyle(containerleft0Top0!, null).getPropertyValue('left')).toBe('0px')
    expect(getComputedStyle(containerleft0Top0!, null).getPropertyValue('top')).toBe('0px')
    expect(containerleft0Top0?.children.length).toBe(1)
    expect(allBannerAlertPortals.size).toBe(1)
    const otherWrapper = mount(
      <Alert type={'success'} message={'Alert Component1'} delayOffTime={0} banner className={'banner-test-b'} />,
    )
    expect(containerleft0Top0?.children.length).toBe(2)
    expect(allBannerAlertPortals.size).toBe(1)
    expect(containerleft0Top0?.children[0].classList.contains('banner-test-a')).toBe(true)
    expect(containerleft0Top0?.children[1].classList.contains('banner-test-b')).toBe(true)
    otherWrapper.setProps({
      bannerOffset: [10, 10],
    })
    otherWrapper.update()
    expect(document.body.querySelectorAll('.kd-alert-banner-container').length).toBe(2)
    expect(allBannerAlertPortals.size).toBe(2)
    const containerleft10Top10 = document.body.querySelectorAll('.kd-alert-banner-container')[1]
    expect(containerleft10Top10?.children[0].classList.contains('banner-test-b')).toBe(true)
    expect(containerleft0Top0?.children.length).toBe(1)
    expect(containerleft10Top10?.children.length).toBe(1)
    expect(getComputedStyle(containerleft10Top10!, null).getPropertyValue('left')).toBe('10px')
    expect(getComputedStyle(containerleft10Top10!, null).getPropertyValue('top')).toBe('10px')
    wrapper.setProps({
      bannerOffset: [10, 20],
    })
    wrapper.update()
    // containerleft0Top0 to be removed
    jest.runAllTimers()
    const containerleft10Top20 = document.body.querySelectorAll('.kd-alert-banner-container')[1]
    expect(containerleft10Top20?.children[0].classList.contains('banner-test-a')).toBe(true)
    expect(containerleft10Top10?.children.length).toBe(1)
    expect(containerleft10Top20?.children.length).toBe(1)
    expect(containerleft0Top0?.children.length).toBe(0)
    expect(document.body.querySelectorAll('.kd-alert-banner-container').length).toBe(2)
    expect(allBannerAlertPortals.size).toBe(2)
    expect(getComputedStyle(containerleft10Top10!, null).getPropertyValue('left')).toBe('10px')
    expect(getComputedStyle(containerleft10Top10!, null).getPropertyValue('top')).toBe('10px')
    expect(getComputedStyle(containerleft10Top20!, null).getPropertyValue('left')).toBe('10px')
    expect(getComputedStyle(containerleft10Top20!, null).getPropertyValue('top')).toBe('20px')
  })

  it('should icon use right', () => {
    const iconFC = function () {
      return <div className="icon-customed" />
    }
    const wrapper = mount(
      <Alert type={'success'} message={'Alert Component'} delayOffTime={0} banner icon={iconFC()} />,
    )
    expect(wrapper.exists('.icon-customed')).toBe(false)
    wrapper.setProps({
      showIcon: true,
    })
    wrapper.update()
    expect(wrapper.exists('.icon-customed')).toBe(true)
  })

  it('should closeNode use right', () => {
    const closeNodeFC = function () {
      return <div className="closeNode-customed" />
    }
    const wrapper = mount(
      <Alert type={'info'} message={'Alert Component'} delayOffTime={0} banner closeNode={closeNodeFC()} />,
    )
    expect(wrapper.exists('.closeNode-customed')).toBe(false)
    wrapper.setProps({
      closable: true,
    })
    wrapper.update()
    expect(wrapper.exists('.closeNode-customed')).toBe(true)
  })

  it('should extra use right', () => {
    const extraFC = function () {
      return <div className="extra-customed" />
    }
    const wrapper = mount(
      <Alert type={'success'} message={'Alert Component'} delayOffTime={0} banner extra={extraFC()} />,
    )
    expect(wrapper.exists('.extra-customed')).toBe(true)
  })

  it('should config use config provider', () => {
    const alertConfig = {
      compDefaultProps: {
        Alert: {
          type: 'success',
        },
      },
    }
    const wrapper = mount(
      <ConfigProvider value={alertConfig}>
        <Alert delayOffTime={0}></Alert>
      </ConfigProvider>,
    )
    expect(wrapper.find('.kd-alert-container')).toHaveClassName('.alert-success-bg-color.alert-success-font-color')
  })

  it('test click', () => {
    const onClose = jest.fn()
    const wrapper = mount(<Alert type={'info'} showIcon closable onClose={onClose} delayOffTime={0} />)
    act(() => {
      wrapper.find('.kd-alert-close-icon').simulate('click')
    })
    expect(onClose).toHaveBeenCalled()
  })

  it('test mouseover & mouseout', async () => {
    const onClose = jest.fn()
    let wrapper: ReactWrapper
    await act(async () => {
      wrapper = mount(
        <Alert type={'success'} message={'test mouseover & mouseout'} showIcon closable onClose={onClose} />,
      )
    })
    jest.runTimersToTime(4900)
    expect(wrapper!.exists('.kd-alert-visible')).toBe(true)
    await act(async () => {
      wrapper!.find('.kd-alert-container').simulate('mouseover')
    })
    jest.runTimersToTime(5000)
    wrapper!.update()
    expect(wrapper!.exists('.kd-alert-visible')).toBe(true)
    await act(async () => {
      wrapper.find('.kd-alert-container').simulate('mouseout')
    })
    jest.runTimersToTime(5000)
    wrapper!.update()
    expect(wrapper!.exists('.kd-alert-visible')).toBe(false)
    expect(onClose).not.toHaveBeenCalled()
  })
})
