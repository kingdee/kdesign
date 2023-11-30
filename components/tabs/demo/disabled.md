---
order: 7
title: 禁用态
---

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Tabs } from '@kdcloudjs/kdesign'

const Demo: React.FC = () => {
  const showChange = (id) => {
    console.log('id change =>', id)
  }
  return (
    <>
      <div style={{ width: '500px' }}>
        <Tabs disabled defaultActiveKey="TabPane1" onChange={showChange}>
          <Tabs.TabPane key="TabPane1" tab="TabPane1" />
          <Tabs.TabPane key="TabPane2" tab="TabPane2" />
        </Tabs>
        <br />
        <Tabs defaultActiveKey="TabPane1">
          <Tabs.TabPane key="TabPane1" tab="TabPane1" />
          <Tabs.TabPane key="TabPane2" tab="TabPane2" disabled />
        </Tabs>
        <br />
        <Tabs type="card" disabled defaultActiveKey="TabPane1">
          <Tabs.TabPane key="TabPane1" tab="TabPane1" />
          <Tabs.TabPane key="TabPane2" tab="TabPane2" />
        </Tabs>
        <br />
        <Tabs type="card" defaultActiveKey="TabPane2">
          <Tabs.TabPane key="TabPane1" tab="TabPane1" disabled />
          <Tabs.TabPane key="TabPane2" tab="TabPane2" />
        </Tabs>
      </div>
    </>
  )
}

ReactDOM.render(<Demo />, mountNode)
```