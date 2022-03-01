---
title: 基本使用
order: 0
---

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Stepper } from '@kdcloudjs/kdesign'

function Demo() {
  return (
    <div style={{ width: '300px' }}>
      <p>基础步进器</p>
      <Stepper placeholder="基本使用" type="base" />
      <br />
      <p>嵌入式步进器</p>
      <Stepper placeholder="基本使用" type="embed" />
      <br />
    </div>
  )
}

ReactDOM.render(<Demo />, mountNode)
```
