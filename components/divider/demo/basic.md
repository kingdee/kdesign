---
title: 基本使用
order: 0
---

对文本进行分割，默认为水平分割线。

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Divider } from '@kdcloudjs/kdesign'

const Demo: React.FC = () => {
  // 改下面的代码
  return (
    <div>
      <p>KDesign of React 是金蝶生态设计系统，将设计赋能给产品、设计、开发各个环节，以保障金蝶系产品的统一体验。</p>
      <Divider style={{ margin: '10px 0', width: '720px' }} />
      <p>KDesign of React 是金蝶生态设计系统，将设计赋能给产品、设计、开发各个环节，以保障金蝶系产品的统一体验。</p>
      <Divider style={{ margin: '10px 0', width: '720px' }} />
      <p>KDesign of React 是金蝶生态设计系统，将设计赋能给产品、设计、开发各个环节，以保障金蝶系产品的统一体验。</p>
      <Divider style={{ margin: '10px 0', width: '720px' }} />
    </div>
  )
}

ReactDOM.render(<Demo />, mountNode)
```
