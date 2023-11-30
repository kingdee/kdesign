---
order: 3
title: 卡片类型-页签位置
---

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Tabs, Button } from '@kdcloudjs/kdesign'

const Demo: React.FC = () => {
  const [position,setPosition] = React.useState('left')

  const style = { marginRight: '10px' }
  const boxStyle =
      position === 'left' || position === 'right'
        ? { width: '500px', height: '300px' }
        : { width: '500px' }

  return (
    <>
        <div style={{ marginBottom: '20px', width: '300px' }}>
          <Button type="primary" style={style} onClick={() => setPosition('top')}>
            top
          </Button>
          <Button
            type="primary"
            style={style}
            onClick={() => {
              setPosition('left')
            }}>
            left
          </Button>
          <Button
            type="primary"
            style={style}
            onClick={() => {
              setPosition('right')
            }}>
            right
          </Button>
          <Button
            type="primary"
            onClick={() => {
              setPosition('bottom')
            }}>
            bottom
          </Button>
          <div>position = {position}</div>
        </div>
        <div style={boxStyle}>
          <Tabs type="card" position={position} defaultActiveKey="TabPane1">
            <Tabs.TabPane key="TabPane1" tab="TabPane1" />
            <Tabs.TabPane key="TabPane2" tab="TabPane2" />
          </Tabs>
        </div>
      </>
  )
}

ReactDOM.render(<Demo />, mountNode)
```