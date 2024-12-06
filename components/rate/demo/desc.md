---
order: 12
title: 文案展示
---

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Rate } from '@kdcloudjs/kdesign'
import type { IRateProps } from '@kdcloudjs/kdesign'

const Demo: React.FC = () => {
  const desc: string[] = ['很差', '较差', '一般', '不错', '很棒']
  const [value, setValue] = React.useState<number>(3)
  const handleChange: IRateProps['onChange'] = (value: number) => {
    setValue(value)
  }
  const style:IRateProps['style'] = {
    marginLeft: '12px',
  }
  return (
    <div style={{ width: '200px' }}>
      <Rate defaultValue={3} allowHalf={false} onChange={handleChange} />
      <span style={style}>{desc[value - 1]}</span>
    </div>
  )
}

ReactDOM.render(<Demo />, mountNode)
```
