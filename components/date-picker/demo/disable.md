---
title: 日期选择器日期禁用
order: 3
---

日期选择器的日期禁用，可通过 `disabledDate` 控制，需要注意的是， `disabledDate` 只能禁用日期，禁用时间需要使用 `disabledHours`、`disabledMinutes`、`disabledSeconds`

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { DatePicker } from '@kdcloudjs/kdesign'

const Demo: React.FC = () => {
  const demoStyle = { margin: '10px 0' }
  const disabledDate = (date, info) => {
    const disDate = new Date('2020-12-28')
    if (info && 'year' === info.panelType) {
      return date && date.getFullYear() < disDate.getFullYear()
    }
    if (info && 'month' === info.panelType) {
      return date && date.getMonth() < disDate.getMonth()
    }
    return date && date < disDate
  }
  const disabledDate1 = (date) => {
    return date && date < new Date('2020-10-25')
  }
  return (
    <div  style={{ width: '150px' }}>
      <div style={demoStyle}>
        <DatePicker disabledDate={disabledDate} defaultValue={new Date('2021-01-29')} />
      </div>
      <div style={demoStyle}>
        <DatePicker disabledDate={disabledDate1} picker="week" defaultValue={new Date('2020-12-25')} />
      </div>
      <div style={demoStyle}>
        <DatePicker disabledDate={disabledDate1} picker="month" defaultValue={new Date('2020-8-26')} />
      </div>
      <div style={demoStyle}>
        <DatePicker disabledDate={disabledDate1} picker="quarter" defaultValue={new Date('2020-1-26')} />
      </div>
      <div style={demoStyle}>
        <DatePicker disabledDate={disabledDate1} picker="year" defaultValue={new Date('2020-1-26')} />
      </div>
    </div>
  )
}

ReactDOM.render(<Demo />, mountNode)
```
