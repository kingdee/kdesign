---
title: 书写板放大
order: 3
---

点击modal弹窗的右上角放大icon，可一键放大

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Signature } from '@kdcloudjs/kdesign'

const Demo: React.FC = () => {
  const getPng = (data:string) => {
    console.log('getPng===>', data)
  }
  const handleClear = () => {
    console.log('执行清空')
  }
  return (
    <div style={{ width: '230px', height: '72px' }}>
      <Signature
        canFullScreen
        onClear={handleClear}
        ></Signature>
    </div>
  )
}

ReactDOM.render(<Demo />, mountNode)
```
