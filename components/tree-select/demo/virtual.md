---
order: 7
title: 大数据
---

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { TreeSelect } from '@kdcloudjs/kdesign'

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

function Demo() {
  const style = {
    width: '100%',
  }

  return (
    <div style={{ width: '300px' }}>
      <TreeSelect
        treeData={dataFactory(200, 0, 2)}
        allowClear
        placeholder="请输入名称"
        style={style}
        virtual={true}
        dropdownStyle={{ height: 200 }}
      />
    </div>
  )
}

ReactDOM.render(<Demo />, mountNode)
```
