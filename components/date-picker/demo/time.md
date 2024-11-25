---
title: 时间选择器
order: 8
---

```tsx
import React from 'react'
import ReactDOM from 'react-dom'
import { DatePicker } from '@kdcloudjs/kdesign'
import type { IDatePickerProps } from '@kdcloudjs/kdesign'

const Demo: React.FC = () => {
  const demoStyle = { margin: '10px 0' }
  const time: IDatePickerProps['time'] = 'time'
  return (
    <div style={{ width: '150px' }}>
      <div style={demoStyle}>
        <DatePicker picker={time} />
      </div>
    </div>
  )
}

ReactDOM.render(<Demo />, mountNode)
```
