---
title: 日期选择器 footer
order: 5
---

showToday、showNow、showTime

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { DatePicker } from '@kdcloudjs/kdesign'

const Demo: React.FC = () => {
  const demoStyle = { margin: '10px 0' }
  return (
    <div  style={{ width: '150px' }}>
      <div style={demoStyle}>
        <DatePicker showToday disabledDate={() => true} />
      </div>
      <div style={demoStyle}>
        <DatePicker showToday showTime />
      </div>
      <div style={demoStyle}>
        <DatePicker showToday showNow />
      </div>
      <div style={demoStyle}>
        <DatePicker showNow />
      </div>
      <div style={demoStyle}>
        <DatePicker showNow showToday showTime />
      </div>
      <div style={demoStyle}>
        <DatePicker showNow showTime />
      </div>
    </div>
  )
}

ReactDOM.render(<Demo />, mountNode)
```
