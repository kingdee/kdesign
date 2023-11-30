---
order: 1
title: 不可用
---

Checkbox 不可用

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Checkbox } from '@kdcloudjs/kdesign'

const Demo: React.FC = () => {
  return (
    <div style={{ width: '100px' }}>
      <div>
        <Checkbox disabled>Checkbox</Checkbox>
        <br />
        <Checkbox disabled defaultChecked>
          Checkbox
        </Checkbox>
      </div>
      <div style={{ marginTop: 10 }}>
        <Checkbox checkboxType="square" disabled>
          Checkbox
        </Checkbox>
        <br />
        <br />
        <Checkbox checkboxType="square" disabled defaultChecked>
          Checkbox
        </Checkbox>
      </div>
    </div>
  )
}

ReactDOM.render(<Demo />, mountNode)
```
