---
order: 5
title: Checkbox.Group 组合 - 内嵌Checkbox
---

内嵌 `Checkbox`

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Checkbox, Input } from '@kdcloudjs/kdesign'

const Demo: React.FC = () => {
  
  const onChange = (value, e) => {
    console.log('checkboxgroup:', value, e)
  }
  return (
    <div>
        <br />
        <Checkbox.Group onChange={onChange}  checkboxType={'default'}>
          <Checkbox value={1}>
            Option A
          </Checkbox>
          <Checkbox value={2}>
            Option B
          </Checkbox>
          <Checkbox value={3}>
            Option C
          </Checkbox>
          <Checkbox value={4}>
            More...
          </Checkbox>
        </Checkbox.Group>
      </div>
  )
} 


ReactDOM.render(<Demo />, mountNode)
```
