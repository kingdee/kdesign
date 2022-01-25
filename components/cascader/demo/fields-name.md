---
order: 10
title: 自定义字段名
---

`fieldNames` 属性修改字段名。

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Cascader } from '@kdcloudjs/kdesign'

function Demo () {
  const options = [
    {
      code: 'guangdong',
      name: 'Guangdong',
      items: [
        {
          code: 'guangzhou',
          name: 'Guangzhou',
          items: [
            {
              code: 'tianhe',
              name: 'Tian He',
            },
            {
              code: 'yuexiu',
              name: 'Yue Xiu',
            },
          ],
        },
        {
          code: 'shenzhen',
          name: 'Shenzhen',
          items: [
            {
              code: 'futian',
              name: 'Fu Tian',
            },
            {
              code: 'nanshan',
              name: 'Nan Shan',
            },
          ],
        },
      ],
    },
    {
      code: 'jiangxi',
      name: 'Jiangxi',
      items: [
        {
          code: 'nanchang',
          name: 'Nanchang',
          items: [
            {
              code: 'donghu',
              name: 'Dong Hu',
            },
            {
              code: 'qingshanhu',
              name: 'Qing Shan Hu',
            },
          ],
        },
        {
          code: 'ganzhou',
          name: 'Ganzhou',
          items: [
            {
              code: 'zhanggong',
              name: 'Zhang Gong',
            },
            {
              code: 'ningdu',
              name: 'Ning Du',
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
    style={{ width: '200px' }}
      fieldNames={{ label: 'name', value: 'code', children: 'items' }}
      options={options}
      onChange={onChange}
      placeholder="Please select"
    /></div>
  )
}

ReactDOM.render(<Demo />, mountNode)
```
