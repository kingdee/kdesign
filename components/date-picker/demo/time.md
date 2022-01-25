---
title: 时间选择器
order: 8
---

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { DatePicker } from '@kdcloudjs/kdesign'

function Demo() {
  const demoStyle = { margin: '10px 0' }
  return (
    <div  style={{ width: '150px' }}>
      <div style={demoStyle}>
        <DatePicker picker="time" />
      </div>
    </div>
  )
}

ReactDOM.render(<Demo />, mountNode)
```
