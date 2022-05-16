---
title: 自定义选项
order: 5
---

自定义选项，可以使用表单组件

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Filter, RangePicker } from '@kdcloudjs/kdesign'

function Demo() {
  const defaultValue = {
    organization: ['organ2', 'organ3'],
    date: ['nearlyThreeMonths'],
  }

  const [value, setValue] = React.useState(defaultValue)

  const [rangeValue, setRangeValue] = React.useState('')
  const handleCustomerChange = (dates, datestrings) => {
    setRangeValue(dates)
    value.date = [datestrings.join('至')]
    console.log(value)
    setValue(value)
  }

  const conditions = [
    {
      key: 'organization',
      label: '组织',
      multiple: true,
      options: [
        { value: 'organ1', label: '环球日化深圳销售部' },
        { value: 'organ2', label: '用户体验部' },
        { value: 'organ3', label: '前端开发项目部' },
        { value: 'organ4', label: '环球集团广州销售部' },
      ],
    },
    {
      key: 'date',
      label: '日期',
      required: true,
      options: [
        { value: 'today', label: '今天' },
        { value: 'thisWeek', label: '本周' },
        { value: 'thisMonth', label: '本月' },
        { value: 'nearlyThreeMonths', label: '近三个月' },
        { value: 'nearlyYear', label: '近一年' },
        {
          label: '自定义',
          component:  <RangePicker borderType="bordered" style={{ margin: '-4px 0' }} allowClear={false} value={rangeValue} disabledDate={date => date && date > new Date()} onChange={handleCustomerChange} />
        },
      ],
    },
  ]

  const searchProps = {
    tags: [
      { value: 'label', tag: '名称' },
      { value: 'code', tag: '编码' },
    ],
    onChange: (_, option) => console.log(option),
  }

  const handleChange = (value, condition, option) => {
    console.log(value, condition, option)
    setValue(value)
    condition && condition.key === 'date' && setRangeValue()
  }

  return (
    <Filter
      style={{ width: 1214 }}
      title="差旅报销"
      value={value}
      search={searchProps}
      conditions={conditions}
      onChange={handleChange}
    />
  )
}

ReactDOM.render(<Demo />, mountNode)
```
