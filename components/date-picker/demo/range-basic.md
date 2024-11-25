---
title: 日期范围选择类型
order: 5
---

日期范围选择五种风格：日期范围选择、周范围选择、月份范围选择、季度范围选择、年份范围选择

```tsx
import React from 'react'
import ReactDOM from 'react-dom'
import { RangePicker } from '@kdcloudjs/kdesign'
import type { IRangePickerProps } from '@kdcloudjs/kdesign'

const Demo: React.FC = () => {
  const week: IRangePickerProps['picker'] = 'week'
  return (
    <div style={{ width: '250px' }}>
      <div>
        <RangePicker />
      </div>
      <div>
        <RangePicker picker={week} />
      </div>
      <div>
        <RangePicker picker="month" />
      </div>
      <div>
        <RangePicker picker="quarter" />
      </div>
      <div>
        <RangePicker picker="year" />
      </div>
      <div>
        <RangePicker showTime />
      </div>
      <div>
        <RangePicker picker="time" />
      </div>
    </div>
  )
}

ReactDOM.render(<Demo />, mountNode)
```
