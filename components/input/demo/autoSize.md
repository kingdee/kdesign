---
title: Textarea - 适应文本高度的文本域
order: 6
---

autoSize 属性适用于 textarea 节点，并且只有高度会自动变化。另外 autoSize 可以设定为一个对象，指定最小行数和最大行数。

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { TextArea } from '@kdcloudjs/kdesign'

function Demo() {
  return (
    <div style={{ width: '300px' }}>
      <TextArea autoSize={true} borderType="bordered" />
      <br />
      <br />
      <TextArea autoSize={{ minRows: 2, maxRows: 6 }} borderType="bordered" />
      <br />
    </div>
  )
}

ReactDOM.render(<Demo />, mountNode)
```
