---
title: 定义阈值
order: 3
---

<br>可自定义`min`和`max`阈值，min 为第一个面板的最小宽度，max 为第二个面板的最小宽度

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { SplitPanel } from '@kdcloudjs/kdesign'

function Demo() {
  function First() {
    return <div>first panel</div>
  }
  function Second() {
    return <div>second panel</div>
  }
  const onFold = (e, direction) => {
    console.log('onFold', e, direction)
  }
  return (
    <div className="demo-spli t" style={{ height: '200px', width: '600px' }}>
      <SplitPanel firstSlot={<First />} secondSlot={<Second />} min={0.2} max={0.2} onFold={onFold} />
    </div>
  )
}

ReactDOM.render(<Demo />, mountNode)
```