---
order: 2
title: 单选组合
---

一组互斥的 Radio 配合使用。

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Radio } from '@kdcloudjs/kdesign'

const Demo: React.FC = () => {
  const [value1, setValue1] = React.useState(1)
  const [value2, setValue2] = React.useState('a')

  const onChange1 = () => {
    console.log('radioGroup1:', e, checkedValue)
  }
  const onChange2 = () => {
    console.log('radioGroup2:', e, checkedValue)
  }
  
  return (
    <div style={{ width: '450px' }}>
        <Radio.Group onChange={onChange1}>
          <Radio value={1}>A</Radio>
          <Radio value={2}>B</Radio>
          <Radio value={3}>C</Radio>
          <Radio value={4}>D</Radio>
        </Radio.Group>
        <br />
        <Radio.Group onChange={onChange2}>
          <Radio value="a" radioType="square">
            Option A
          </Radio>
          <Radio value="b" radioType="square">
            Option B
          </Radio>
          <Radio value="c" radioType="square">
            Option C
          </Radio>
          <Radio value="d" radioType="square">
            Option D
          </Radio>
        </Radio.Group>
      </div>
  )
}

ReactDOM.render(<Demo />, mountNode)
```
