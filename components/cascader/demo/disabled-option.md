---
order: 4
title: 禁用选项
---

在 `options` 里的添加 `disabled` 字段。

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Cascader } from '@kdcloudjs/kdesign'

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
      disabled: true,
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

  return (<div style={{ width: '200px' }}><Cascader  style={{ width: '200px' }} options={options} onChange={onChange} placeholder="请选择" /></div>)
}

ReactDOM.render(<Demo />, mountNode)
```
