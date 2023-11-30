---
order: 12
title: 扩展菜单
---

通过 `dropdownRender` 可以对下拉框进行自定义扩展。

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

  function dropdownRender(menus) {
    return (
      <div>
        {menus}
        <div style={{ borderBottom: '1px solid #d9d9d9' }} />
        <div style={{ padding: 8 }}>这是自定义底部</div>
      </div>
    )
  }

  return (<div style={{ width: '200px' }}><Cascader style={{ width: '200px' }} options={options} dropdownRender={dropdownRender} placeholder="Please select" /></div>)
}

ReactDOM.render(<Demo />, mountNode)
```
