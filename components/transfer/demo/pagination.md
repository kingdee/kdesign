---
order: 4
title: 分页
---

<br>大数据下使用分页。

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
  const handleChange = (nextTargetKeys) => {
    setTargetKeys(nextTargetKeys)
  }

  const handleSelectChange = (sourceSelectedKeys, targetSelectedKeys) => {
    setSelectedKeys([...sourceSelectedKeys, ...targetSelectedKeys])
  }

  return (
    <Transfer
      dataSource={mockData}
      targetKeys={targetKeys}
      selectedKeys={selectedKeys}
      onChange={handleChange}
      onSelectChange={handleSelectChange}
      render={(item) => item.title}
      pagination
      style={{ marginBottom: 16 }}
    />
  )
}

ReactDOM.render(<Demo />, mountNode)
```