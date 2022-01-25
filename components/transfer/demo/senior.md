---
order: 5
title: 高级功能
---

<br>穿梭框高级用法，可配置操作文案，可配置穿梭框标题，可配置无数据展示，可定制宽高。

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Transfer, Button } from '@kdcloudjs/kdesign'

function Demo() {
  const mockData = []
  const oriTargetKeys = []

  const [targetKeys, setTargetKeys] = React.useState(oriTargetKeys)
  const [selectedKeys, setSelectedKeys] = React.useState([])
  const handleChange = (nextTargetKeys) => {
    setTargetKeys(nextTargetKeys)
  }

  const handleSelectChange = (sourceSelectedKeys, targetSelectedKeys) => {
    setSelectedKeys([...sourceSelectedKeys, ...targetSelectedKeys])
  }

  const listStyle = {
    width: '300px',
    height: '400px',
  }

  const noDataContent = ({ direction }) => {
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