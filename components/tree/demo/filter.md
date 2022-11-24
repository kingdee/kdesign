---
order: 10
title: 节点过滤
---

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Tree, Input } from '@kdcloudjs/kdesign'

function Demo() {
  const [expandedKeys, setExpandedKeys] = React.useState([])
  const [selectedKeys, setSelectedKeys] = React.useState(['1-1'])
  const [value, setValue] = React.useState('')
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
          key: '1-11',
          title: '1-11',
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
  const onSelect = (selectedKeys) => {
    setSelectedKeys(selectedKeys)
    console.log('onSelect', selectedKeys)
  }

  const onExpand = (expandedKeys) => {
    console.log('onExpand', expandedKeys)
    setExpandedKeys(expandedKeys)
  }

  const filterTreeNode = (node) => {
    if (node.title.includes(value)) {
      return true
    }
    return false
  }

  return (
    <div style={{ width: '300px', height: '300px' }}>
      <Input placeholder="输入关键字进行过滤" onChange={(e)=> setValue(e.target.value)} />
      <Tree
        name="Tree"
        treeData={data}
        expandedKeys={expandedKeys}
        onSelect={onSelect}
        selectedKeys={selectedKeys}
        onExpand={onExpand}
        filterTreeNode={filterTreeNode}
        filterValue={value}
        virtual={false}
      />
    </div>
  )
}

ReactDOM.render(<Demo />, mountNode)
```