---
title: 自定义过滤菜单
order: 23
---


通过 `filterPanel` 自定义的列过滤功能。
<br/>
同时你可以设置 `column.features.filterable` 为一个函数来作为该列的过滤函数。

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Table, Button, Input } from '@kdcloudjs/kdesign'

function Demo() {
  const [ filters, setFilters ] = React.useState([{code:'order',filter:'AP-202009-00001'}])

  const dataSource = [
    {id: "1", "No":1,"order":"AP-202009-00001","from":"陕西环宇科技","to":"深圳环球科技","amount":"26,800.00","balance":"5,200.00"},
    {id: "2", "No":2,"order":"AP-202009-00001","from":"陕西环宇科技","to":"深圳环球科技","amount":"236,800.00","balance":"1,500.00"},
    {id: "3", "No":3,"order":"AP-202009-00002","from":"陕西环宇科技","to":"深圳环球科技","amount":"246,800.00","balance":"5,300.00"},
    {id: "4", "No":4,"order":"AP-202009-00003","from":"陕西环宇科技","to":"深圳环球科技","amount":"216,800.00","balance":"5,400.00"},
    {id: "5", "No":5,"order":"AP-202009-00004","from":"陕西环宇科技","to":"深圳环球科技","amount":"236,800.00","balance":"1,500.00"}
  ]

  const getColumnFilterPanelProps = () => {
    const filterPanel = (props) => {
      const { setFilter, filterModel, isFilterActive, hidePanel } = props
      const [filterValue, setFilterValue] = React.useState(filterModel && filterModel.filter ? filterModel.filter[0] : '')

      const handleSearch = (handleSearch) => {
        hidePanel()
        setFilter(filterValue)
      }

      const handleReset = () => {
        hidePanel()
        setFilter()
      }

      React.useEffect(()=>{   
        setFilterValue(filterModel && filterModel.filter ? filterModel.filter[0] : '')
      },[filterModel])
 
      
      return (<div 
          style={{
              display: 'flex',
              alignItems: 'center',
              padding: '5px'
          }}
        >
        <Input 
          placeholder="输入过滤值" 
          borderType="bordered" 
          value={filterValue}  
          onChange={e => setFilterValue(e.target.value ? [e.target.value] : [])} 
        />
        <Button type="primary" onClick={handleSearch} style={{ marginLeft:'5px' }}>搜索</Button>
        <Button  onClick={handleReset} style={{ marginLeft:'5px' }}>重置</Button>
      </div>)
    }
    return {
        filterPanel
    }
  }

  const columns = [
    { code: 'No', name: '序号', width: 60, align: 'center' },
    { code: 'order', name: '单据号', width: 200, features: { 
        filterable: true , 
        ...getColumnFilterPanelProps()
      }
    },
    { code: 'from', name: '来户', width: 200, features: {  filterable: true } },
    { code: 'to', name: '往户', width: 200, features: {  filterable: true } },
    { code: 'amount', name: '应付金额', width: 100, align: 'right', features: {          
      filterable: (filterValue) => (value) => {
            if (value == null) {
                return false
            }
            if (typeof value === 'number') {
                value = value + ''
            }
            return value.includes(filterValue)
        }, 
        ...getColumnFilterPanelProps()
      } 
    },
    { code: 'balance', name: '应收余额', width: 100, align: 'right'}
  ]


  const handleFiltersChanged = (nextFilters) => {
    console.log('nextFilters', nextFilters)
    setFilters(nextFilters)
  }


   const filter = {
      filters,
      onChangeFilters:handleFiltersChanged        
   }

   return <Table 
    dataSource={dataSource}
    columns={columns} 
    filter={filter}
  />
}

ReactDOM.render(<Demo />, mountNode)
```

