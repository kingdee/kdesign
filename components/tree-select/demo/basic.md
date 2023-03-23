---
order: 0
title: 基本使用
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
  const [value, setValue] = React.useState('')
  const handleChange = (value) => {
    setValue(value)
  }

  return (
    <div style={{ width: '300px' }}>
      <TreeSelect
        treeData={data}
        value={value}
        allowClear
        placeholder="请输入名称"
        style={style}
        onChange={handleChange}
      />
    </div>
  )
}

ReactDOM.render(<Demo />, mountNode)
```
