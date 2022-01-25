---
title: 基本使用
order: 0
---

最简单的筛选

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Filter } from '@kdcloudjs/kdesign'

function Demo() {
  const defaultValue = { 
    organization: ['organ2', 'organ3'], 
    date: ['nearlyThreeMonths'],
  }

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
      key: 'status',
      label: '缺陷状态',
      multiple: true,
      options: [
        { value: 'status1', label: '● 计划' },
        { value: 'status2', label: '● 待修复' },
        { value: 'status3', label: '● 阻塞' },
        { value: 'status4', label: '● 修复中' },
        { value: 'status5', label: '● 修复完成' },
        { value: 'status6', label: '● 验证通过' },
        { value: 'status7', label: '● 失效' },
        { value: 'status8', label: '● 下版处理' },
        { value: 'status9', label: '● 确认不处理' },
        { value: 'status10', label: '● 已转需求' },
      ],
    },
    {
      key: 'project',
      label: '项目组',
      multiple: true,
      options: [
        { value: 'project1', label: 'DataOne大数据平台项目组' },
        { value: 'project2', label: '数据智能项目组' },
        { value: 'project3', label: 'IKD' },
        { value: 'project4', label: '统一平台' },
        { value: 'project5', label: 'KDesign-前端组件库' },
        { value: 'project6', label: '流程服务项目组' },
        { value: 'project7', label: '云架构项目组' },
        { value: 'project8', label: '轻分析项目组' },
        { value: 'project9', label: '前端技术项目组' },
        { value: 'project10', label: '基础数据项目组' },
        { value: 'project11', label: '集成服务项目组' },
        { value: 'project12', label: '税务管理项目组' },
        { value: 'project13', label: '产品总监项目组' },
        { value: 'project14', label: '发票云项目组' },
        { value: 'project15', label: '物联网应用项目组' },
        { value: 'project16', label: 'IIoT平台项目组' },
        { value: 'project17', label: '项目赋能组' },
        { value: 'project18', label: '渠道云项目组' },
        { value: 'project19', label: '电商云项目组' },
        { value: 'project20', label: '开放平台项目组' },
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

  return (
    <Filter
      style={{ width: 1214 }}
      title="缺陷列表"
      search={searchProps}
      conditions={conditions}
      defaultValue={defaultValue}
    />
  )
}

ReactDOM.render(<Demo />, mountNode)
```
