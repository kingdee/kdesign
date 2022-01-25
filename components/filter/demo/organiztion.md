---
title: 组织选项
order: 6
---

可以通过"更多"按钮选择所有的选项

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Filter, Button, Message } from '@kdcloudjs/kdesign'

function Demo() {
  const defaultValue = {
    organization: ['organ2', 'organ3'],
    project: ['project5'],
    date: ['nearlyThreeMonths'],
  }

  const [value, setValue] = React.useState(defaultValue)

  const conditions = [
    {
      key: 'organization',
      label: '组织',
      required: true,
      multiple: true,
      options: [
        { value: 'organ1', label: '环球日化深圳销售部' },
        { value: 'organ2', label: '用户体验部' },
        { value: 'organ3', label: '前端开发项目部' },
        { value: 'organ4', label: '环球集团广州销售部' },
      ],
    },
    {
      key: 'project',
      label: '项目组',
      multiple: true,
      options: [
        { value: 'project2', label: '数据智能项目组' },
        { value: 'project3', label: 'IKD' },
        { value: 'project4', label: '统一平台' },
        { value: 'project5', label: 'KDesign-前端组件库' },
        { value: 'project6', label: '流程服务项目组' },
        { value: 'project7', label: '云架构项目组' },
        { value: 'project8', label: '轻分析项目组' },
      ],
      addition: (
        <Button
          type="link"
          onClick={() => {
            Message.success('这里打开基础资料弹窗')
          }}>
          更多
        </Button>
      ),
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
  }

  return (
    <Filter
      style={{ width: 1214 }}
      title="用户故事"
      value={value}
      search={searchProps}
      conditions={conditions}
      onChange={handleChange}
    />
  )
}

ReactDOM.render(<Demo />, mountNode)
```
