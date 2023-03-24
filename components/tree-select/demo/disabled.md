---
order: 2
title: 禁用
---

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
    width: '100%',
  }
  return (
    <div style={{ width: '300px' }}>
      <TreeSelect
        treeData={data}
        defaultValue={'0-1'}
        allowClear
        disabled
        placeholder="请输入名称"
        style={style}/>
      <br />
      <br />
      <TreeSelect
        treeData={data}
        disabled
        defaultValue={['0-1']}
        allowClear
        mode="multiple"
        placeholder="请输入名称"
        style={style}/>
    </div>
  )
}

ReactDOM.render(<Demo />, mountNode)
```
