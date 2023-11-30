---
title: 基本使用
order: 0
---

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Input } from '@kdcloudjs/kdesign'

const Demo: React.FC = () => {
  const inputStyle = { marginBottom: 8, marginRight: 8, width: 230 }
  const [value, setValue] = React.useState<string>('填入值')
  const onChange = (e) => {
    setValue(e.target.value)
  }

  return (
    <div style={{ width: '300px' }}>
      <Input style={inputStyle} placeholder="基本使用"/>
      <Input style={inputStyle} defaultValue="默认值" placeholder="基本使用"/>
      <Input style={inputStyle} value={value} placeholder="基本使用" onChange={onChange}/>
    </div>
  )
}

ReactDOM.render(<Demo />, mountNode)
```
