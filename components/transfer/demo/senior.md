---
order: 5
title: 高级功能
---

<br>穿梭框高级用法，可配置操作文案，可配置穿梭框标题，可配置无数据展示，可定制宽高。

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Transfer, Button } from '@kdcloudjs/kdesign'
import type { ITransferProps } from '@kdcloudjs/kdesign'

const Demo: React.FC = () => {
  const mockData: ITransferProps['dataSource'] = []
  const oriTargetKeys: ITransferProps['targetKeys'] = []

  const [targetKeys, setTargetKeys] = React.useState<ITransferProps['targetKeys']>(oriTargetKeys)
  const [selectedKeys, setSelectedKeys] = React.useState<ITransferProps['selectedKeys']>([])
  const handleChange: ITransferProps['onChange'] = (nextTargetKeys) => {
    setTargetKeys(nextTargetKeys)
  }

  const handleSelectChange: ITransferProps['onSelectChange'] = (sourceSelectedKeys, targetSelectedKeys) => {
    setSelectedKeys([...sourceSelectedKeys, ...targetSelectedKeys])
  }

  const listStyle = {
    width: '300px',
    height: '400px',
  }

  const noDataContent: ITransferProps['noDataContent'] = ({ direction }) => {
    if (direction === 'left') {
      return <div>Source is empty~</div>
    } else {
      return <div>Target is empty~</div>
    }
  }

  const renderFooter = () => (
    <Button size="small" style={{ float: 'right', margin: 5 }}>
      reload
    </Button>
  )

  return (
    <Transfer
      dataSource={mockData}
      targetKeys={targetKeys}
      selectedKeys={selectedKeys}
      onChange={handleChange}
      onSelectChange={handleSelectChange}
      render={(item) => item.title}
      listStyle={listStyle}
      titles={['Source', 'Target']}
      operations={['to right', 'to left']}
      noDataContent={noDataContent}
      footer={renderFooter}
      style={{ marginBottom: 16 }}
    />
  )
}

ReactDOM.render(<Demo />, mountNode)
```
