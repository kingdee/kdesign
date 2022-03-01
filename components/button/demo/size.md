---
title: 按钮尺寸 size
order: 2
---

按钮有三个尺寸：小号、中号、大号（默认为中号按钮）

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Button, Radio } from '@kdcloudjs/kdesign'

function Demo() {
  const demoButtonStyle = { margin: '0px 8px 8px 0' }
  const [size, setSize] = React.useState('middle')
  return (
    <div style={{ width: '400px' }}>
      <Radio.Group
        style={{ marginBottom: 32 }}
        onChange={(e) => {
          setSize(e.target.value)
        }}
        defaultValue={size}>
        <Radio value={'small'}>小</Radio>
        <Radio value={'middle'}>中</Radio>
        <Radio value={'large'}>大</Radio>
      </Radio.Group>
      <div>
        <Button type="primary" size={size} style={demoButtonStyle}>
          主要按钮
        </Button>
        <Button size={size} style={demoButtonStyle}>
          次要按钮
        </Button>
        <Button type="ghost" size={size} style={demoButtonStyle}>
          幽灵按钮
        </Button>
        <Button type="primary" shape="round" size={size} style={demoButtonStyle}>
          椭圆
        </Button>
        <Button type="primary" shape="circle" size={size} style={demoButtonStyle}>
          圆
        </Button>
        <Button type="text" size={size} style={demoButtonStyle}>
          text
        </Button>
      </div>
    </div>
  )
}

ReactDOM.render(<Demo />, mountNode)
```
