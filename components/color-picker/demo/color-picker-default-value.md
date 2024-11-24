---
title: 设置默认值
order: 8
---

可配置属性 defaultValue 设置颜色面板的默认值

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { ColorPicker } from '@kdcloudjs/kdesign'
import type { IColorPickerProps } from '@kdcloudjs/kdesign'

const Demo: React.FC = () => {
  const onChange: IColorPickerProps['onChange'] = (inputValue: string) => {
    console.log('color', inputValue)
  }

  return <ColorPicker onChange={onChange} defaultValue="#FF0000" />
}

ReactDOM.render(<Demo />, mountNode)
```
