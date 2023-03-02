---
order: 2
title: 联动受控
---


```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Radio } from '@kdcloudjs/kdesign'

function Demo() {
  const [v, setV] = React.useState()
  const handleChange = (e, v) => {
    console.log(e, v)
    setV(v)
  }
  return (
    <div style={{ width: '350px' }}>
    <Radio.Group name="radiogroup" value={v} onChange={handleChange}>
      <Radio value={'AAAA'}>A</Radio>
      <Radio value={'BBBB'}>B</Radio>
      <Radio value={'CCCC'}>C</Radio>
      <Radio value={'DDDD'}>D</Radio>
    </Radio.Group>
    </div>
  )
}

ReactDOM.render(<Demo />, mountNode)
```
