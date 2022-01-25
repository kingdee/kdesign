---
title: 禁用
order: 3
---

禁用状态

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { BaseData } from '@kdcloudjs/kdesign'

function Demo() {
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
      <BaseData columns={columns} options={data} placeholder="请选择" disabled />
      <BaseData
        mode="multiple"
        options={data}
        disabled
        columns={columns}
        value={[
          {
            value: 'CRMProvince000',
            label: '北京市',
          },
        ]}
      />
    </div>
  )
}

ReactDOM.render(<Demo />, mountNode)
```
