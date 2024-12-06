---
title: 预设日期范围
order: 13
---

```tsx
import React from 'react'
import ReactDOM from 'react-dom'
import { RangePicker, Icon } from '@kdcloudjs/kdesign'
import type { IRangePickerProps } from '@kdcloudjs/kdesign'
import {
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  startOfToday,
  endOfToday,
  startOfQuarter,
  endOfQuarter,
  startOfYear,
  endOfYear,
} from 'date-fns'

const Demo: React.FC = () => {
  const now = new Date()
  const ranges: IRangePickerProps['ranges'] = {
    今天: [startOfToday(), endOfToday()],
    本周: [startOfWeek(now), endOfWeek(now)],
    本月: [startOfMonth(now), endOfMonth(now)],
  }
  const ranges2: IRangePickerProps['ranges'] = {
    今年: [startOfYear(now), endOfYear(now)],
    本月: [startOfMonth(now), endOfMonth(now)],
    本季度: [startOfQuarter(now), endOfQuarter(now)],
  }

  return (
    <div>
      <div className="demo-range-picker">
        <RangePicker ranges={ranges} suffixIcon={<Icon type="search" />} allowClear />
      </div>
      <div className="demo-range-picker">
        <div className="demo-range-picker">
          <RangePicker picker="month" ranges={ranges2} />
        </div>
      </div>
    </div>
  )
}

ReactDOM.render(<Demo />, mountNode)
```

```css
.demo-range-picker {
  width: 150px;
  margin: 10px 0;
}
```
