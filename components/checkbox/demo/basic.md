---
order: 0
title: 类型
---

复选类型有两种： 复选项 和 复选框。

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Checkbox } from '@kdcloudjs/kdesign'

function Demo() {
  return (
    <div style={{ width: '100px' }}>
      <div>
        <Checkbox>Default Checkbox</Checkbox>
        <br />
        <Checkbox
          checkboxType="square"
          value={1}
          onChange={(e) => {
            console.log(e.target.value)
          }}>
          Square Checkbox
        </Checkbox>
      </div>
    </div>
  )
}

ReactDOM.render(<Demo />, mountNode)
```
