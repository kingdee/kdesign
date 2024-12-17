---
title: 滚动时面板关闭可配置
order: 16
---

我们提供滚动时面板关闭的配置能力，可通过 scrollHidden 控制颜色面板在滚动时是否自动收起

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { ColorPicker } from '@kdcloudjs/kdesign'

const Demo: React.FC = () => {
  const onChange = (inputValue: string) => {
    console.log('color', inputValue)
  }

  return <ColorPicker onChange={onChange} scrollHidden />
}

ReactDOM.render(<Demo />, mountNode)
```
