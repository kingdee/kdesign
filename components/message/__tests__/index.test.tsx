import Message from '../index'
import { act } from 'react-dom/test-utils'

describe('Message', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    Message.destroy()
    jest.useRealTimers()
  })

  const ALL_TYPE = ['success', 'warning', 'error', 'info']

  it('all type message renders correctly', () => {
    ALL_TYPE.forEach((type) => {
      act(() => {
        Message[type]('test render', 0)
      })
      expect(document.querySelector(`.kd-message-${type}`)).toBeTruthy()
      const contentEl = document.querySelector(`.kd-message-${type} .kd-message-content-text`) as HTMLElement
      expect(contentEl.textContent).toEqual('test render')
    })
  })

  it('trigger onClose method', () => {
    const onClose = jest.fn()
    act(() => {
      Message.open({
        onClose,
        content: 'test destory',
        duration: 0,
      })
    })
    expect(document.querySelectorAll('.kd-message-content-close').length).toBe(1)
    const element = document.querySelectorAll('.kd-message-content-close')[0] as HTMLElement
    element.click()
    expect(onClose).toHaveBeenCalled()
  })

  it('should destroy messages correctly', () => {
    ALL_TYPE.forEach((type) => {
      act(() => {
        Message[type]({
          key: type,
          content: 'test destory',
          duration: 0,
        })
      })
    })
    expect(document.querySelectorAll('.kd-message').length).toBe(4)

    act(() => {
      Message.destroy('success')
    })

    expect(document.querySelectorAll('.kd-message').length).toBe(3)
    const el = document.querySelector('.kd-message-success') || 0
    expect(el).toEqual(0)

    act(() => {
      Message.destroy()
    })
    expect(document.querySelectorAll('.kd-message').length).toBe(0)
  })

  it('should update messages by key correctly', () => {
    act(() => {
      Message.success({
        key: 'message_key',
        content: 'test update',
        closable: false,
        duration: 0,
      })
    })
    expect(document.querySelector('.kd-message-success')).toBeTruthy()
    expect(document.querySelector('.kd-message-success .kd-message-content-close')).toBeFalsy()

    const contentEl = document.querySelector('.kd-message .kd-message-content-text') as HTMLElement
    expect(contentEl.textContent).toEqual('test update')

    act(() => {
      Message.error({
        key: 'message_key',
        content: 'already update',
        closable: true,
        duration: 2000,
      })
    })

    expect(document.querySelector('.kd-message-success')).toBeFalsy()
    expect(document.querySelector('.kd-message-error')).toBeTruthy()
    expect(document.querySelector('.kd-message-error .kd-message-content-close')).toBeTruthy()
    expect(contentEl.textContent).toEqual('already update')
  })

  it('should be able to config style', () => {
    act(() => {
      Message.success({
        content: 'test custom style',
        duration: 0,
        style: {
          marginTop: '20vh',
        },
      })
    })
    const el = document.querySelector('.kd-message-success') as HTMLElement
    expect(el.style.marginTop).toBe('20vh')
  })

  it('close message trigger onClose with key argument when using the onClose arguments', () => {
    let closeCount = 0
    act(() => {
      Message.success({
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
      Message.success({
        content: 'test mouse over',
        duration: 1000,
      })
    })
    const el = document.querySelector('.kd-message-success') as HTMLElement
    expect(el).toBeTruthy()

    act(() => {
      const mouseenterEvent = new Event('mouseenter')
      el.dispatchEvent(mouseenterEvent)
      jest.runTimersToTime(1000)
    })

    expect(el).toBeTruthy()
  })
})
