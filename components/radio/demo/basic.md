---
order: 0
title: 类型
---

单选类型有两种： 单选项 和 单选框。

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Radio } from '@kdcloudjs/kdesign'

const Demo: React.FC = () => {
  return (
    <div  style={{ width: '250px' }}>
      <Radio>Default Radio</Radio>
      <Radio radioType="square">Square Radio</Radio>
    </div>
  )
}

ReactDOM.render(<Demo />, mountNode)
```
