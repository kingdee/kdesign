---
order: 4
title: 线型页签-页签位置
---

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Tabs, Button } from '@kdcloudjs/kdesign'

const Demo: React.FC = () => {
  const [position, SetPosition] = React.useState('top')

  const setPosition = (position) => {
    setPosition(position)
  }
  const style = { marginRight: '10px' }
  const boxStyle =
      position === 'left' || position === 'right'
        ? { width: '120px', height: '300px' }
        : { width: '500px' }
  return (
    <>
        <div style={{ marginBottom: '20px', width: '350px'  }}>
          <Button type="primary" style={style} onClick={() => setPosition('top')}>
            top
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
          <Tabs position={position} defaultActiveKey="TabPane1">
            <Tabs.TabPane key="TabPane1" tab="TabPane1" />
            <Tabs.TabPane key="TabPane2" tab="TabPane2" />
          </Tabs>
        </div>
      </>
  )
}

ReactDOM.render(<Demo />, mountNode)
```