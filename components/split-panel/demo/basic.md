---
title: 基本用法
order: 0
---

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { SplitPanel } from '@kdcloudjs/kdesign'

const Demo: React.FC = () => {
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
    <div className="demo-split" style={{ height: '200px', width: '600px' }}>
      <SplitPanel firstSlot={<First />} secondSlot={<Second />} onFold={onFold} />
    </div>
  )
}

ReactDOM.render(<Demo />, mountNode)
```