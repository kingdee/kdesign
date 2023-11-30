---
title: 设置浮在顶部
order: 4
---

反馈浮层可以设置显示的持续时间

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { InputNumber, Input, Button, Alert } from '@kdcloudjs/kdesign'

const Demo: React.FC = () => {
  const [delayTime, setDelayTime] = React.useState<number>(0)
  const [banner, setBanner] = React.useState<boolean>(false)
  const ref = React.createRef()
  const inputRef = React.createRef()
  const map = {
    success: '成功提示',
    warning: '警告提示',
    error: '错误提示',
    info: '信息通知',
  }
  const getMessage = (type) => {
    return `这是${map[type]}类型的反馈浮层`
  }
  const [msg, setMsg] = React.useState<string>(getMessage('success'))
  const demoButtonStyle = { margin: '0px 8px 8px 0' }
  const inputStyle = { marginBottom: 8, marginRight: 8, width: 230 }
  const handleTimeClick = () => {
    ref.current && setDelayTime((!isNaN(+ref.current.value) && +ref.current.value) || 0)
  }
  const handleMsgClick = () => {
    inputRef.current &&
      setMsg((msg) => {
        console.log(msg)
        return inputRef.current.value || ''
      })
  }
  const handleClick = () => {
    setBanner(!banner)
  }
  return (
    <>
      <InputNumber style={inputStyle} ref={ref} placeholder="这是反馈浮层消息持续时间, ms为单位" digitLength={5} />
      <Input style={inputStyle} ref={inputRef} placeholder="设置反馈浮层信息" defaultValue="成功提示" />
      <Button type="primary" style={demoButtonStyle} onClick={handleTimeClick}>
        设置反馈浮层消息持续时间
      </Button>
      <Button type="primary" style={demoButtonStyle} onClick={handleClick}>
        设置是否悬浮在顶部
      </Button>
      <Button type="primary" style={demoButtonStyle} onClick={handleMsgClick}>
        设置反馈浮层信息
      </Button>
      <Alert message={msg} type={'success'} delayOffTime={delayTime} banner={banner} />
    </>
  )
}

ReactDOM.render(<Demo />, mountNode)
```
