---
title: 强控制提示弹窗
order: 6
---

提示弹窗可以强制控制提示弹窗关闭显示

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Button, Modal } from '@kdcloudjs/kdesign'

const Demo: React.FC = () => {
  const [visible, setVisible] = React.useState<boolean>(false)
  const clickStatus = React.useRef<boolean>(false)
  const handleClick = (bool: boolean) => {
    setVisible(bool)
  }
  const [time, setTime] = React.useState<number>(5000)
  const bodyStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }
  const [info, setInfo] = React.useState<string>('延时关闭弹窗')
  const [startTimeout, setStartTimeout] = React.useState<boolean>(false)
  const delayTask = React.useCallback(() => {
    if (time === 0) {
      setInfo('延时关闭弹窗')
      setTime(5000)
      setStartTimeout(false)
      return
    }
    setTime((time) => {
      time -= 1000
      setInfo(`延时${time / 1000}秒关闭弹窗`)
      return time
    })
  }, [time])

  React.useEffect(() => {
    let timer
    if (startTimeout === false) {
      setInfo('延时关闭弹窗')
      setTime(5000)
      return
    }
    timer = setTimeout(delayTask, 1000)
    return () => {
      clearTimeout(timer)
    }
  }, [time, startTimeout])

  const closeModal = React.useCallback(() => {
    if (clickStatus.current) return
    clickStatus.current = true
    setInfo(`延时${time / 1000}秒关闭弹窗`)
    setStartTimeout(true)
    setTimeout(() => {
      handleClick(false)
      clickStatus.current = false
    }, 5000)
  }, [time])
  return (
    <>
      <Button
        onClick={() => {
          handleClick(true)
        }}>
        {'点击显示弹窗'}
      </Button>
      <Modal
        body={info}
        bodyStyle={bodyStyle}
        onCancel={() => {
          closeModal()
        }}
        onOk={() => {
          closeModal()
        }}
        type="normal"
        closable={true}
        mask={true}
        focusTriggerAfterClose
        visible={visible}
      />
    </>
  )
}

ReactDOM.render(<Demo />, mountNode)
```
