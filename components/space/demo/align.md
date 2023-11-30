---
order: 3
title: 垂直对齐
---

设置组件之间的垂直对齐方式。

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Space, Button, Radio, Card } from '@kdcloudjs/kdesign'
import type { Align } from '@kdcloudjs/kdesign'

const Demo: React.FC = () => {
  const blockStyle = {
    marginTop: 10,
    padding: 20,
    background: 'rgba(0, 0, 0, .04)',
  }

  const [align, setAlign] = React.useState<Align | 'start'>('start')

  return (
    <>
      <Radio.Group value={align} onChange={(e) => setAlign(e.target.value)}>
        <Radio value="start">start</Radio>
        <Radio value="center">center</Radio>
        <Radio value="end">end</Radio>
        <Radio value="baseline">baseline</Radio>
      </Radio.Group>
      <div style={blockStyle}>
        <Space align={align}>
          {align}
          <Button type="primary">Primary</Button>
          <Card title="Card" style={{ width: 120 }}>
            <p>Card content</p>
            <p>Card content</p>
          </Card>
        </Space>
      </div>
    </>
  )
}

ReactDOM.render(<Demo />, mountNode)
```
