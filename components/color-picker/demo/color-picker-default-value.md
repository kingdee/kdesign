---
title: 设置默认值
order: 8
---

可配置属性 defaultValue 设置颜色面板的默认值

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { ColorPicker } from '@kdcloudjs/kdesign'

function Demo() {
  const onChange = (inputValue) => {
    console.log('color', inputValue)
  }

  return <ColorPicker onChange={onChange} defaultValue='blue' />
}

ReactDOM.render(<Demo />, mountNode)
```
