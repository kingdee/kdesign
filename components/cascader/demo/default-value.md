---
order: 1
title: 默认值
---

设置一个数组给 `defaultValue`

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
      <Cascader
        defaultValue={['guangdong', 'shenzhen', 'nanshan']}
        options={options}
        onChange={onChange}
        placeholder="Please select"
      />
    </div>
  )
}

ReactDOM.render(<Demo />, mountNode)
```
