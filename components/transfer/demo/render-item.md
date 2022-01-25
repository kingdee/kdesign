---
order: 3
title: 自定义渲染行数据
---

<br>自定义渲染每一个 Transfer Item，可用于渲染复杂数据。

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

  const renderItem = (item) => {
    const customLabel = (
      <span className="custom-item">
        {item.title} - {item.description}
      </span>
    )
    return {
      label: customLabel, // lable需要使用ReactNode类型用于渲染item
      value: item.title, // 用于标题还有搜索过滤
    }
  }

  return (
    <Transfer
      dataSource={mockData}
      targetKeys={targetKeys}
      selectedKeys={selectedKeys}
      onChange={handleChange}
      onSelectChange={handleSelectChange}
      render={renderItem}
      style={{ marginBottom: 16 }}
    />
  )
}

ReactDOM.render(<Demo />, mountNode)
```