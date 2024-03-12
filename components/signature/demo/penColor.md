---
title: 替换签字笔颜色
order: 4
---

撤销、恢复和清除工具可根据需要进行配置。

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Signature, Radio } from '@kdcloudjs/kdesign'

const Demo = () => {
  const [penColor,setPenColor] = React.useState('black')

  const handleClear = () => {
    console.log('clear了吗')
  }
  return (
    <div style={{ width: '250px', height: '72px' }}>
      <Radio.Group
        onChange={(e) => {
          setPenColor(e.target.value)
        }}
        defaultValue={penColor}>
        <Radio value={'black'}>black</Radio>
        <Radio value={'#5582f3'}>#5582f3</Radio>
        <Radio value={'rgb(256,0,0)'}>rgb(256,0,0)</Radio>
      </Radio.Group>
      <Signature style={{width: '230px', height: '72px'}} onClear={handleClear} penColor={penColor}></Signature>
    </div>
  )
}

ReactDOM.render(<Demo />, mountNode)
```
