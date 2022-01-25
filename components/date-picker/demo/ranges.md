---
title: 预设时间范围
order: 11
---

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { RangePicker } from '@kdcloudjs/kdesign'
import { startOfWeek, endOfWeek, startOfMonth, endOfMonth, startOfToday, endOfToday } from 'date-fns'

function Demo() {
  const now = new Date()
  const ranges = {
    今天: [startOfToday(),endOfToday()],
    本周: [startOfWeek(now),endOfWeek(now)],
    本月: [startOfMonth(now), endOfMonth(now)],
  }

  return (
    <div className="demo-range-picker">
        <RangePicker ranges={ranges} />
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
