---
order: 11
title: 自定义图标
---

`suffixIcon` 自定义选择框后缀图标，`expandIcon` 自定义菜单展开图标。

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Cascader, Icon } from '@kdcloudjs/kdesign'

const Demo: React.FC = () => {
  const options = [
    {
      value: 'guangdong',
      label: 'Guangdong',
      children: [
        {
          value: 'guangzhou',
          label: 'Guangzhou',
          children: [
            {
              value: 'tianhe',
              label: 'Tian He',
            },
            {
              value: 'yuexiu',
              label: 'Yue Xiu',
            },
          ],
        },
        {
          value: 'shenzhen',
          label: 'Shenzhen',
          children: [
            {
              value: 'futian',
              label: 'Fu Tian',
            },
            {
              value: 'nanshan',
              label: 'Nan Shan',
            },
          ],
        },
      ],
    },
    {
      value: 'jiangxi',
      label: 'Jiangxi',
      children: [
        {
          value: 'nanchang',
          label: 'Nanchang',
          children: [
            {
              value: 'donghu',
              label: 'Dong Hu',
            },
            {
              value: 'qingshanhu',
              label: 'Qing Shan Hu',
            },
          ],
        },
        {
          value: 'ganzhou',
          label: 'Ganzhou',
          children: [
            {
              value: 'zhanggong',
              label: 'Zhang Gong',
            },
            {
              value: 'ningdu',
              label: 'Ning Du',
            },
          ],
        },
      ],
    },
  ]
  
  function onChange(value) {
    console.log(value)
  }

  return (
    <div style={{ width: '200px' }}>
      <Cascader suffixIcon={<Icon type="arrow-down-solid" style={{ fontSize: 20 }} />} options={options} onChange={onChange} placeholder="Please select" />
      <br />
      <br />
      <Cascader expandIcon={<Icon type="location-solid" />} options={options} onChange={onChange} placeholder="Please select" />
    </div>
  )
}

ReactDOM.render(<Demo />, mountNode)
```
