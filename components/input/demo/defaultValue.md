---
title: 默认值
order: 9
---

defaultValue 属性可以设置输入框的默认值

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { TextArea } from '@kdcloudjs/kdesign'

const Demo: React.FC = () => {
  return <div style={{ width: '300px' }}><TextArea defaultValue="默认值默认值" /></div>
}

ReactDOM.render(<Demo />, mountNode)
```
