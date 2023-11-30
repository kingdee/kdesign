---
title: 日期格式
order: 2
---

日期格式 `format`

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { DatePicker } from '@kdcloudjs/kdesign'

const Demo: React.FC = () => {
  const demoStyle = { margin: '10px 0' }
  return (
    <div  style={{ width: '150px' }}>
      <div style={demoStyle}>
        <DatePicker defaultValue={new Date()} format="yyyy/MM/dd" />
      </div>
      <div style={demoStyle}>
        <DatePicker defaultValue={new Date()} format="dd/MM/yyyy" />
      </div>
      <div style={demoStyle}>
        <DatePicker picker="week" defaultValue={new Date()} format="yyyy/wo" />
      </div>
      <div style={demoStyle}>
        <DatePicker picker="week" defaultValue={new Date()} format="yyyy/ww" />
      </div>
      <div style={demoStyle}>
        <DatePicker picker="month" defaultValue={new Date()} format="yyyy/MM" />
      </div>
      <div style={demoStyle}>
        <DatePicker picker="month" defaultValue={new Date()} format="yyyy/MMM" />
      </div>
      <div style={demoStyle}>
        <DatePicker picker="quarter" defaultValue={new Date()} format="yyyy/QQ" />
      </div>
      <div style={demoStyle}>
        <DatePicker picker="quarter" defaultValue={new Date()} format="yyyy/QQQ" />
      </div>
      <div style={demoStyle}>
        <DatePicker picker="year" defaultValue={new Date()} format="yyyy" />
      </div>
    </div>
  )
}

ReactDOM.render(<Demo />, mountNode)
```
