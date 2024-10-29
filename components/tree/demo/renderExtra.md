---
order: 12
title: 定制额外节点
---

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Tree, Icon } from '@kdcloudjs/kdesign'
import type { TreeNodeData } from '@kdcloudjs/kdesign'

const Demo: React.FC = () => {
  const data: TreeNodeData[] = [
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

  return (
    <div style={{ width: '300px', height: '300px' }}>
      <Tree
        treeData={data}
        renderExtra={(nodeData) => {
          return (
            <span className="kd-tree-node-extra">
              <Icon type="delete" />
              <Icon style={{ marginLeft: 10 }} type="add-child" />
            </span>
          )
        }}
      />
    </div>
  )
}

ReactDOM.render(<Demo />, mountNode)
```

```css
.kd-tree-node-extra {
  position: absolute;
  right: 10px;
  font-size: 14px;
  visibility: hidden;
}
.kd-tree-node-item:hover .kd-tree-node-extra {
  visibility: visible;
}
```
