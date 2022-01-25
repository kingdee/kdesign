---
title: 单选基础资料选择
order: 0
---

需要选择单个基础资料时。

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { BaseData } from '@kdcloudjs/kdesign'

function Demo() {
  const handleSingleSelect = (item, options) => {
    console.log('item', item)
    console.log('options', options)
  }

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
  return (
    <div>
      <BaseData columns={columns} options={data} onSelect={handleSingleSelect} />
    </div>
  )
}

ReactDOM.render(<Demo />, mountNode)
```
