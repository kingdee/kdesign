---
order: 4
title: 节点可拖拽
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
  const [treeData, setTreeData] = React.useState(data)
  const newData = [...treeData]

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

  const onDrop = (info) => {
    const { node, dragNode, dragNodesKeys, dropPosition } = info
    console.log('onDrop', info)
    const dropKey = node.key
    const dragKey = dragNode.key
    if (dragNodesKeys.includes(dropKey)) {
      return;
    }
    let dragObject
    if (dropKey === dragKey) return
    const loopDelete = (data, dropKey, dragKey) => {
      for (let i = 0; i < data.length; i++) {
        if (data[i].key === dragKey) {
          dragObject = data[i]
          data.splice(i, 1)
        } else {
          data[i].children && loopDelete(data[i].children, dropKey, dragKey)
        }
      }
    }
    const loopAdd = (data, dropKey, dragKey) => {
      for (let i = 0; i < data.length; i++) {
        if (data[i].key === dropKey) {
          // dropPosition 指的是被拖拽节点被 drop 的位置，如插入在节点前则为 -1，在节点后则为 1，落在其上则为 0
          if (dropPosition !== 0) {
            data.splice(i + 1, 0, dragObject)
          } else {
            data[i].children = data[i].children || [];
            data[i].children.push(dragObject);
          }
          break
        } else {
          data[i].children && loopAdd(data[i].children, dropKey, dragKey)
        }
      }
    }
    loopDelete(newData, dropKey, dragKey)
    loopAdd(newData, dropKey, dragKey)
    setTreeData(newData)
  }

  const onDragStart = (info) => {
    console.log('onDragStart', info)
  }

  const onDragOver = (info) => {
    console.log('onDragOver', info)
  }

  const onDragLeave = (info) => {
    console.log('onDragLeave', info)
  }

  const onDragEnter = (info) => {
    console.log('onDragEnter', info)
  }

  const onDragEnd = (event, info) => {
    console.log('onDragEnd', info)
  }

  return (
    <div style={{ width: '300px', height: '300px' }}>
      <Tree
        name="Tree"
        treeData={treeData}
        expandedKeys={expandedKeys}
        checkedKeys={checkedKeys}
        checkStrictly={true}
        checkable={true}
        onCheck={onCheck}
        onExpand={onExpand}
        onSelect={onSelect}
        virtual={false}
        draggable
        onDrop={onDrop}
        onDragStart={onDragStart}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDragEnter={onDragEnter}
        onDragEnd={onDragEnd}
      />
    </div>
  )
}

ReactDOM.render(<Demo />, mountNode)
```