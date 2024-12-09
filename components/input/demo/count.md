---
title: Textarea-控制计数的展示
order: 9
---

count 属性可以控制是否展示计数, 默认为展示

```tsx
import React from 'react'
import ReactDOM from 'react-dom'
import { TextArea } from '@kdcloudjs/kdesign'
import type { ITextAreaProps } from '@kdcloudjs/kdesign'

const Demo: React.FC = () => {
  const [value, setValue] = React.useState<ITextAreaProps['value']>('')
  return (
    <div style={{ width: '300px' }}>
      <TextArea count allowClear borderType="bordered" maxLength={20} />
      <br />
      <br />
      <TextArea
        count={false}
        borderType="bordered"
        value={value}
        onChange={(e) => {
          setValue(e.target.value)
        }}
      />
      <br />
    </div>
  )
}

ReactDOM.render(<Demo />, mountNode)
```
