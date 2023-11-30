---
order: 3
title: Radio.Group 垂直
---

垂直的 Radio.Group，配合更多输入框选项。

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Radio, Input } from '@kdcloudjs/kdesign'

const radioStyle = {
  display: 'block',
  height: '30px',
  lineHeight: '30px',
}
const Demo: React.FC = () => {
  const [value, SetValue] = React.useState<number>(1)

  const onChange = (e, checkValue) => {
    console.log('radio checked', e, checkValue)
  }

  return (
    <div style={{ width: '350px' }}>
      <Radio.Group onChange={onChange} style={{ width: 400 }}>
        <Radio style={radioStyle} value={1}>
          Option A
        </Radio>
        <Radio style={radioStyle} value={2}>
          Option B
        </Radio>
        <Radio style={radioStyle} value={3}>
          Option C
        </Radio>
        <Radio style={radioStyle} value={4}>
          More...
          {value * 1 === 4 ? <Input style={{ width: 100, marginLeft: 10 }} /> : null}
        </Radio>
      </Radio.Group>
      </div>
  )

}

ReactDOM.render(<Demo />, mountNode)
```
