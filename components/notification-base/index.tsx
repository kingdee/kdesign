import React from 'react'
import ReactDOM from 'react-dom'
import Notification from './notification'

const notificationInstance: any = {}

const renderNotification = (properties: any, el: HTMLElement, callback?: (instance: any) => void) => {
  const { placement = 'default', ...props } = properties

  let called = false
  const ref = (notices: any) => {
    notificationInstance[placement] = {
      instance: notices,
      el,
    }
    if (called) {
      return
    }
    called = true
    callback && callback(notices)
  }

  ReactDOM.render(<Notification {...props} ref={ref} />, el)
}

const NotificationApi = {
  add: (props: any, el: HTMLElement) => {
    const { placement = 'default' } = props
    if (notificationInstance[placement]) {
      notificationInstance[placement].instance.add(props)
    } else {
      renderNotification(props, el, (instance) => {
        instance.add(props)
      })
    }
  },
  destroy: (key?: React.Key) => {
    if (key) {
      Object.keys(notificationInstance).forEach((placement) => {
        const instance = notificationInstance[placement]?.instance
        if (instance) {
          const { notices } = instance
          if (Array.isArray(notices) && notices.length) {
            const flag = notices.some((notice) => {
              return notice.key === key
            })

            if (flag) {
              instance.remove(key)
            }
          }
        }
      })
    } else {
      Object.keys(notificationInstance).forEach((placement) => {
        const el = notificationInstance[placement]?.el
        if (el) {
          ReactDOM.unmountComponentAtNode(el)
          if (el.parentNode) {
            el.parentNode.removeChild(el)
          }
        }
        notificationInstance[placement] = null
      })
    }
  },
}

export default NotificationApi
