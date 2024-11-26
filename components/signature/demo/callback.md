---
title: 开始与结束书写的监听回调
order: 6
---

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Signature } from '@kdcloudjs/kdesign'
import type { ISignatureProps } from '@kdcloudjs/kdesign'

const Demo: React.FC = () => {
  const handleClear: ISignatureProps['onClear'] = () => {
    console.log('执行清空')
  }
  const handleOnStart: ISignatureProps['onStart'] = () => {
    console.log('开始书写')
  }
  const handleOnEnd: ISignatureProps['onEnd'] = () => {
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
