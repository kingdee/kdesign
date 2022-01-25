---
title: 日期范围选择器 footer
order: 7
---

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { RangePicker } from '@kdcloudjs/kdesign'

function Demo() {
  const demoStyle = { margin: '10px 0' }
  return (
    <div  style={{ width: '250px' }}>
      <div style={demoStyle}>
        <RangePicker />
      </div>
      <div style={demoStyle}>
        <RangePicker />
      </div>
      <div style={demoStyle}>
        <RangePicker />
      </div>
    </div>
  )
}

ReactDOM.render(<Demo />, mountNode)
```
