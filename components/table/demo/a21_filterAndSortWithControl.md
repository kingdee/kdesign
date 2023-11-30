---
title: 受控的过滤和排序
order: 21
---


使用 `sorts` 和 `filters` 属性，设置列的过滤和排序，这是一种`受控`的使用。排序和过滤之后字段列表会通过`onChangeSorts` 和`onFilterChanged` 返回，用户需要自己管理过滤和排序的字段列表。 

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Table } from '@kdcloudjs/kdesign'

const Demo: React.FC = () => {


  const [ sorts, setSorts ] = React.useState([{ code: 'order', order: 'asc' }])
  const [ filters, setFilters ] = React.useState([{ code:'order',filter:'AP-202009-00001',filterCondition:'contain' }])

  const dataSource = [
    {id: "1", "No":1,"order":"AP-202009-00001","from":"陕西环宇科技","to":"深圳环球科技","amount":"26,800.00","balance":"5,200.00"},
    {id: "2", "No":2,"order":"AP-202009-00001","from":"陕西环宇科技","to":"深圳环球科技","amount":"236,800.00","balance":"1,500.00"},
    {id: "3", "No":3,"order":"AP-202009-00002","from":"陕西环宇科技","to":"深圳环球科技","amount":"246,800.00","balance":"5,300.00"},
    {id: "4", "No":4,"order":"AP-202009-00003","from":"陕西环宇科技","to":"深圳环球科技","amount":"216,800.00","balance":"5,400.00"},
    {id: "5", "No":5,"order":"AP-202009-00004","from":"陕西环宇科技","to":"深圳环球科技","amount":"236,800.00","balance":"1,500.00"}
  ]

  const columns = [
    { code: 'No', name: '序号', width: 60, align: 'center' },
    { code: 'order', name: '单据号', width: 200, features: { sortable: true, filterable: true }},
    { code: 'from', name: '来户', width: 200, features: { sortable: true, filterable: true } },
    { code: 'to', name: '往户', width: 200, features: { sortable: true, filterable: true } },
    { code: 'amount', name: '应付金额', width: 100, align: 'right', features: { sortable: true, filterable: true } },
    { code: 'balance', name: '应收余额', width: 100, align: 'right', features: { sortable: true, filterable: true } }
  ]

  const handleSortsChanged = (nextSorts) => {
    console.log('nextSorts', nextSorts)
    setSorts(nextSorts)
  }

  const handleFiltersChanged = (nextFilters) => {
    console.log('nextFilters', nextFilters)
    setFilters(nextFilters)
  }

   const filter = {
      filters,
      onChangeFilters:handleFiltersChanged        
   }

   const sort = {
      mode: 'single',
      sorts,
      highlightColumnWhenActive: true,
      sortIconHoverShow: true,
      onChangeSorts: handleSortsChanged
    }



  return <Table 
    dataSource={dataSource}
    columns={columns} 
    filter={filter}
    sort={sort}
  />
}

ReactDOM.render(<Demo />, mountNode)
```

