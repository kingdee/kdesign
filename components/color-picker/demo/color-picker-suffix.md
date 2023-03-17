---
title: 输入框图标
order: 4
---

可配置属性 suffixIcon 自定义输入框右侧的图标

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { ColorPicker, Icon } from '@kdcloudjs/kdesign'

function Demo() {
  const homeIcon = (rgbColor) => {
    return <Icon type="notice" style={{ color: rgbColor, fontSize: '20px', marginTop: '-4px' }} />
  }

  const onChange = (inputValue) => {
    console.log('color', inputValue)
  }

  return <ColorPicker onChange={onChange} suffixIcon={homeIcon} />
}

ReactDOM.render(<Demo />, mountNode)
```
