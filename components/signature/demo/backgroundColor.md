---
title: jpeg格式背景色
order: 5
---

png和svg格式是透明的，jpeg格式可以设置背景色，默认为白色。

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Signature, Radio } from '@kdcloudjs/kdesign'

const Demo = () => {
  const [penColor,setPenColor] = React.useState('black')

  const handleClear = () => {
    console.log('clear了吗')
  }
  return (
    <div style={{ width: '230px', height: '72px' }}>
      <Signature onClear={handleClear} dataUrlType='jpeg' backgroundColor="#5582f3" penColor={penColor}></Signature>
    </div>
  )
}

ReactDOM.render(<Demo />, mountNode)
```
