---
title: 配置节点下拉框
order: 4
---

配置面包屑节点的下拉框

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Breadcrumb } from '@kdcloudjs/kdesign'

const Demo: React.FC = () => {
  // 改下面的代码
  const config = [
    {
      title: 'KDesign',
      href: '#',
    },
    {
      title: 'KDesign React',
      href: '#',
      dropdownProps: {
        menu: [
          {
            key: 1,
            label: '按钮',
            href: 'https://react.kingdee.design/components/button',
          },
          {
            key: 2,
            label: '剪贴板',
            href: 'https://react.kingdee.design/components/clipboard',
          },
          {
            key: 3,
            label: '图标',
            href: 'https://react.kingdee.design/components/icon',
          },
        ],
      },
    },
    {
      title: 'Breadcrumb',
    },
  ]
  return <Breadcrumb items={config} />
}

ReactDOM.render(<Demo />, mountNode)
```
