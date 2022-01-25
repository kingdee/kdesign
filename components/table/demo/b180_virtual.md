---
title: 虚拟列表
order: 180
---

数据量较大时，表格会自动开启虚拟滚动。你也可以通过表格的 [useVirtual](#虚拟滚动) 属性来调整虚拟滚动功能

> 注意虚模式需要表格有确定的宽高，所以你可以：
> 1. 设置表格自身的高度或最大高度（宽度同理），同时设置样式： style.overflow = 'auto'
> 2. 通过flex布局或者设置使父容器的宽高，使表格的宽高是确定的，并设置表格的样式： style.overflow = 'auto'


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
    <div style={{ marginRight: 12 }}>
      <Table
      style={{ height: 600, width: 800, overflow: 'auto' }}
      isLoading={false}
      dataSource={data}
      columns={columns}
      />
    </div>
  )
}

ReactDOM.render(<Demo />, mountNode)
```