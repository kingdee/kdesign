---
title: 日期选择器大小
order: 1
---

日期选择器三种大小：small、middle、large

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { DatePicker, RangePicker } from '@kdcloudjs/kdesign'

const Demo: React.FC = () => {
  const demoStyle = { margin: '10px 0' }
  return (
    <div  style={{ width: '150px' }}>
      <div style={demoStyle}>
        <DatePicker size="small" />
      </div>
      <div style={demoStyle}>
        <DatePicker />
      </div>
      <div style={demoStyle}>
        <DatePicker size="middle" />
      </div>
      <div style={demoStyle}>
        <DatePicker size="large" />
      </div>
      <div style={demoStyle}>
        <RangePicker size="small" />
      </div>
      <div style={demoStyle}>
        <RangePicker />
      </div>
      <div style={demoStyle}>
        <RangePicker size="middle" />
      </div>
      <div style={demoStyle}>
        <RangePicker size="large" />
      </div>
    </div>
  )
}

ReactDOM.render(<Demo />, mountNode)
```
