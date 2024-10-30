---
title: 面板可显示颜色类型可配置
order: 14
---

可以通过 panelFormatConfig 属性对颜色面板中的默认颜色格式以及供选择的颜色格式进行配置

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { ColorPicker } from '@kdcloudjs/kdesign'

const Demo: React.FC = () => {
  const onChange = (inputValue: string) => {
    console.log('color', inputValue)
  }

  const config1 = { show: ['HEX', 'RGB'], default: 'RGB' }
  const config2 = { show: ['HEX', 'RGB', 'HSB'], default: 'HEX' }

  return (
    <>
      <ColorPicker onChange={onChange} format="HEX" panelFormatConfig={config1} />
      <br />
      <ColorPicker onChange={onChange} format="RGB" panelFormatConfig={config2} />
    </>
  )
}

ReactDOM.render(<Demo />, mountNode)
```
