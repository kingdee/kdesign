---
order: 6
title: 小尺寸样式
---

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Tabs } from '@kdcloudjs/kdesign'

const Demo: React.FC = () => {
  return (
    <>
      <div style={{ width: '500px' }}>
        <Tabs size="small" defaultActiveKey="TabPane1">
          <Tabs.TabPane key="TabPane1" tab="TabPane1" />
          <Tabs.TabPane key="TabPane2" tab="TabPane2" />
        </Tabs>
        <br />
        <Tabs type="card" size="small" defaultActiveKey="TabPane1">
          <Tabs.TabPane key="TabPane1" tab="TabPane1" />
          <Tabs.TabPane key="TabPane2" tab="TabPane2" />
        </Tabs>
      </div>
      <br />
      <div style={{ width: '500px', height: '300px' }}>
        <Tabs type="card" position="left" size="small" defaultActiveKey="TabPane1">
          <Tabs.TabPane key="TabPane1" tab="TabPane1" />
          <Tabs.TabPane key="TabPane2" tab="TabPane2" />
        </Tabs>
      </div>
    </>
  )
}

ReactDOM.render(<Demo />, mountNode)
```