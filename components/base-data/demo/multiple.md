---
title: 多选基础资料选择
order: 1
---

需要选择多个基础资料时使用

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { BaseData } from '@kdcloudjs/kdesign'

const Demo: React.FC = () => {
  const [options, setOptions] = React.useState([])
  const [loading, setLoading] = React.useState(false)

  const handleChange = (values, options) => {
    console.log('a', values)
    console.log('b', options)
    // setValue(options)
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

  const handleSearch = (val) => {
    setLoading(true)
    setTimeout(() => {
      setOptions(data)
      setLoading(false)
    }, 500)
  }
  return (
    <div>
      <BaseData
        mode="multiple"
        onChange={handleChange}
        onSearch={handleSearch}
        options={options}
        columns={columns}
        loading={loading}
        // value={value}
      />
    </div>
  )
}

ReactDOM.render(<Demo />, mountNode)
```
