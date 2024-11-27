import React, { useImperativeHandle, useState } from 'react'
import Notice, { NoticeProps } from './notice'

export interface NotificationProps extends NoticeProps {
  placement: string
}

export interface INotificationRef {
  add: (props: NotificationProps) => void
  remove: (key?: React.Key) => void
  placement: string
  notices: NotificationProps[]
}

let seed = 0
const now = Date.now()

function getUuid() {
  const id = seed
  seed += 1
  return `msg_${now}_${id}`
}

const Notification = React.forwardRef<INotificationRef, NotificationProps>((props, ref) => {
  const { placement } = props
  const [notices, setNotices] = useState<NotificationProps[]>([])

  useImperativeHandle(
    ref,
    () => ({
      add,
      remove,
      placement,
      notices,
    }),
    [notices],
  )

  const add = (addProps: NotificationProps) => {
    const key = addProps.key || getUuid()
    const notice: NotificationProps = {
      ...addProps,
      key,
    }
    const pns = [...notices]
    const updatedNotices = pns.concat()
    const noticeIndex = pns.map((v: NotificationProps) => v.key).indexOf(key)
    if (~noticeIndex) {
      updatedNotices.splice(noticeIndex, 1, notice)
    } else {
      updatedNotices.push(notice)
    }
    setNotices(updatedNotices)
  }

  const remove = (key: React.Key) => {
    setNotices((preNotices) => preNotices.filter((notice: NotificationProps) => notice.key !== key))
  }

  const onClose = (notice: NotificationProps) => {
    remove(notice.key || '')
    notice.onClose && notice.onClose(notice.key)
  }

  return (
    <React.Fragment>
      {notices.map((notice: NotificationProps) => {
        return <Notice {...notice} key={notice.key} onClose={() => onClose(notice)} />
      })}
    </React.Fragment>
  )
})

Notification.displayName = 'Notification'

export default Notification
