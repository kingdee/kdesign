---
order: 6
title: 按钮样式
---

按钮样式的单选组合。

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Radio } from '@kdcloudjs/kdesign'

function Demo() {
  function onChange(e) {
    console.log(`radio checked: ${e.target.value}`)
  }

  return (
    <div style={{ width: '450px' }}>
      <Radio.Group onChange={onChange} defaultValue="a">
        <Radio.Button value="a">Shenzhen</Radio.Button>
        <Radio.Button value="b">Shanghai</Radio.Button>
        <Radio.Button value="c">Beijing</Radio.Button>
        <Radio.Button value="d">Guangzhou</Radio.Button>
      </Radio.Group>
      <Radio.Group onChange={onChange} defaultValue="a" style={{ marginTop: 16 }}>
        <Radio.Button value="a">Shenzhen</Radio.Button>
        <Radio.Button value="b" disabled>
          Shanghai
        </Radio.Button>
        <Radio.Button value="c">Beijing</Radio.Button>
        <Radio.Button value="d">Guangzhou</Radio.Button>
      </Radio.Group>
      <Radio.Group disabled onChange={onChange} defaultValue="a" style={{ marginTop: 16 }}>
        <Radio.Button value="a">Shenzhen</Radio.Button>
        <Radio.Button value="b">Shanghai</Radio.Button>
        <Radio.Button value="c">Beijing</Radio.Button>
        <Radio.Button value="d">Guangzhou</Radio.Button>
      </Radio.Group>
    </div>
  )
}

ReactDOM.render(<Demo />, mountNode)
```
