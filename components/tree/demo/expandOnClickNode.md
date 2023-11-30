---
order: 7
title: 缩进模式可配置
---

树控件点击下拉按钮展开子节点内容；点击菜单行选中该节点，可根据需要进行配置

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Tree } from '@kdcloudjs/kdesign'
import type { TreeNodeData } from '@kdcloudjs/kdesign'


const Demo: React.FC = () => {
  const [expandedKeys, setExpandedKeys] = React.useState<Array<string>>(['0-1', '0', '1'])
  const [selectedKeys, setSelectedKeys] = React.useState<Array<string>>(['1-1'])
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
        treeData={data}
        expandedKeys={expandedKeys}
        onSelect={onSelect}
        selectedKeys={selectedKeys}
        onExpand={onExpand}
        virtual={false}
        expandOnClickNode={false}
      />
    </div>
  )
}

ReactDOM.render(<Demo />, mountNode)
```
