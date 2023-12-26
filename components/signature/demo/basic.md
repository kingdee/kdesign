---
title: 基本使用
order: 0
---

这是基本使用方法的描述性文字

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Signature } from '@kdcloudjs/kdesign'

const Demo = () => {
  const getPng = (data) => {
    console.log('getPng===>', data)
  }
  const handleClear = () => {
    console.log('clear了吗')
  }
  const getSVG = (svgString) => {
    console.log(svgString)
  }
  return (
    <div style={{ width: '230px', height: '72px' }}>
      <Signature
        getSignatureData={getPng}
        onClear={handleClear}
        ></Signature>
    </div>
  )
}

ReactDOM.render(<Demo />, mountNode)
```
