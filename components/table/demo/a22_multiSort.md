---
title: 多列排序
order: 22
---

可以通过指定`option.mode`支持多列排序。
<br/>
同时你可以设置 `column.features.sortable` 为一个函数来作为该列的排序比较函数。 

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Table, Button } from '@kdcloudjs/kdesign'

const Demo: React.FC = () => {
    const [ sorts, setSorts ] = React.useState([{ code: 'order', order: 'desc' }])
  const dataSource = [
    {id: "1", "No":1,"order":"AP-202009-00001","from":"陕西环宇科技","to":"深圳环球科技","amount":"26,800.00","balance":"5,200.00"},
    {id: "2", "No":2,"order":"AP-202009-00001","from":"陕西环宇科技","to":"深圳环球科技","amount":"236,800.00","balance":"1,500.00"},
    {id: "3", "No":3,"order":"AP-202009-00002","from":"陕西环宇科技","to":"深圳环球科技","amount":"246,800.00","balance":"5,300.00"},
    {id: "4", "No":4,"order":"AP-202009-00003","from":"陕西环宇科技","to":"深圳环球科技","amount":"216,800.00","balance":"5,400.00"},
    {id: "5", "No":5,"order":"AP-202009-00004","from":"陕西环宇科技","to":"深圳环球科技","amount":"236,800.00","balance":"1,500.00"}
  ]

  const columns = [
    { code: 'No', name: '序号', width: 60, align: 'center' },
    { code: 'order', name: '单据号', width: 200, features: { sortable: true }},
    { code: 'from', name: '来户', width: 200, features: { sortable: true } },
    { code: 'to', name: '往户', width: 200, features: { sortable: true } },
    { code: 'amount', name: '应付金额', width: 100, align: 'right', features: { sortable: true } },
    { code: 'balance', name: '应收余额', width: 100, align: 'right', features: { sortable: true } }
  ]

    const handleSortsChanged = (nextSorts) => {
        console.log('nextSorts', nextSorts)
        setSorts(nextSorts)
    }

    const resetSorts = () => setSorts([])

    const sort = {
        mode: 'multiple',
        sorts,
        highlightColumnWhenActive: true,
        onChangeSorts: handleSortsChanged
    }
    
    return <div style={{ height: 340 }}>
        <Button type="primary" onClick={resetSorts}>清除排序</Button>
        <br/>
        <br/>
            <Table 
            dataSource={dataSource}
            columns={columns} 
            sort={sort}
        />
    </div>
}

ReactDOM.render(<Demo />, mountNode)
```