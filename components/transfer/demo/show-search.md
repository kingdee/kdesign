---
order: 2
title: 带搜索框
---

<br>带搜索框的穿梭框，可以通过 `filterOption` 自定义搜索函数，对正确的结果需返回 `true`,反之返回`false`。

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Transfer } from '@kdcloudjs/kdesign'

const Demo: React.FC = () => {
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
  const [selectedKeys, setSelectedKeys] = React.useState<Array<TransferItem>>([])
  const handleChange = (nextTargetKeys) => {
    setTargetKeys(nextTargetKeys)
  }

  const handleSelectChange = (sourceSelectedKeys, targetSelectedKeys) => {
    setSelectedKeys([...sourceSelectedKeys, ...targetSelectedKeys])
  }

  const filterOption = (inputValue, option) => {
    return option.title.includes(inputValue)
  }

  return (
    <Transfer
      dataSource={mockData}
      targetKeys={targetKeys}
      selectedKeys={selectedKeys}
      onChange={handleChange}
      onSelectChange={handleSelectChange}
      render={(item) => item.title}
      showSearch
      filterOption={filterOption}
      searchPlaceholder={['自定义的左placeholder', '自定义的右placeholder']}
      style={{ marginBottom: 16 }}
    />
  )
}

ReactDOM.render(<Demo />, mountNode)
```
