import React from 'react'
import NotificationApi from '../notification-base'

import Content from './content'
import { NotificationProps } from '../notification-base/notification'
import { NotificationType } from '../notification-base/notice'

export type footerArrayType = {
  name: string
  onClick?: () => void
}

export type NotificationPlacement = 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight'

export type titleType = string | React.ReactNode | undefined

export type configType = string | React.ReactNode

export type footerType = footerArrayType[] | React.ReactNode | undefined

export interface ContentProps {
  closable?: boolean
  content: configType
  title?: titleType
  footer?: footerType
  suffixCls: string
  contentClose: () => void
  type: NotificationType
  icon?: configType
  closeNode?: configType
  showIcon?: boolean
}

export interface ArgsProps extends Partial<NotificationProps> {
  content: configType
  title?: titleType
  footer?: footerType
  placement?: NotificationPlacement
  icon?: configType
  closeNode?: configType
  showIcon?: boolean
}

const defaultPlacement: NotificationPlacement = 'bottomRight'
const defaultDuration = 0
const defaultOffset = '40px'
const defaultStyle = {}
const defaultClosable = true
const defaultShowIcon = false
const defaultSuffixCls = 'notice'
const defaultType = 'primary'
const defaultTitle = '系统提示' // 'notice'
const notificationElements: any = {}
let notificationKey = 1

const getNotificationProps = (args: ArgsProps) => {
  const {
    placement = defaultPlacement,
    duration = defaultDuration,
    key,
    className,
    style = defaultStyle,
    type = defaultType,
    onClose,
    closable = defaultClosable,
    title = defaultTitle,
    footer,
    content,
    icon,
    closeNode,
    showIcon = defaultShowIcon,
  } = args

  const contentClose = () => {
    onClose && onClose(key)
    NotificationApi.destroy(key)
  }

  const contentProps = {
    icon,
    closeNode,
    type,
    title,
    footer,
    content,
    closable,
    showIcon,
    suffixCls: defaultSuffixCls,
    contentClose,
  }

  return {
    duration,
    placement,
    key,
    className: className,
    style,
    content: <Content {...contentProps} />,
    type: type,
    closable: false,
    onClose: onClose,
    suffixCls: defaultSuffixCls,
  }
}

const setStyleByPlacement = (placement: NotificationPlacement, el: HTMLElement) => {
  switch (placement) {
    case 'topLeft':
      el.style.left = defaultOffset
      el.style.top = defaultOffset
      el.style.bottom = 'auto'
      break
    case 'topRight':
      el.style.right = defaultOffset
      el.style.top = defaultOffset
      el.style.bottom = 'auto'
      break
    case 'bottomLeft':
      el.style.left = defaultOffset
      el.style.top = 'auto'
      el.style.bottom = defaultOffset
      break
    default:
      el.style.right = defaultOffset
      el.style.top = 'auto'
      el.style.bottom = defaultOffset
      break
  }
}

const getNotificationHTMLElement = (placement: NotificationPlacement) => {
  const prefixCls = 'kd'
  const suffix = `${prefixCls}-notice`
  let htmlElement: HTMLElement = document.querySelector(`#${suffix}-${placement}`) as HTMLElement
  if (!htmlElement) {
    htmlElement = document.createElement('div')
    htmlElement.id = `${suffix}-${placement}`
    htmlElement.className = `${suffix}-box-${placement}`
    setStyleByPlacement(placement, htmlElement)
    document.body.appendChild(htmlElement)
  }

  return htmlElement
}

const notice = (args: ArgsProps) => {
  const key = args.key || notificationKey++
  const props = getNotificationProps({ ...args, key })
  const { placement } = props
  let el: HTMLElement
  if (notificationElements[placement]) {
    el = notificationElements[placement]
  } else {
    el = getNotificationHTMLElement(placement)
  }
  NotificationApi.add(props, el)
}

const Notification: any = {
  open: notice,
  info: (args: ArgsProps) => {
    return notice({ ...args, type: 'info' })
  },
  primary: (args: ArgsProps) => {
    return notice({ ...args, type: 'primary' })
  },
  destroy: (key?: React.Key) => {
    NotificationApi.destroy(key)
  },
  displayName: 'Notification',
}

export default Notification
