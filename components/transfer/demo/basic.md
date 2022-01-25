---
order: 0
title: 基本用法
---

<br>基本的穿梭框。

展示了 `dataSource`、`targetKeys`、每行的渲染函数 `render` 以及回调函数 `onChange` `onSelectChange` 的用法。

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Transfer } from '@kdcloudjs/kdesign'

function Demo() {
  const mockData = []
  for (let i = 1; i < 20; i++) {
    mockData.push({
      key: i.toString(),
      title: `选项${i}`,
      description: `选项描述${i}`,
      disabled: i % 6 === 0,
    })
  }
  const oriTargetKeys = mockData.filter((item) => +item.key % 3 >= 1).map((item) => item.key)

  const [targetKeys, setTargetKeys] = React.useState(oriTargetKeys)
  const [selectedKeys, setSelectedKeys] = React.useState([])
  const handleChange = (nextTargetKeys, direction, moveKeys) => {
    setTargetKeys(nextTargetKeys)
    console.log('targetKeys: ', nextTargetKeys)
    console.log('direction: ', direction)
    console.log('moveKeys: ', moveKeys)
  }

  const handleSelectChange = (sourceSelectedKeys, targetSelectedKeys) => {
    setSelectedKeys([...sourceSelectedKeys, ...targetSelectedKeys])
    console.log('sourceSelectedKeys: ', sourceSelectedKeys)
    console.log('targetSelectedKeys: ', targetSelectedKeys)
  }

  return (
    <Transfer
      dataSource={mockData}
      targetKeys={targetKeys}
      selectedKeys={selectedKeys}
      onChange={handleChange}
      onSelectChange={handleSelectChange}
      render={(item) => item.title}
      style={{ marginBottom: 16 }}
    />
  )
}

ReactDOM.render(<Demo />, mountNode)
```