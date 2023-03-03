---
title: 配置面板展开
order: 2
---

可配置属性 openPanel 控制颜色面板的状态

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { ColorPicker } from '@kdcloudjs/kdesign'

function Demo() {
  const onChange = (inputValue) => {
    console.log('color', inputValue)
  }

  return <ColorPicker onChange={onChange} defaultOpen={true} />
}

ReactDOM.render(<Demo />, mountNode)
```
