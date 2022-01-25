---
order: 1
title: 卡片类型
---

通过设置 `type = 'card'` 可变为卡片页签

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Tabs } from '@kdcloudjs/kdesign'

function Demo() {
  return (
    <>
      <div style={{ width: '500px' }}>
        <Tabs type="card" defaultActiveKey="TabPane1">
          <Tabs.TabPane key="TabPane1" tab="TabPane1" />
          <Tabs.TabPane key="TabPane2" tab="TabPane2" />
        </Tabs>
      </div>
    </>
  )
}

ReactDOM.render(<Demo />, mountNode)
```