---
title: 基本使用
order: 0
---

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Signature } from '@kdcloudjs/kdesign'
import type { ISignatureProps } from '@kdcloudjs/kdesign'

const Demo: React.FC = () => {
  const getPng: ISignatureProps['getSignatureData'] = (data: string) => {
    console.log('getPng===>', data)
  }
  const handleClear: ISignatureProps['onClear'] = () => {
    console.log('执行清空')
  }

  return (
    <div style={{ width: '230px', height: '72px' }}>
      <Signature getSignatureData={getPng} onClear={handleClear}></Signature>
    </div>
  )
}

ReactDOM.render(<Demo />, mountNode)
```
