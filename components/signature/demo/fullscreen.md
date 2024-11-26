---
title: 书写板放大
order: 3
---

点击 modal 弹窗的右上角放大 icon，可一键放大

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Signature } from '@kdcloudjs/kdesign'
import type { ISignatureProps } from '@kdcloudjs/kdesign'

const Demo: React.FC = () => {
  const handleClear: ISignatureProps['onClear'] = () => {
    console.log('执行清空')
  }
  return (
    <div style={{ width: '230px', height: '72px' }}>
      <Signature canFullScreen onClear={handleClear}></Signature>
    </div>
  )
}

ReactDOM.render(<Demo />, mountNode)
```
