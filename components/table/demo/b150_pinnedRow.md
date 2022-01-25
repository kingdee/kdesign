---
title: 合计行
order: 150
---

为表格设置footerDataSource来添加底部固定行。
footerDataSource与dataSource的格式一致

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Table } from '@kdcloudjs/kdesign'

function Demo() {
  const dataSource = [
    {id:"1","No":1,"order":"AP-202009-00001","from":"陕西环宇科技","to":"深圳环球科技","amount":"26,800.00","balance":"5,200.00"},
    {id:"2","No":2,"order":"AP-202009-00002","from":"陕西环宇科技","to":"深圳环球科技","amount":"236,800.00","balance":"1,500.00"},
    {id:"3","No":3,"order":"AP-202009-00003","from":"陕西环宇科技","to":"深圳环球科技","amount":"246,800.00","balance":"5,300.00"},
    {id:"4","No":4,"order":"AP-202009-00004","from":"陕西环宇科技","to":"深圳环球科技","amount":"216,800.00","balance":"5,400.00"},
    {id:"5","No":5,"order":"AP-202009-00005","from":"陕西环宇科技","to":"深圳环球科技","amount":"236,800.00","balance":"1,500.00"}
  ]

  const columns = [
    { code: 'No', name: '序号', width: 60, align: 'center' },
    { code: 'order', name: '单据号', width: 200 },
    { code: 'from', name: '来户', width: 200 },
    { code: 'to', name: '往户', width: 200 },
    { code: 'amount', name: '应付金额', width: 100, align: 'right' , aggType: 'sum' },
    { code: 'balance', name: '应收余额', width: 100, align: 'right' , aggType: 'avg' }
  ]

  // 获取合计行数据
  const getFooterDataSource = (dataSource, columns, seqField) => {
    const aggregateColumns = columns.filter(item => {
      return !!item.aggType
    })
    let footerDataSource = getCalculateData(dataSource, aggregateColumns)
    footerDataSource = Object.assign(footerDataSource, { [seqField]: '合计' })
    return Object.keys(footerDataSource).length === 0 ? [] : [footerDataSource]
  }

  const getFormatValue = (v) => {
    const reg = /(?=(\B\d{3})+$)/g //以三个数字结尾前面的空格
     v = (v+'').replace(reg,',')
     return v + '.00'
  }

  const getCalculateData = (rowdatas, aggregateColumns) => {
    const data = {}
    if (aggregateColumns && aggregateColumns.length > 0 && rowdatas) {
      aggregateColumns.forEach(l => {
        let colResult = 0
        let colNaNValCount = 0
        rowdatas.forEach((row, i) => {
          let v
          const temporaryVal = parseFloat(row[l.code].replace(',',''))
          if (isNaN(temporaryVal)) { 
            v = 0
            if (!['avg', 'count'].includes(l.aggType)) {
              return
            }
            if (l.aggType === 'avg') { // 平均数需要记录空值的行
              colNaNValCount += 1
            }
          } else {
            v = temporaryVal
          }
          switch (l.aggType) {
            case 'sum': {
              if (v !== 0 || (!isNaN(temporaryVal) && v === 0)) {
                colResult = colResult + v
              }
              break
            }
            case 'min':
              colResult = Math.min(v, colResult)
              break
            case 'max':
              colResult = Math.max(v, colResult)
              break
            case 'avg': {
              colResult = colResult + v
              // 仅计算存在值的行
              const numberValRowCount = rowdatas.length - colNaNValCount
              if (i === rowdatas.length - 1 && numberValRowCount !== 0) {
                colResult = (colResult / numberValRowCount).toFixed(2)
              }
              break
            }
            case 'count':
              colResult = rowdatas.length
              break
            default:
              break
          }
        })
        data[l.code] = typeof colResult === 'string' ? getFormatValue(colResult) : getFormatValue(colResult.toString())
      })
    }
    return data
  }
  
  const footerDataSource = getFooterDataSource(dataSource,columns, 'seq')
  return <Table dataSource={dataSource} columns={columns}  footerDataSource={footerDataSource}/>
}

ReactDOM.render(<Demo />, mountNode)
```
