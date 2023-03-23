---
order: 3
title: 边框类型
---

我们提供带下边框、全边框和无边框三种边框类型的输入框，配置属性 borderType 即可在这三种类型间切换。

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { TreeSelect } from '@kdcloudjs/kdesign'

const data = [
  {
    key: '0',
    title: '0',
    children: [
      {
        key: '0-0',
        title: '0-0',
        children: [],
      },
      {
        key: '0-1',
        title: '0-1',
        children: [],
      },
    ],
  },
  {
    key: '1',
    title: '1',
    children: [
      {
        key: '1-0',
        title: '1-0',
        children: [],
      },
      {
        key: '1-1',
        title: '1-1',
        children: [
          {
            key: '1-1-0',
            title: '1-1-0',
            children: [
              {
                key: '1-1-0-0',
                title: '1-1-0-0',
                children: [],
              },
            ],
          },
          {
            key: '1-1-1',
            title: '1-1-1',
            children: [
              {
                key: '1-1-1-0',
                title: '1-1-1-0',
                children: [],
              },
            ],
          },
        ],
      },
      {
        key: '1-2',
        title: '1-2',
        children: [],
      },
    ],
  },
  {
    key: '2',
    title: '2',
    children: [],
  },
  {
    key: '3',
    title: '3',
    children: [],
  },
]

function Demo() {
  const style = {
    width: 230,
    marginRight: 20,
  }

  const borderTypes = ['none', 'underline', 'bordered']
  return (
    <>
      {borderTypes.map((type) => (
        <TreeSelect key={type} borderType={type} treeData={data} allowClear placeholder="请输入名称" style={style} />
      ))}
    </>
  )
}

ReactDOM.render(<Demo />, mountNode)
```
