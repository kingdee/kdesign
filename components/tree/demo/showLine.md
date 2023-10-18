---
order: 11
title: 连接线
---

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Tree } from '@kdcloudjs/kdesign'

function Demo() {
  const [expandedKeys, setExpandedKeys] = React.useState(['0-1', '0', '1'])
  const [selectedKeys, setSelectedKeys] = React.useState(['0'])
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
  ]
  const onSelect = (selectedKeys, info) => {
    setSelectedKeys(selectedKeys)
    console.log('onSelect', selectedKeys)
  }

  const onExpand = (expandedKeys, info) => {
    console.log('onExpand', expandedKeys)
    setExpandedKeys(expandedKeys)
  }

  return (
    <div style={{ width: '300px', height: '300px' }}>
      <Tree
        name="Tree"
        treeData={data}
        expandedKeys={expandedKeys}
        onSelect={onSelect}
        onExpand={onExpand}
        selectedKeys={selectedKeys}
        virtual={false}
        showLine
      />
    </div>
  )
}

ReactDOM.render(<Demo />, mountNode)
```
