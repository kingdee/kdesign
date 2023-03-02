---
order: 2
title: 受控
---

组件受控，需要通过group的value 来修改选中的radio

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Radio } from '@kdcloudjs/kdesign'

function Demo() {
  const [v, setV] = React.useState('AAAA')
  return (
    <div style={{ width: '350px' }}>
    <Radio.Group name="radiogroup" value={v}>
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
