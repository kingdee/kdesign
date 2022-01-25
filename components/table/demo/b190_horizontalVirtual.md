---
title: 双向虚拟列表
order: 190
date: 2021-04-06
---

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Table } from '@kdcloudjs/kdesign'

function Demo() {
  const data = React.useMemo(() => (
    Array.from(Array(100000)).map((item, index) => (
      {
        "id": index, 
        "No":index,
        "order":"AP-202009-0000"+index,"from":"陕西环宇科技","to":"深圳环球科技","amount":"26,800.00","balance":"5,200.00"
      }
    ))
  ), [])

  const baseColumns = [  
    { code: 'order', name: '单据号', width: 200 },
    { code: 'from', name: '来户', width: 200 },
    { code: 'to', name: '往户', width: 200 },
    { code: 'amount', name: '应付金额', width: 100, align: 'right' },
    { code: 'balance', name: '应收余额', width: 100, align: 'right' }
  ]
  const columns = React.useMemo(() => (
    Array.from(Array(10)).reduce((acc, cur, index) => (
      acc.concat(baseColumns.map(item=>{
        return {...item, name: item.name + index}
      }))
    ),[{ code: 'No', name: '序号', width: 60, align: 'center', lock: true }])
  ),[])

  return (
    <div>
      <Table
        useVirtual={true}
        style={{ height: 600, width: 800, overflow: 'auto' }}
        dataSource={data}
        columns={columns}
      />
    </div>
  )
}

ReactDOM.render(<Demo />, mountNode)
```