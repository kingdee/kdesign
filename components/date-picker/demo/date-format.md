---
title: 日期格式
order: 2
---

日期格式 `format`

```tsx
import React from 'react'
import ReactDOM from 'react-dom'
import { DatePicker } from '@kdcloudjs/kdesign'
import type { IDatePickerProps } from '@kdcloudjs/kdesign'

const Demo: React.FC = () => {
  const demoStyle = { margin: '10px 0' }
  const TEST_DAY: IDatePickerProps['defaultValue'] = new Date()

  return (
    <div style={{ width: '150px' }}>
      <div style={demoStyle}>
        <DatePicker defaultValue={TEST_DAY} format="yyyy/MM/dd" />
      </div>
      <div style={demoStyle}>
        <DatePicker defaultValue={TEST_DAY} format="dd/MM/yyyy" />
      </div>
      <div style={demoStyle}>
        <DatePicker picker="week" defaultValue={TEST_DAY} format="yyyy/wo" />
      </div>
      <div style={demoStyle}>
        <DatePicker picker="week" defaultValue={TEST_DAY} format="yyyy/ww" />
      </div>
      <div style={demoStyle}>
        <DatePicker picker="month" defaultValue={TEST_DAY} format="yyyy/MM" />
      </div>
      <div style={demoStyle}>
        <DatePicker picker="month" defaultValue={TEST_DAY} format="yyyy/MMM" />
      </div>
      <div style={demoStyle}>
        <DatePicker picker="quarter" defaultValue={TEST_DAY} format="yyyy/QQ" />
      </div>
      <div style={demoStyle}>
        <DatePicker picker="quarter" defaultValue={TEST_DAY} format="yyyy/QQQ" />
      </div>
      <div style={demoStyle}>
        <DatePicker picker="year" defaultValue={TEST_DAY} format="yyyy" />
      </div>
    </div>
  )
}

ReactDOM.render(<Demo />, mountNode)
```
