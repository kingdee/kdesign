---
title: 持续时间
order: 2
---

反馈浮层可以设置显示的持续时间

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Alert, InputNumber, Button } from '@kdcloudjs/kdesign'
import type { IAlertProps } from '@kdcloudjs/kdesign'

const Demo: React.FC = () => {
  type Itype = Exclude<IAlertProps['type'], undefined>
  const [delayTime, setDelayTime] = React.useState<IAlertProps['delayOffTime']>(0)
  const ref = React.useRef<HTMLInputElement>(null)
  const map = {
    success: '成功提示',
    warning: '警告提示',
    error: '错误提示',
    info: '信息通知',
  }
  const getMessage = (type: Itype) => {
    return `这是${map[type]}类型的反馈浮层`
  }
  const demoButtonStyle = { margin: '0px 8px 8px 0' }
  const inputStyle = { marginBottom: 8, marginRight: 8, width: 230 }
  const handleTimeClick = () => {
    ref.current && setDelayTime((!isNaN(+ref.current.value) && +ref.current.value) || 0)
  }
  return (
    <>
      <InputNumber
        ref={ref}
        style={inputStyle}
        placeholder="反馈浮层消息持续时间, ms为单位"
        digitLength={5}
        defaultValue={'1000'}
      />
      <Button type="primary" style={demoButtonStyle} onClick={handleTimeClick}>
        设置反馈浮层消息持续时间
      </Button>
      {Object.keys(map).map((type: Itype) => {
        return <Alert key={type} message={getMessage(type)} type={type} delayOffTime={delayTime} />
      })}
    </>
  )
}

ReactDOM.render(<Demo />, mountNode)
```
