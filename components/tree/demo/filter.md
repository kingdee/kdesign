---
order: 10
title: 节点过滤
---

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Tree, Input } from '@kdcloudjs/kdesign'
import type { TreeNodeData } from '@kdcloudjs/kdesign'

const Demo: React.FC = () => {
  const [expandedKeys, setExpandedKeys] = React.useState<Array<string>>([])
  const [selectedKeys, setSelectedKeys] = React.useState<Array<string>>(['1-1'])
  const [value, setValue] = React.useState<string>('')
  const data: TreeNodeData[] = [
    {
      key: '0',
      title: '家具',
      children: [
        {
          key: '0-0',
          title: '沙发',
          children: [],
        },
        {
          key: '0-1',
          title: '餐桌',
          children: [],
        },
      ],
    },
    {
      key: '1',
      title: '电子产品',
      children: [
        {
          key: '1-0',
          title: '商用电子',
          children: [],
        },
        {
          key: '1-11',
          title: '日用电子',
          children: [
            {
              key: '1-1-0',
              title: '手机',
              children: [
                {
                  key: '1-1-0-0',
                  title: '华为',
                  children: [],
                },
              ],
            },
            {
              key: '1-1-1',
              title: '电脑',
              children: [
                {
                  key: '1-1-1-0',
                  title: '笔记本',
                  children: [],
                },
              ],
            },
          ],
        },
        {
          key: '1-2',
          title: '研发电子',
          children: [],
        },
      ],
    },
    {
      key: '2',
      title: '食品',
      children: [],
    },
    {
      key: '3',
      title: '服装',
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
      <Input placeholder="输入关键字进行过滤" onChange={(e) => setValue(e.target.value)} />
      <Tree
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
