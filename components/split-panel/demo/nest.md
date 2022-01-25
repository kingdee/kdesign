---
title: 嵌套使用
order: 2
---

<br>垂直模式和水平模式可以嵌套使用

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { SplitPanel } from '@kdcloudjs/kdesign'

function Demo() {
  function Top() {
    return <div>top panel</div>
  }
  function Bottom() {
    return <div>bottom panel</div>
  }
  function Left() {
    return <SplitPanel mode="vertical" style={{ border: 'none' }} firstSlot={<Top />} secondSlot={<Bottom />} />
  }
  function Right() {
    return <div>right panel</div>
  }
  return (
    <div className="demo-split" style={{ height: '200px', width: '600px' }}>
      <SplitPanel firstSlot={<Left />} secondSlot={<Right />} />
    </div>
  )
}

ReactDOM.render(<Demo />, mountNode)
```