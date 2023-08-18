---
title: 时间选择器时间禁用
order: 9
---

时间选择器时间禁用 `disabledHours`、`disabledMinutes`、`disabledSeconds`

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { DatePicker } from '@kdcloudjs/kdesign'

function Demo() {

  return (
    <div  style={{ width: '150px' }}>
      <div>
        <DatePicker picker="time" />
      </div>
      <div>
        <DatePicker picker="time" disabledHours={() => [0, 1, 2, 3]} />
      </div>
      <div>
        <DatePicker
          picker="time"
          disabledHours={() => [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21]}
        />
      </div>
      <div>
        <DatePicker
          picker="time"
          use12Hours
          disabledHours={() => [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
          disabledMinutes={() => [0, 1, 2, 3, 4]}
          disabledSeconds={() => [18, 19, 20]}
        />
      </div>
    </div>
  )
}

ReactDOM.render(<Demo />, mountNode)
```
