---
order: 3
title: 三种大小
---

三种大小的基础搜索，当 size 分别为 large 和 small 时，输入框高度为 36px 和 24px ，宽度分别为 320px 和 200px ，默认高度为 30px，默认宽度为260px。

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Search, Radio } from '@kdcloudjs/kdesign'

function Demo() {
  const [size, setSize] = React.useState('middle')
  const handleSizeChange = (e) => {
    setSize(e.target.value)
  }
  return (
    <>
      <Radio.Group value={size} onChange={handleSizeChange}>
        <Radio.Button value="large">Large</Radio.Button>
        <Radio.Button value="middle">Default</Radio.Button>
        <Radio.Button value="small">Small</Radio.Button>
      </Radio.Group>
      <br />
      <Search type="basis" size={size} prefix />
    </>
  )
}

ReactDOM.render(<Demo />, mountNode)
```