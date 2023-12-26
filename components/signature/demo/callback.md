---
title: 开始与结束书写的监听回调
order: 6
---


```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Signature } from '@kdcloudjs/kdesign'

const Demo = () => {
  const handleClear = () => {
    console.log('clear了吗')
  }
  const handleOnStart = () => {
    console.log('开始书写')
  }
  const handleOnEnd = () => {
    console.log('结束书写')
  }
  return (
    <div style={{ width: '230px', height: '72px' }}>
      <Signature onStart={handleOnStart} onEnd={handleOnEnd} onClear={handleClear}></Signature>
    </div>
  )
}

ReactDOM.render(<Demo />, mountNode)
```
