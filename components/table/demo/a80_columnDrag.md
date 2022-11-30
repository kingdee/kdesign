---
title: 拖拽列排序
order: 80
---
属性[columnDrag](#columnDrag)配置时可以开启拖动表头来调整列的位置，目前支持受控的方式设置新的列顺序，否则顺序不会改变。

```jsx
() => {
  import { Table } from '@kdcloudjs/kdesign'
  import { useState } from 'react'

  const dataSource = [
    {id: "1", "No":1,"order":"AP-202009-00001","from":"陕西环宇科技","to":"深圳环球科技","amount":"26,800.00","balance":"5,200.00"},
    {id: "2", "No":2,"order":"AP-202009-00001","from":"陕西环宇科技","to":"深圳环球科技","amount":"236,800.00","balance":"1,500.00"},
    {id: "3", "No":3,"order":"AP-202009-00002","from":"陕西环宇科技","to":"深圳环球科技","amount":"246,800.00","balance":"5,300.00"},
    {id: "4", "No":4,"order":"AP-202009-00003","from":"陕西环宇科技","to":"深圳环球科技","amount":"216,800.00","balance":"5,400.00"},
    {id: "5", "No":5,"order":"AP-202009-00004","from":"陕西环宇科技","to":"深圳环球科技","amount":"236,800.00","balance":"1,500.00"}
  ]

  const _columns = [
    { code: 'No', name: '序号', width: 60, align: 'center' },
    { code: 'order', name: '单据号', width: 200, },
    { code: 'from', name: '来户', width: 200,  },
    { code: 'to', name: '往户', width: 200,  },
    { code: 'amount', name: '应付金额', width: 100, align: 'right',  },
    { code: 'balance', name: '应收余额', width: 100, align: 'right',  }
  ]

  const [columns, setColumns] = useState(_columns)

  const handleColumnDragStopped = (columnMoved, nextColumns) => {
     const columnSeq = nextColumns.reduce((result, col, colIndex) => {
        result[col.code] = colIndex
        return result
     }, {})

     setColumns(
       _columns.reduce((result, col) => {
          result[columnSeq[col.code]] = { ...col }
          return result
       }, [])
     )
  }

 
  return <Table dataSource={dataSource} columns={columns} columnDrag={{ onColumnDragStopped: handleColumnDragStopped }} />
}
```
