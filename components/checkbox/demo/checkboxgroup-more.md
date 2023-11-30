---
order: 3
title: Checkbox.Group 垂直
---

垂直的 Checkbox.Group，配合更多输入框选项。

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Checkbox, Input } from '@kdcloudjs/kdesign'

const checkboxStyle1 = {
  marginBottom: 12,
  marginRight: 12
}
const checkboxStyle2 = {
  marginBottom: 12,
  marginRight: 12
}

const Demo: React.FC = () => {
  
  const onChange1 = (value, e) => {
    console.log('checkbox1', value, e)
  }
  const onChange2 = (value, e) => {
    console.log('checkbox2 checked',value, e)
  }

  return (
    <div style={{ display: 'flex', width: 300 }}>
        <Checkbox.Group onChange={onChange1}  checkboxType={'default'}>
          <Checkbox style={checkboxStyle1} value={1}>
            Option A
          </Checkbox>
          <Checkbox style={checkboxStyle1} value={2}>
            Option B
          </Checkbox>
          <Checkbox style={checkboxStyle1} value={3}>
            Option C
          </Checkbox>
          <Checkbox style={checkboxStyle1} value={4}>
            More...
          </Checkbox>
        </Checkbox.Group>
        <br />
        <Checkbox.Group onChange={onChange2} checkboxType={'square'}>
          <Checkbox style={checkboxStyle2} value={1}>
            Option A
          </Checkbox>
          <Checkbox style={checkboxStyle2} value={2}>
            Option B
          </Checkbox>
          <Checkbox style={checkboxStyle2} value={3}>
            Option C
          </Checkbox>
          <Checkbox style={checkboxStyle2} value={4}>
            More...
          </Checkbox>
        </Checkbox.Group>
      </div>
  )
}


ReactDOM.render(<Demo />, mountNode)
```
