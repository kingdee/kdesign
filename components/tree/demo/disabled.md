---
order: 3
title: 禁用节点
---

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Tree } from '@kdcloudjs/kdesign'


function Demo() {
  const [expandedKeys, setExpandedKeys] = React.useState(['0-1', '0', '1'])
  const [checkedKeys, setCheckedKeys] = React.useState(['1-1'])
  const [selectedKeys, setSelectedKeys] = React.useState(['1-1'])
  const data = [
    {
      key: '0',
      title: '0',
      children: [
        {
          key: '0-0',
          title: '0-0',
          disabled: true,
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
      disabled: true,
      children: [
        {
          key: '1-0',
          title: '1-0',
          children: [],
        },
        {
          key: '1-1',
          title: '1-1',
          disabled: true,
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

  const onCheck = (checkedKeys, info) => {
    console.log('checkedKeys', checkedKeys)
    setCheckedKeys(checkedKeys)
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
        checkedKeys={checkedKeys}
        checkStrictly={true}
        virtual={false}
        checkable={true}
        onCheck={onCheck}
        onExpand={onExpand}
        onSelect={onSelect}
      />
    </div>
  )
}

ReactDOM.render(<Demo />, mountNode)
```