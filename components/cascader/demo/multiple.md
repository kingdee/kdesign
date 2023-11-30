---
order: 0
title: 多选
---


```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Cascader } from '@kdcloudjs/kdesign'
import type { CascaderValueType } from '@kdcloudjs/kdesign'

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

  const [value, setValue] = React.useState<CascaderValueType>([['guangdong', 'shenzhen', 'nanshan']])

  function onChange(value) {
    console.log(value)
    setValue(value)
  }

  return (
    <div style={{ width: '200px' }}>
      <Cascader
        options={options}
        onChange={onChange}
        placeholder="Please select"
        mode="multiple"
        value={value}
        bordered
        maxTagCount={1}
        displayRender={(opts) => opts[opts.length - 1]}
      />
    </div>
  )
}

ReactDOM.render(<Demo />, mountNode)
```
