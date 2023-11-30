---
title: 反馈浮层类型
order: 0
---

反馈浮层有四种类型: 成功提示、警告提示、错误提示、信息通知（默认为警告提示）

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Alert } from '@kdcloudjs/kdesign'

const Demo:React.FC = () => {
  const map = {
    success: '成功提示',
    warning: '警告提示',
    error: '错误提示',
    info: '信息通知',
  }
  const getMessage = (type) => {
    return `这是${map[type]}类型的反馈浮层`
  }
  return (
    <>
      {Object.keys(map).map((type) => {
        return (
          <Alert key={type} message={getMessage(type)} type={type} delayOffTime={0} closable={true} showIcon={true} />
        )
      })}
    </>
  )
}

ReactDOM.render(<Demo />, mountNode)
```
