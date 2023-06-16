---
title: 单元格合并
order: 40
---
通过 `column.getCellProps(...)` 返回 colSpan/rowSpan 可实现单元格合并。

除了 colSpan, rowSpan 之外，getCellProps 也可以返回 td 元素的其他 props，例如 className, style, onClick 等。
```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Table } from '@kdcloudjs/kdesign'

function Demo() {
   const dataSource = [
      {"No":1,"order":"AP-202009-00001","from":"陕西环宇科技","to":"深圳环球科技","amount":"26,800.00","balance":"5,200.00"},
      {"No":2,"order":"AP-202009-00002","from":"陕西环宇科技","to":"深圳环球科技","amount":"236,800.00","balance":"1,500.00"},
      {"No":3,"order":"AP-202009-00003","from":"陕西环宇科技","to":"深圳环球科技","amount":"246,800.00","balance":"5,300.00"},
      {"No":4,"order":"AP-202009-00004","from":"陕西环宇科技","to":"深圳环球科技","amount":"216,800.00","balance":"5,400.00"},
      {"No":5,"order":"AP-202009-00005","from":"陕西环宇科技","to":"深圳环球科技","amount":"236,800.00","balance":"1,500.00"}
    ]

  const columns = [
    { code: 'No', name: '序号', width: 60, align: 'center'},
    { code: 'order', name: '单据号', width: 200,       
      getCellProps(value, record, rowIndex) {
        if (rowIndex === 1) {
          return {
            rowSpan: 2,
            colSpan: 2,
          }
        }
      },
    },
    { code: 'from', name: '来户', width: 200 },
    { code: 'to', name: '往户', width: 200 },
    { code: 'amount', name: '应付金额', width: 100, align: 'right' },
    { code: 'balance', name: '应收余额', width: 100, align: 'right' }
  ]
  return <Table dataSource={dataSource} columns={columns} />
}

ReactDOM.render(<Demo />, mountNode)
```
