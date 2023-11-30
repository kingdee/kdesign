---
title: 自定义指示符
order: 5
---

通过设置 `indicator` 使用自定义的加载动画

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Spin, Icon } from '@kdcloudjs/kdesign'

const Demo: React.FC = () => {
  const customIndicator = <Icon type="loadding" spin />

  return (
    <>
      <Spin type="component" indicator={customIndicator} />
    </>
  )
}

ReactDOM.render(<Demo />, mountNode)
```
