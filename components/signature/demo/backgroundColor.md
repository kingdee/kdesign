---
title: jpeg格式背景色
order: 5
---

png 和 svg 格式是透明的，jpeg 格式可以设置背景色，默认为白色。

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Signature } from '@kdcloudjs/kdesign'
import type { ISignatureProps } from '@kdcloudjs/kdesign'

const Demo: React.FC = () => {
  const [penColor] = React.useState<string>('black')

  const handleClear: ISignatureProps['onClear'] = () => {
    console.log('clear')
  }
  return (
    <div style={{ width: '230px', height: '72px' }}>
      <Signature onClear={handleClear} dataUrlType="jpeg" backgroundColor="#5582f3" penColor={penColor}></Signature>
    </div>
  )
}

ReactDOM.render(<Demo />, mountNode)
```
