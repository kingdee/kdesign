---
title: 自定义过滤菜单案例
order: 24
---


通过 `filterPanel` 自定义的列过滤功能。
<br/>
同时你可以设置 `column.features.filterable` 为一个函数来作为该列的过滤函数。

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Table, Button, DatePicker, RangePicker, Icon } from '@kdcloudjs/kdesign'
import { isSameDay, isSameWeek, isSameMonth, isEqual, sub, add, isWithinInterval, format } from 'date-fns'

const Demo: React.FC = () => {
  const FILTER_OPTIONS = [
    {
      title: '今天',
      key: 'TODAY',
    },
    {
      title: '本周',
      key: 'THISWEEK',
    },
    {
      title: '本月',
      key: 'THISMONTH',
    },
    {
      title: '上月',
      key: 'LASTMONTH',
    },
    {
      title: '过去一个月',
      key: 'LASTONEMONTH',
    },
    {
      title: '过去三个月',
      key: 'LASTTHREEMONTH',
    },
    {
      title: '从...到...',
      key: 'RANGE',
    },
    {
      title: '等于',
      key: 'EQUALS',
    },
  ]

  const getColumnFilterPanelProps = () => {
    const filterPanel = (props) => {
      const { setFilter, filterModel, hidePanel } = props
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const [selectedValue, setSelectedValue] = React.useState(filterModel && filterModel.filter ? filterModel.filterCondition : '')

      const initRangeValue = filterModel && filterModel.filterCondition === 'RANGE' ? filterModel.filter : ['', '']
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const [rangeValue, setRangeValue] = React.useState(initRangeValue)

      // 根据condition的值判断初始化的dateValue
      const initDateValue = filterModel && filterModel.filterCondition === 'EQUALS' ? filterModel.filter[0] : undefined
      console.log(initDateValue, typeof initDateValue, new Date(initDateValue))
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const [dateValue, setDateValue] = React.useState(initDateValue)

      const handleSearch = (handleSearch) => {
        hidePanel()
        let realValue = null
        if (selectedValue === 'RANGE') {
          realValue = rangeValue
        } else if (selectedValue === 'EQUALS') {
          realValue = [dateValue]
        } else {
          realValue = [selectedValue]
        }
        setFilter(realValue, selectedValue)
      }
      const handleReset = () => {
        hidePanel()
        setFilter()
      }

      const handleClick = (option) => {
        setSelectedValue(option.key)
      }

      const handleRangeChange = (value) => {
        setRangeValue(value)
      }

      const handleDateChange = (value) => {
        setDateValue(value)
      }

      return (
        <div
          className="customFilter"
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
          }}>
          <div className="filter-option-list">
            <ul>
              {FILTER_OPTIONS.map((option, index) => (
                // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
                <li key={index} className={option.key === selectedValue ? 'active' : ''} onClick={() => handleClick(option)}>
                  {option.title}
                  <Icon type="right" className="filter-option-list-icon" />
                </li>
              ))}
            </ul>
          </div>
          {selectedValue === 'EQUALS' ? (
            <div style={{ padding: '0 12px', marginBottom: '12px' }}>
              <DatePicker placeholder="输入日期" borderType="bordered" value={dateValue} onChange={handleDateChange} allowClear showTime />
            </div>
          ) : null}
          {selectedValue === 'RANGE' ? (
            <div style={{ padding: '0 12px', marginBottom: '12px' }}>
              <RangePicker style={{ padding: '0 12px' }} value={rangeValue} borderType="bordered" onChange={handleRangeChange}></RangePicker>
            </div>
          ) : null}
          <div className="filter-footer" style={{ padding: '10px 12px', borderTop: '1px solid #ccc' }}>
            <Button
              onClick={handleReset}
              style={{
                margin: '0 6px',
              }}>
              重置
            </Button>
            <Button
              onClick={handleSearch}
              type="primary"
              style={{
                margin: '0 6px',
              }}>
              确定
            </Button>
          </div>
        </div>
      )
    }
    return {
      filterPanel,
    }
  }

  const [filters, setFilters] = React.useState([
    {
      code: 'order',
      filter: 'A',
      filterCondition: 'TODAY',
    },
  ])
  const dataSource = [
    {
      id: '1',
      No: 1,
      order: format(add(new Date(), { days: 3 }), 'yyyy-MM-dd'),
      from: '陕西环宇科技',
      to: '深圳环球科技',
      balance: '5,200.00',
    },
    {
      id: '2',
      No: 2,
      order: format(new Date(), 'yyyy-MM-dd'),
      from: '陕西环宇科技',
      to: '深圳环球科技',
      balance: '1,500.00',
    },
    {
      id: '3',
      No: 3,
      order: format(new Date('2023-05-23'), 'yyyy-MM-dd'),
      from: '陕西环宇科技',
      to: '深圳环球科技',
      balance: '5,300.00',
    },
    {
      id: '4',
      No: 4,
      order: format(add(new Date(), { days: 16 }), 'yyyy-MM-dd'),
      from: '陕西环宇科技',
      to: '深圳环球科技',
      balance: '5,400.00',
    },
    {
      id: '5',
      No: 5,
      order: format(sub(new Date(), { days: 15 }), 'yyyy-MM-dd'),
      from: '陕西环宇科技',
      to: '深圳环球科技',
      balance: '1,500.00',
    },
    {
      id: '6',
      No: 6,
      order: format(sub(new Date(), { months: 1 }), 'yyyy-MM-dd'),
      from: '陕西环宇科技',
      to: '深圳环球科技',
      balance: '1,500.00',
    },
    {
      id: '7',
      No: 7,
      order: format(sub(new Date(), { months: 2 }), 'yyyy-MM-dd'),
      from: '陕西环宇科技',
      to: '深圳环球科技',
      balance: '1,500.00',
    },
    {
      id: '8',
      No: 8,
      order: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
      from: '陕西环宇科技',
      to: '深圳环球科技',
      balance: '1,500.00',
    },
  ]
  const columns = [
    {
      code: 'No',
      name: '序号',
      width: 60,
      align: 'center',
    },
    {
      code: 'order',
      name: '单据创建时间',
      width: 200,
      features: {
        filterable: (value, { filterCondition: condition }) => {
          return (data) => {
            console.log(data, value, condition)
            if (data === null || !condition) {
              return false
            }
            switch (condition) {
              case 'TODAY':
                return isSameDay(new Date(), new Date(data))
              case 'THISWEEK': {
                return isSameWeek(new Date(), new Date(data), { weekStartsOn: 1 })
              }
              case 'THISMONTH':
                return isSameMonth(new Date(), new Date(data))
              case 'LASTMONTH':
                return isSameMonth(sub(new Date(), { months: 1 }), new Date(data))
              case 'LASTONEMONTH':
                return isWithinInterval(new Date(data), { start: sub(new Date(), { months: 1 }), end: new Date() })
              case 'LASTTHREEMONTH':
                return isWithinInterval(new Date(data), { start: sub(new Date(), { months: 3 }), end: new Date() })
              case 'RANGE': {
                const [start, end] = value
                return isWithinInterval(new Date(data), { start: start, end: end })
              }
              case 'EQUALS':
                if (Array.isArray(value) && value.length === 1) {
                  return isEqual(value[0], new Date(data))
                } else {
                  return isEqual(value, new Date(data))
                }
              default:
                return false
            }
          }
        },
        ...getColumnFilterPanelProps(),
      },
    },
    {
      code: 'from',
      name: '来户',
      width: 200,
      features: {
        filterable: true,
      },
    },
    {
      code: 'to',
      name: '往户',
      width: 200,
      features: {
        filterable: true,
      },
    },
    {
      code: 'balance',
      name: '应收余额',
      width: 100,
      align: 'right',
    },
  ]
  const handleFiltersChanged = (nextFilters) => {
    console.log('nextFilters', nextFilters)
    setFilters(nextFilters)
  }
  const filter = {
    filters,
    onChangeFilters: handleFiltersChanged,
  }
  return <Table dataSource={dataSource} columns={columns} filter={filter} />
}

ReactDOM.render(<Demo />, mountNode)
```

```css
.customFilter .filter-option-list ul{
  list-style: none;
  padding: 0;
}

.customFilter .filter-option-list ul li{
  height: 32px;
  line-height: 32px;
  padding: 0 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
}
.customFilter .filter-option-list ul li.active {
  background-color: #f2fff9;
  color: #29c392;
}

.customFilter .filter-option-list ul li .filter-option-list-icon {
  display: none;
}

.customFilter .filter-option-list ul li.active .filter-option-list-icon {
  display: block;
}

.customFilter .filter-footer {
  display: flex;
  justify-content: center;
}

```

