---
order: 4
title: 限制多选tag
---

最多显示多少个 tag, 以及隐藏 tag 时显示的内容

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
        defaultValue={['0', '0-1', '0-0']}
        allowClear
        mode="multiple"
        maxTagCount={2}
        maxTagPlaceholder={(data) => `总共${data.length}项`}
        placeholder="请输入名称"
        style={style}
      />
    </div>
  )
}

ReactDOM.render(<Demo />, mountNode)
```
