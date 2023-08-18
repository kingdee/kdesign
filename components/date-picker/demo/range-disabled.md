---
title: 日期范围选择器日期禁用
order: 6
---

日期范围选择器的日期禁用，可通过 `disabledDate` 控制，需要注意的是， `disabledDate` 只能禁用日期，禁用时间需要使用 `disabledHours`、`disabledMinutes`、`disabledSeconds`

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { RangePicker } from '@kdcloudjs/kdesign'

function Demo() {
  const disabledDate = (date) => {
    return date && date < new Date('2021-01-28')
  }

  return (
    <div  style={{ width: '250px' }}>
      <div>
        <RangePicker disabledDate={disabledDate} defaultValue={[new Date('2021-1-25'), null]} />
      </div>
      <div>
        <RangePicker picker="week" disabledDate={disabledDate} defaultValue={[new Date('2021-01-25'), null]} />
      </div>
      <div>
        <RangePicker picker="month" disabledDate={disabledDate} defaultValue={[new Date('2020-12-25'), null]} />
      </div>
      <div>
        <RangePicker picker="quarter" disabledDate={disabledDate} defaultValue={[new Date('2020-12-25'), null]} />
      </div>
      <div>
        <RangePicker picker="year" disabledDate={disabledDate} defaultValue={[new Date('2020-12-25'), null]} />
      </div>
      <div>
        <RangePicker showTime disabledDate={disabledDate} defaultValue={[new Date('2021-1-25'), null]} />
      </div>
      <div>
        <RangePicker picker="time" />
      </div>
    </div>
  )
}

ReactDOM.render(<Demo />, mountNode)
```
