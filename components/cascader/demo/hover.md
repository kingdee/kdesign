---
order: 3
title: 移入展开
---

默认是点击展开，可以通过修改 `expandTrigger` 修改为移入展开下级菜单，点击完成选择。

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Cascader } from '@kdcloudjs/kdesign'

function Demo() {
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
  
  function displayRender(labels) {
    return labels[labels.length - 1]
  }

  return (
    <div style={{ width: '200px' }}>
      <Cascader
        style={{ width: '200px' }}
        options={options}
        expandTrigger="hover"
        displayRender={displayRender}
        onChange={onChange}
        placeholder="请选择"
      />
    </div>
  )
}

ReactDOM.render(<Demo />, mountNode)
```
