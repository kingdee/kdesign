---
title: 日期时间面板
order: 4
---

日期时间面板 `showTime`

```tsx
import React from 'react'
import ReactDOM from 'react-dom'
import { DatePicker, RangePicker } from '@kdcloudjs/kdesign'
import type { IDatePickerProps } from '@kdcloudjs/kdesign'

const Demo: React.FC = () => {
  const demoStyle = { margin: '10px 0' }
  const disabledHours: IDatePickerProps['disabledHours'] = () => [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
  ]

  return (
    <div style={{ width: '150px' }}>
      <div style={demoStyle}>
        <DatePicker defaultValue={new Date()} showTime />
      </div>
      <div style={demoStyle}>
        <DatePicker
          showTime
          use12Hours
          disabledHours={disabledHours}
          disabledMinutes={() => [0, 1, 2, 3, 4]}
          disabledSeconds={() => [18, 19, 20]}
        />
      </div>
      <div style={demoStyle}>
        <RangePicker showTime />
      </div>
    </div>
  )
}

ReactDOM.render(<Demo />, mountNode)
```
