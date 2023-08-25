---
title: 可配置历史记录及收藏
order: 2
---

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { BaseData } from '@kdcloudjs/kdesign'

function Demo() {
  const [collectArr, setCollectArr] = React.useState([])
  const [historyList, setHistoryList] = React.useState([])
  const [value, setValue] = React.useState([])

  const columns = [
    { title: '解码', key: 'value' },
    { title: '名称', key: 'label' },
  ]

  const data = [
    {
      value: 'CRMProvince000',
      label: '北京市',
    },
    {
      value: 'CRMProvince001',
      label: '甘肃省',
    },
    {
      value: 'CRMProvince002',
      label: '湖南省',
    },
    {
      value: 'CRMProvince003',
      label: '湖北省',
    },
    {
      value: 'CRMProvince004',
      label: '江西省',
    },
  ]

  const handleCollect = (flag, item) => {
    if (flag) {
      setCollectArr([...collectArr, item])
    } else {
      setCollectArr(collectArr.filter((v) => v.value !== item.value))
    }
  }

  const handleChange = (value, list) => {
    setValue(list)
  }

  const handleSelect = (a, item) => {
    const index = historyList.findIndex(v => v.value === a)
    index > -1 && historyList.splice(index, 1)
    setHistoryList([item, ...historyList])
  }

  return (
    <div>
      <BaseData
        mode="multiple"
        // onSearch={handleSearch}
        showFrequent
        showCollectIcon
        options={data}
        collectList={collectArr}
        historyList={historyList}
        columns={columns}
        value={value}
        onCollect={handleCollect}
        onSelect={handleSelect}
        onChange={handleChange}
      />
    </div>
  )
}

ReactDOM.render(<Demo />, mountNode)
```
