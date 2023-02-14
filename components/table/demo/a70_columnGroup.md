---
title: 列分组
order: 70
---
在 `columns.children=[...]` 中添加子节点，`<Table />` 会绘制相应的嵌套表头结构。
```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Table } from '@kdcloudjs/kdesign'

function Demo() {
  const [ expandStatus, setExpandStatus ] = React.useState({personTotal:true})
  const onChangeExtendStatus = (curStatus,changeValue) => {
      setExpandStatus(curStatus)
  }
  const occupations = ['UED', '客服', '产品', '运营', '前端', '数据']
  const dataSource = occupations.map((occupation) => ({
    occupation,
    hc_2014: 104,
    hc_2015: 168,
    hc_lfl: 50,
    age_2014: 30,
    age_2015: 32,
    age_lfl: 15,
    rate_2014_0: 0.3,
    rate_2014_1: 0.3,
    rate_2015_0: 0.45,
    rate_2015_1: 0.45,
    rate2_2014: 0.33,
    rate2_2015: 0.48,
  }))
  const columns = [
    { code: 'occupation', name: '职务', width: 120, align: 'center' },
    {
      name: '人数',
      width: 240,
      align: 'center',
      code: 'personTotal',
      features:{
         showExtendIcon:true,
      },
      children: [
        { code: 'hc_2014', name: '2014年', width: 80,align: 'center' },
        { code: 'hc_2015', name: '2015年', width: 80, align: 'center' },
        { code: 'hc_lfl', name: '同比增长', width: 80, align: 'center' },
      ],
    },
    {
      name: '年龄',
      code: 'age',
      width: 240,
      align: 'center',
      children: [
        { code: 'age_2014', name: '2014年' , width: 80, align: 'center' },
        { code: 'age_2015', name: '2015年' , width: 80, align: 'center' },
        { code: 'age_lfl', name: '同比增长' , width: 80, align: 'center' },
      ],
    },
    {
      name: '占比',
      code: 'percent',
      width: 160,
      align: 'center',
      children: [
        { code: 'rate_2014_0', name: '2014年' , width: 80, align: 'center' },
        { code: 'rate_2015_0', name: '2015年' , width: 80, align: 'center' },
      ],
    },
    {
      name: '占比2',
      code: 'percent_02',
      width: 160,
      align: 'center',
      children: [
        { code: 'rate_2014_1', name: '2014年', width: 80, align: 'center' },
        { code: 'rate_2015_1', name: '2015年', width: 80, align: 'center' }
      ]
    }
  ]
  return <Table className="bordered" dataSource={dataSource} columns={columns} columnResizeable={true} columnGroupExtend={{extendStatus:expandStatus,onChangeExtendStatus:onChangeExtendStatus}}/>
}

ReactDOM.render(<Demo />, mountNode)
```
