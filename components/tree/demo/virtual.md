---
order: 7
title: 大数据启用虚模式
---

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Tree } from '@kdcloudjs/kdesign'

function Demo() {
  const dataFactory = (leafLength = 1000, level = 0, maxLevel = 3, preKey = 0) => {
    const treeData = []
    for (let i = 0; i < leafLength; i++) {
      const key = preKey ? `${preKey}-${i}` : `${i}`
      let _level = level
      const node = { title: key, key }
      if (_level <= maxLevel) {
        _level++
        node.children = dataFactory(3, _level, maxLevel, key)
      }
      treeData.push(node)
    }
    return treeData
  }
  const [expandedKeys, setExpandedKeys] = React.useState(['0-1', '0', '1'])
  const [checkedKeys, setCheckedKeys] = React.useState(['1-1'])
  const [selectedKeys, setSelectedKeys] = React.useState(['0'])
  const [treeData, setTreeData] = React.useState(dataFactory(200, 0, 2))
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

  const [scrollToKey, setScrollToKey] = React.useState('16-0')
  return (
    <div style={{ width: '300px', height: '300px' }}>
      <Tree
        name="Tree"
        treeData={treeData}
        expandedKeys={expandedKeys}
        checkedKeys={checkedKeys}
        selectedKeys={selectedKeys}
        scrollToKey={scrollToKey}
        virtual={true}
        onCheck={onCheck}
        onExpand={onExpand}
        onSelect={onSelect}
      />
    </div>
  )
}

ReactDOM.render(<Demo />, mountNode)
```