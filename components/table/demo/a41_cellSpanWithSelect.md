---
title: 合并行选择和悬浮联动
order: 41
---
通过 `column.getCellProps(...)` 返回 `rowSpan` 实现跨行单元格的合并后，部分使用者的会将其视为合并行视为整体，期望合并行的行选择和悬浮效果联动起来，此时可以通过对行选中进行受控方式使用及增加行鼠标事件来达到预期效果。
```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Table } from '@kdcloudjs/kdesign'

function Demo() {
  const [ selected, setSelected ] = React.useState([])

  const dataSource = [
    { id: "1", "No":1,"order":"AP-202009-00001","from":"陕西环宇科技","to":"深圳环球科技","amount":"26,800.00","balance":"5,200.00" },
    { id: "2", "No":2,"order":"AP-202009-00001","from":"陕西环宇科技","to":"深圳环球科技","amount":"236,800.00","balance":"1,500.00" },
    { id: "3", "No":3,"order":"AP-202009-00002","from":"陕西环宇科技","to":"深圳环球科技","amount":"246,800.00","balance":"5,300.00" },
    { id: "4", "No":4,"order":"AP-202009-00003","from":"陕西环宇科技","to":"深圳环球科技","amount":"216,800.00","balance":"5,400.00" },
    { id: "5", "No":5,"order":"AP-202009-00004","from":"陕西环宇科技","to":"深圳环球科技","amount":"236,800.00","balance":"1,500.00" }
  ]

  const rowSpanData = {
     '2': 2,
     '3': 1
  }
  const rowSpanKeys = ['2','3']
  const rowSpanGroupMap = {
    '2': rowSpanKeys,
    '3': rowSpanKeys
  }

  const createRowPropsGetter = (rowSpanData) => (record) => {
    // 合并行鼠标悬浮效果联动
    if (rowSpanData[record.id]) {
      const createHoverHandle = (rowSpanMouseHandle) => (e) => {
          const rowSpanGroup = rowSpanGroupMap[e.currentTarget.dataset.rowId]
          if (Array.isArray(rowSpanGroup)) { 
            rowSpanGroup.forEach(key => rowSpanMouseHandle(key, e.currentTarget.parentNode))
          }
      }
      return {
        'data-row-id': record.id,
        onMouseEnter: createHoverHandle((key, tbody) => {
          tbody.querySelector(`tr[data-row-id="${key}"]`).classList.add('row-hover')
        }),
        onMouseLeave: createHoverHandle((key, tbody) => {
          tbody.querySelector(`tr[data-row-id="${key}"]`).classList.remove('row-hover')
        })
      }
    }
  }

  const createCellPropsGetter = (rowSpanData) => (value, record) => {
    if (rowSpanData[record.id]) {
      return {
        rowSpan: rowSpanData[record.id]
      }
    }
  }


  const columns = [
    { code: 'No', name: '序号', width: 60, align: 'center'},
    { code: 'order', name: '单据号', width: 200, getCellProps: createCellPropsGetter(rowSpanData) },
    { code: 'from', name: '来户', width: 200 },
    { code: 'to', name: '往户', width: 200 },
    { code: 'amount', name: '应付金额', width: 100, align: 'right' },
    { code: 'balance', name: '应收余额', width: 100, align: 'right' }
  ]

  const handleSelected = (keys, actionRowkey, actionRowskeys, action ) => {
    // 合并行选择状态联动
    if (Array.isArray(rowSpanGroupMap[actionRowkey])) {
      if (action === 'check') {
        setSelected(Array.from(new Set(keys.concat(rowSpanGroupMap[actionRowkey]))))
      } else {
        const rowSpanKeysSet = new Set(rowSpanGroupMap[actionRowkey])
        setSelected(keys.reduce((result, key) => {
          if (!rowSpanKeysSet.has(key)) {
            result.push(key)
          }
          return result
        },[]))
      }
    } else {
      setSelected(keys)
    }
  }

  const rowSelection = {
     type: 'checkbox',
     value: selected,
     onChange: handleSelected,
     column: { 
      lock: true,
      getCellProps: createCellPropsGetter(rowSpanData)
     },
     clickArea: 'row',
     highlightRowWhenSelected: true
  }

  return <Table 
    primaryKey={'id'} 
    dataSource={dataSource} 
    columns={columns} 
    rowSelection={rowSelection}
    getRowProps={createRowPropsGetter(rowSpanData)}
  />
}

ReactDOM.render(<Demo />, mountNode)




```
