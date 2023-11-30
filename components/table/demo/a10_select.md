---
title: 行选择
order: 10
---
行选择：在每一行的左侧或右侧 渲染一个选择框，表示当前行是否被选中。

- 启用行多选功能之前，需设置`primaryKey`参数。
- 可以通过 `rowSelection.type` 属性指定选择类型，默认为 `checkbox`。
- 其他[配置项](#selection)



```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Radio,Table } from '@kdcloudjs/kdesign'

const Demo: React.FC = () => {
  const [ selected, setSelected ] = React.useState(['2'])
  const [ selectedType, setSelectedType ] = React.useState('checkbox')

  const handleSelectedTypeChange = e => {
    setSelected(selected.splice(0,1))
    setSelectedType(e.target.value)
  }

  const dataSource = [
    {id: "1", "No":1,"order":"AP-202009-00001","from":"陕西环宇科技","to":"深圳环球科技","amount":"26,800.00","balance":"5,200.00"},
    {id: "2", "No":2,"order":"AP-202009-00001","from":"陕西环宇科技","to":"深圳环球科技","amount":"236,800.00","balance":"1,500.00"},
    {id: "3", "No":3,"order":"AP-202009-00002","from":"陕西环宇科技","to":"深圳环球科技","amount":"246,800.00","balance":"5,300.00"},
    {id: "4", "No":4,"order":"AP-202009-00003","from":"陕西环宇科技","to":"深圳环球科技","amount":"216,800.00","balance":"5,400.00"},
    {id: "5", "No":5,"order":"AP-202009-00004","from":"陕西环宇科技","to":"深圳环球科技","amount":"236,800.00","balance":"1,500.00"}
  ]

  const columns = [
    { code: 'No', name: '序号', width: 60, align: 'center' },
    { code: 'order', name: '单据号', width: 200 },
    { code: 'from', name: '来户', width: 200 },
    { code: 'to', name: '往户', width: 200 },
    { code: 'amount', name: '应付金额', width: 150, align: 'right' },
    { code: 'balance', name: '应收余额', width: 150, align: 'right' }
  ]


  const rowSelection = {
     type: selectedType,
     value: selected,
     onChange: setSelected,
     column: { lock: true },
     highlightRowWhenSelected: true
  }


  return (
    <div style={{ width: 875 }}>
      <Radio.Group onChange={handleSelectedTypeChange} value={selectedType}>
        <Radio value={'checkbox'}>多选</Radio> 
        <Radio value={'radio'}>单选</Radio>
      </Radio.Group>
      <br />
      <Table
        columns={columns}
        dataSource={dataSource}
        rowSelection={rowSelection}
        primaryKey={'id'}
      />
    </div>
  )
}



ReactDOM.render(<Demo />, mountNode)
```