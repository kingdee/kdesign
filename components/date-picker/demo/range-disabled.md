---
title: 日期范围选择类型
order: 6
---

日期范围选择五种风格：日期范围选择、周范围选择、月份范围选择、季度范围选择、年份范围选择

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { RangePicker } from '@kdcloudjs/kdesign'

function Demo() {
  const demoStyle = { margin: '10px 0' }
  const disabledDate = (date) => {
    return date && date < new Date('2021-01-28')
  }
  // const disabledDate1 = (date) => {
  //   return date && date < new Date('2020-10-25')
  // }
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
