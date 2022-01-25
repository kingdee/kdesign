---
title: 上下分割
order: 1
---

<br>通过设置`mode`为`vertical`将分割容器转为上下分割模式

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
      <SplitPanel mode="vertical" firstSlot={<First />} secondSlot={<Second />} onFold={onFold} />
    </div>
  )
}

ReactDOM.render(<Demo />, mountNode)
```