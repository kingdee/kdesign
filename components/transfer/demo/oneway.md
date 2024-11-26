---
order: 1
title: 单向模式
---

<br>通过`oneWay`属性将穿梭框转为单向模式

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Transfer } from '@kdcloudjs/kdesign'
import type { ITransferProps } from '@kdcloudjs/kdesign'

const Demo: React.FC = () => {
  const mockData: ITransferProps['dataSource'] = []
  for (let i = 1; i < 20; i++) {
    mockData.push({
      key: i.toString(),
      title: `选项${i}`,
      description: `选项描述${i}`,
      disabled: i % 6 === 0,
    })
  }
  const oriTargetKeys = mockData.filter((item) => +item.key % 3 >= 1).map((item) => item.key)

  const [targetKeys, setTargetKeys] = React.useState<ITransferProps['targetKeys']>(oriTargetKeys)
  const [selectedKeys, setSelectedKeys] = React.useState<ITransferProps['selectedKeys']>([])
  const handleChange: ITransferProps['onChange'] = (nextTargetKeys, direction, moveKeys) => {
    setTargetKeys(nextTargetKeys)
    console.log('targetKeys: ', nextTargetKeys)
    console.log('direction: ', direction)
    console.log('moveKeys: ', moveKeys)
  }

  const handleSelectChange: ITransferProps['onSelectChange'] = (sourceSelectedKeys, targetSelectedKeys) => {
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
      oneWay
    />
  )
}

ReactDOM.render(<Demo />, mountNode)
```
