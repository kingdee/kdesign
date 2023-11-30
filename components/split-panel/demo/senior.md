---
title: 高级用法
order: 4
---

<br>通过设置`canFold`隐藏折叠 icon，通过`lineStyle`自定义分割线样式

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
  const lineStyle = (mode) => {
    if (mode === 'horizontal') {
      return { width: '2px', background: 'transparent', borderLeft: '1px solid #ccc', borderRight: '1px solid #ccc' }
    }
  }
  return (
    <div className="demo-sp lit" style={{ height: '200px', width: '600px' }}>
      <SplitPanel firstSlot={<First />} secondSlot={<Second />} lineStyle={lineStyle} canFold={false} />
    </div>
  )
}

ReactDOM.render(<Demo />, mountNode)
```