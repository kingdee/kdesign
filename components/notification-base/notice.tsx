import React, { FC, useCallback, useContext, useEffect, useRef } from 'react'
import classNames from 'classnames'
import ConfigContext from '../config-provider/ConfigContext'
import { getCompProps } from '../_utils'
import { tuple } from '../_utils/type'

export const NotificationTypes = tuple('success', 'warning', 'error', 'info', 'primary')
export type NotificationType = typeof NotificationTypes[number]

export interface NoticeProps {
  className?: string
  content: React.ReactNode
  closable: boolean
  duration: number
  onClose?: (key?: any) => void
  type?: NotificationType
  suffixCls: string
  key: React.Key
  style?: React.CSSProperties
}

const Notice: FC<NoticeProps> = (props) => {
  const { getPrefixCls, prefixCls, compDefaultProps: userDefaultProps } = useContext(ConfigContext)
  const noticeProps = getCompProps('Notice', userDefaultProps, props)
  const {
    prefixCls: customPrefixcls,
    className,
    content,
    closable,
    duration,
    style,
    type,
    onClose,
    suffixCls,
    key,
  } = noticeProps
  const noticePrefixCls = getPrefixCls!(prefixCls, suffixCls, customPrefixcls)
  let timer: any = null
  let isTransition = false
  const noticeRef = useRef<any>()

  const noticeClasses = classNames(noticePrefixCls, className, {
    [`${noticePrefixCls}-${type}`]: type,
    [`${noticePrefixCls}-closable`]: closable,
  })

  const animationEvent = () => {
    noticeRef.current?.classList.remove(`${noticePrefixCls}-leave`)
    noticeRef.current?.classList.add(`${noticePrefixCls}-leave-after`)
  }

  const transitionEvent = () => {
    if (!isTransition) {
      onClose && onClose(key)
    }
    isTransition = true
  }

  const clearEventListener = () => {
    noticeRef.current?.removeEventListener('animationend', animationEvent)
    noticeRef.current?.removeEventListener('transitionend', transitionEvent)
  }

  const handleClose = () => {
    isTransition = false
    noticeRef.current?.classList.add(`${noticePrefixCls}-leave`)
    noticeRef.current?.addEventListener('animationend', animationEvent)
    noticeRef.current?.addEventListener('transitionend', transitionEvent)
  }

  const startCloseTimer = useCallback(() => {
    if (!duration) return
    timer = setTimeout(() => {
      handleClose()
    }, duration)
  }, [duration])

  const clearCloseTimer = useCallback(() => {
    if (timer) {
      clearTimeout(timer)
      timer = null
    }
  }, [duration])

  useEffect(() => {
    startCloseTimer()
    return () => {
      clearCloseTimer()
      clearEventListener()
    }
  }, [duration])

  return (
    <div
      className={noticeClasses}
      style={style}
      onMouseEnter={clearCloseTimer}
      onMouseLeave={startCloseTimer}
      ref={noticeRef}
    >
      <div className={`${noticePrefixCls}-content`}>{content}</div>
    </div>
  )
}

Notice.displayName = 'Notice'

export default Notice
