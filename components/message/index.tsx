import React from 'react'
import { NotificationProps } from '../notification-base/notification'
import NotificationApi from '../notification-base'
import Content from './content'
import { NotificationType } from '../notification-base/notice'

export type ConfigContent = React.ReactNode | string
export type JointContent = ConfigContent | ArgsProps

export interface ContentProps {
  closable?: boolean
  icon?: ConfigContent
  closeNode?: ConfigContent
  content: ConfigContent
  contentClose: () => void
  suffixCls: string
  type: NotificationType
}

export interface ArgsProps extends Partial<NotificationProps> {
  content: ConfigContent
  icon?: ConfigContent
  closeNode?: ConfigContent
}

const defaultStyle = {}
const defaultDuration = 3000
const defaultClosable = false
const defaultOffset = '40px'
const defaultSuffixCls = 'message'
const defaultPlacement = 'message'
const defaultType: NotificationType = 'info'

let messageKey = 1
const messageElement: HTMLElement | null = null

function isArgsProps(content: unknown): content is ArgsProps {
  return Object.prototype.toString.call(content) === '[object Object]' && !!(content as ArgsProps).content
}

const getNotificationProps = (args: ArgsProps): Partial<NotificationProps> => {
  const {
    duration = defaultDuration,
    key,
    className,
    style = defaultStyle,
    type = defaultType,
    onClose,
    closable = defaultClosable,
    content,
    icon,
    closeNode,
  } = args

  const contentClose = () => {
    if (onClose) onClose(key)
    NotificationApi.destroy(key)
  }

  const contentProps: ContentProps = {
    type,
    icon,
    closeNode,
    content,
    closable,
    suffixCls: defaultSuffixCls,
    contentClose,
  }

  return {
    duration,
    key,
    className,
    style,
    type,
    closable,
    onClose,
    placement: defaultPlacement,
    content: <Content {...contentProps} />,
    suffixCls: defaultSuffixCls,
  }
}

const getNotificationHTMLElement = (): HTMLElement => {
  const prefixCls = 'kd'
  const suffix = `${prefixCls}-message`
  let htmlElement = document.querySelector(`#${suffix}`) as HTMLElement
  if (!htmlElement) {
    htmlElement = document.createElement('div')
    htmlElement.id = suffix
    htmlElement.className = `${suffix}-box`
    htmlElement.style.top = defaultOffset
    document.body.appendChild(htmlElement)
  }
  return htmlElement
}

const notice = (args: ArgsProps) => {
  const key = args.key || messageKey++
  const props = getNotificationProps({ ...args, key })
  const el = messageElement || getNotificationHTMLElement()
  NotificationApi.add(props, el)
}

type MessageTypeFn = (content: JointContent, duration?: number, onClose?: () => void) => void

const Message: Record<string, MessageTypeFn> & {
  open: (args: ArgsProps) => void
  destroy: (key?: React.Key) => void
} = {
  open: notice,
  destroy: (key?: React.Key) => {
    NotificationApi.destroy(key)
  },
}

;['success', 'warning', 'error', 'info'].forEach((type: NotificationType) => {
  Message[type] = (content: JointContent, duration?: number, onClose?: () => void) => {
    if (isArgsProps(content)) {
      return Message.open({ ...content, type })
    }

    if (typeof duration === 'function') {
      onClose = duration
      duration = undefined
    }

    return Message.open({ content, duration, type, onClose })
  }
})

export default Message
