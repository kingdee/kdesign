---
title: 日期选择类型
order: 0
---

日期选择五种风格：日期选择、周选择、月份选择、季度选择、年份选择

```tsx
import React from 'react'
import ReactDOM from 'react-dom'
import { DatePicker } from '@kdcloudjs/kdesign'
import type { IDatePickerProps } from '@kdcloudjs/kdesign'

const Demo: React.FC = () => {
  const demoStyle = { margin: '10px 0' }
  const underline: IDatePickerProps['borderType'] = 'underline'

  return (
    <div style={{ width: '150px' }}>
      <div style={demoStyle}>
        <DatePicker />
      </div>
      <div style={demoStyle}>
        <DatePicker picker="week" />
      </div>
      <div style={demoStyle}>
        <DatePicker picker="month" borderType={underline} />
      </div>
      <div style={demoStyle}>
        <DatePicker picker="quarter" />
      </div>
      <div style={demoStyle}>
        <DatePicker picker="year" />
      </div>
      <div style={demoStyle}>
        <DatePicker disabled />
      </div>
      <div style={demoStyle}>
        <DatePicker borderType="none" disabled />
      </div>
      <div style={demoStyle}>
        <DatePicker borderType="underline" disabled />
      </div>
    </div>
  )
}

ReactDOM.render(<Demo />, mountNode)
```
