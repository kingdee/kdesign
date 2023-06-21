import Notification from '../index'
import { act } from 'react-dom/test-utils'
import React from 'react'
import { sleep } from '../../../tests/utils'

describe('Notification', () => {
  const ALL_TYPE = ['info', 'primary']
  const ALL_PLACEMENT = ['topLeft', 'topRight', 'bottomLeft', 'bottomRight']

  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    Notification.destroy()
    jest.useRealTimers()
  })

  // 1. mount test
  // 2. render test
  it('render test', () => {
    ALL_TYPE.forEach((type) => {
      act(() => {
        Notification[type]({ content: 'test render' })
      })
      expect(document.querySelector(`.kd-notice-${type}`)).toBeTruthy()
      const contentEl = document.querySelector(`.kd-notice-${type} .kd-notice-content-description`) as HTMLElement
      expect(contentEl.textContent).toEqual('test render')
    })

    ALL_PLACEMENT.forEach((placement: any) => {
      act(() => {
        Notification.info({ content: 'test render', placement })
      })
      expect(document.querySelector(`.kd-notice-box-${placement}`)).toBeTruthy()
      const contentEl = document.querySelector(
        `.kd-notice-box-${placement} .kd-notice-content-description`,
      ) as HTMLElement
      expect(contentEl.textContent).toEqual('test render')
    })
  })
  // 3. warns in component
  // 4. render null or undefined without errors
  // 5. displayName
  it('displayName', () => {
    expect(Notification.displayName).toEqual('Notification')
  })
  // 6. class state
  describe('class state', () => {
    // className
    it('className', () => {
      act(() => {
        Notification.open({
          className: 'my-class',
          content: 'test destory',
          duration: 0,
        })
      })
      const el = document.querySelectorAll('.kd-notice')
      expect(el.length).toBe(1)
      expect(el[0].getAttribute('class')).toBe('kd-notice my-class kd-notice-primary')
    })

    // style
    it('style', () => {
      act(() => {
        Notification.open({
          style: { background: 'red' },
          content: 'test',
          duration: 0,
        })
      })
      const el = document.querySelectorAll('.kd-notice')
      expect(el.length).toBe(1)
      expect(el[0].getAttribute('style')).toBe('background: red;')
    })
  })
  // 7.component interaction(event)
  // onClose
  it('onClose', async () => {
    const onClose = jest.fn()
    act(() => {
      Notification.open({
        onClose,
        content: 'test',
        duration: 0,
      })
    })
    expect(document.querySelectorAll('.kd-notice-content-title-close').length).toBe(1)
    const element = document.querySelectorAll('.kd-notice-content-title-close')[0] as HTMLElement
    element.click()
    await sleep(1000)
    expect(onClose).toHaveBeenCalled()
  })

  // destroy
  it('destroy', () => {
    ALL_TYPE.forEach((type) => {
      act(() => {
        Notification[type]({
          key: type,
          content: 'test',
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

  // update
  it('update', () => {
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
  // 8.config provider
  // 9. ref test
  // 10. api test
  describe('api test', () => {
    it('title / footer / content / showIcon / icon', () => {
      act(() => {
        Notification.open({
          title: 'title',
          icon: 'icon',
          showIcon: true,
          footer: <div className={'my-footer'}>footer</div>,
          content: 'content',
          duration: 0,
        })
      })

      expect(document.querySelectorAll('.kd-notice-content-title-left-icon')[0].textContent).toBe('icon')
      expect(document.querySelectorAll('.kd-notice-content-title-left-text')[0].textContent).toBe('title')
      expect(document.querySelectorAll('.my-footer')[0].textContent).toBe('footer')
      expect(document.querySelectorAll('.kd-notice-content-description')[0].textContent).toBe('content')
    })

    it('title / content ReactNode', () => {
      act(() => {
        Notification.open({
          title: <div className={'my-title'}>title</div>,
          content: <div className={'my-content'}>content</div>,
          duration: 0,
        })
      })

      expect(document.querySelectorAll('.my-title')[0].textContent).toBe('title')
      expect(document.querySelectorAll('.my-content')[0].textContent).toBe('content')
    })

    it('closable / closeNode', () => {
      act(() => {
        Notification.open({
          closable: true,
          closeNode: <div className={'my-close'}>X</div>,
          content: 'test',
          duration: 0,
        })
      })

      expect(document.querySelectorAll('.my-close').length).toBe(1)
      expect(document.querySelectorAll('.my-close')[0].textContent).toBe('X')
    })
  })
  // 11. special case
  describe('special case', () => {
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
  })
})
