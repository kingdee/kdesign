import Notification from '../index'
import { act } from 'react-dom/test-utils'

describe('Notification', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    Notification.destroy()
    jest.useRealTimers()
  })

  const ALL_TYPE = ['info', 'primary']

  it('all type notification renders correctly', () => {
    ALL_TYPE.forEach((type) => {
      act(() => {
        Notification[type]({ content: 'test render' })
      })
      expect(document.querySelector(`.kd-notice-${type}`)).toBeTruthy()
      const contentEl = document.querySelector(`.kd-notice-${type} .kd-notice-content-description`) as HTMLElement
      expect(contentEl.textContent).toEqual('test render')
    })
  })

  it('trigger onClose method', () => {
    const onClose = jest.fn()
    act(() => {
      Notification.open({
        onClose,
        content: 'test destory',
        duration: 0,
      })
    })
    expect(document.querySelectorAll('.kd-notice-content-title-close').length).toBe(1)
    const element = document.querySelectorAll('.kd-notice-content-title-close')[0] as HTMLElement
    element.click()
    expect(onClose).toHaveBeenCalled()
  })

  it('should destroy messages correctly', () => {
    ALL_TYPE.forEach((type) => {
      act(() => {
        Notification[type]({
          key: type,
          content: 'test destory',
          duration: 0,
        })
      })
    })
    expect(document.querySelectorAll('.kd-notice').length).toBe(2)

    act(() => {
      Notification.destroy('info')
    })

    expect(document.querySelectorAll('.kd-notice').length).toBe(1)
    const el = document.querySelector('.kd-notice-info') || 0
    expect(el).toEqual(0)

    act(() => {
      Notification.destroy()
    })
    expect(document.querySelectorAll('.kd-notice').length).toBe(0)
  })

  it('should update messages by key correctly', () => {
    act(() => {
      Notification.info({
        key: 'message_key',
        content: 'test update',
        closable: false,
        duration: 0,
      })
    })
    expect(document.querySelector('.kd-notice-info')).toBeTruthy()
    expect(document.querySelector('.kd-notice-info .kd-notice-content-title-close')).toBeFalsy()

    const contentEl = document.querySelector('.kd-notice .kd-notice-content-description') as HTMLElement
    expect(contentEl.textContent).toEqual('test update')

    act(() => {
      Notification.primary({
        key: 'message_key',
        content: 'already update',
        closable: true,
        duration: 2000,
      })
    })

    expect(document.querySelector('.kd-notice-info')).toBeFalsy()
    expect(document.querySelector('.kd-notice-primary')).toBeTruthy()
    expect(document.querySelector('.kd-notice-primary .kd-notice-content-title-close')).toBeTruthy()
    expect(contentEl.textContent).toEqual('already update')
  })

  it('should be able to config style', () => {
    act(() => {
      Notification.info({
        content: 'test custom style',
        duration: 0,
        style: {
          marginTop: '20vh',
        },
      })
    })
    const el = document.querySelector('.kd-notice-info') as HTMLElement
    expect(el.style.marginTop).toBe('20vh')
  })

  it('close message trigger onClose with key argument when using the onClose arguments', () => {
    let closeCount = 0
    act(() => {
      Notification.info({
        content: 'test custom style',
        key: 'callback',
        onClose: (key: string) => {
          expect(key).toBe('callback')
          closeCount += 1
        },
      })
    })

    expect(closeCount).toEqual(0)

    act(() => {
      jest.runTimersToTime(3000)
    })
    expect(closeCount).toEqual(0)
  })

  it('should display when mouse over', () => {
    act(() => {
      Notification.info({
        content: 'test mouse over',
        duration: 1000,
      })
    })
    const el = document.querySelector('.kd-notice-info') as HTMLElement
    expect(el).toBeTruthy()

    act(() => {
      const mouseenterEvent = new Event('mouseenter')
      el.dispatchEvent(mouseenterEvent)
      jest.runTimersToTime(1000)
    })

    expect(el).toBeTruthy()
  })
})
