---
title: 默认值
order: 9
---

defaultValue 属性可以设置输入框的默认值

```tsx
import React from 'react'
import ReactDOM from 'react-dom'
import { TextArea } from '@kdcloudjs/kdesign'
import type { ITextAreaProps } from '@kdcloudjs/kdesign'

const Demo: React.FC = () => {
  const defaultValue: ITextAreaProps['defaultValue'] = '默认值'
  return (
    <div style={{ width: '300px' }}>
      <TextArea defaultValue={defaultValue} />
    </div>
  )
}

ReactDOM.render(<Demo />, mountNode)
```
