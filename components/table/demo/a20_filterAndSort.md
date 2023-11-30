---
title: 过滤和排序
order: 20
---


通过设置表格属性 `filter`来开启表格过滤功能，`filters` 或者 `defaultFilters` 属性来指定过滤字段列表，`onFilterChanged` 用于获得即将更新的过滤字段列表。对某一列可通过指定列的 `filterable` 属性可启动禁用该列的过滤功能，

通过设置表格属性 `sort` 来开启排序功能， `sorts` 或者 `defaultSortOrder` 属性来指定排序字段列表，`onChangeSorts` 用于获得即将更新的排序字段列表。对某一列可通过指定列的 `sortable` 属性可启动禁用该列的排序功能，

使用 `defaultSortOrder` 和 `defaultFilters` 属性，设置列的默认排序顺序和列的默认过滤，这是一种`非受控`的使用。


配置项：
- [过滤](#filter)
- [排序](#sort)

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Table, Button } from '@kdcloudjs/kdesign'

const Demo: React.FC = () => {
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

  const filter = {
        defaultFilters:[
           {
              code:'order',
              filter:'AP-202009-00001',
              filterCondition:'contain'
           }
        ],
        onChangeFilters:function(nextFilters) {
          console.log('nextFilters', nextFilters)
        } 
  }

  const sort = {
        mode: 'single',
        defaultSorts: [{ code: 'order', order: 'asc' }],
        highlightColumnWhenActive: true,
        sortIconHoverShow: true,
        onChangeSorts: function (nextSorts) {
          console.log('nextSorts', nextSorts)
        }
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

