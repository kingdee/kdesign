---
title: 自动合并多行
order: 44
---
在设置 `column.features.autoRowSpan` 之后，如果该列中相连的两个单元格的值相等，则自动合并这两个单元格。如果连续的多个单元格的值都相等，则合并这些单元格。 

`column.features.autoRowSpan` 也可以设置为一个比较函数，用来自定义「两个单元格中的值相等」的判断逻辑。其函数签名为 `(v1: any, v2: any. row1: any, row2: any) => boolean`

注意: autoRowSpan 会覆盖原有的 `column.getSpanRect`，要注意避免冲突。

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Table } from '@kdcloudjs/kdesign'

function Demo() {
  const dataSource = [
    {"No":1,"order":"AP-202009-00001","from":"陕西环宇科技","to":"深圳环球科技","amount":"26,800.00","balance":"5,200.00"},
    {"No":2,"order":"AP-202009-00001","from":"陕西环宇科技","to":"深圳环球科技","amount":"236,800.00","balance":"1,500.00"},
    {"No":3,"order":"AP-202009-00002","from":"陕西环宇科技","to":"深圳环球科技","amount":"246,800.00","balance":"5,300.00"},
    {"No":4,"order":"AP-202009-00003","from":"陕西环宇科技","to":"深圳环球科技","amount":"216,800.00","balance":"5,400.00"},
    {"No":5,"order":"AP-202009-00004","from":"陕西环宇科技","to":"深圳环球科技","amount":"236,800.00","balance":"1,500.00"}
  ]

  const columns = [
    { code: 'No', name: '序号', width: 60, align: 'center' },
    { code: 'order', name: '单据号', width: 200, features: { autoRowSpan: true}},
    { code: 'from', name: '来户', width: 200 },
    { code: 'to', name: '往户', width: 200 },
    { code: 'amount', name: '应付金额', width: 100, align: 'right' },
    { code: 'balance', name: '应收余额', width: 100, align: 'right' }
  ]
  return <Table dataSource={dataSource} columns={columns}  autoRowSpan ={true} />
}

ReactDOM.render(<Demo />, mountNode)
```
