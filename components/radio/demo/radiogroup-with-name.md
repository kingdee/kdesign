---
order: 4
title: 单选组合 - 配合 name 使用
---

可以为 Radio.Group 配置 `name` 参数，为组合内的 input 元素赋予相同的 `name` 属性，使浏览器把 Radio.Group 下的 Radio 真正看作是一组（例如可以通过方向键始终**在同一组内**更改选项）。

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Radio } from '@kdcloudjs/kdesign'

function Demo() {
  return (
    <div style={{ width: '350px' }}>
    <Radio.Group name="radiogroup" defaultValue={'AAAA'}>
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
