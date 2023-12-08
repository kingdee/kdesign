---
title: 指定文本位置
order: 2
---

改变嵌入文本位置，默认居左

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Divider } from '@kdcloudjs/kdesign'

const Demo: React.FC = () => {
  // 改下面的代码
  return (
    <div>
      <p>KDesign of React 是金蝶生态设计系统，将设计赋能给产品、设计、开发各个环节，以保障金蝶系产品的统一体验。</p>
      <Divider style={{ margin: '10px 0', width: '720px' }}>KDesign</Divider>
      <p>KDesign of React 是金蝶生态设计系统，将设计赋能给产品、设计、开发各个环节，以保障金蝶系产品的统一体验。</p>
      <Divider style={{ margin: '10px 0', width: '720px' }} orientation="center">
        KDesign
      </Divider>
      <p>KDesign of React 是金蝶生态设计系统，将设计赋能给产品、设计、开发各个环节，以保障金蝶系产品的统一体验。</p>
      <Divider style={{ margin: '10px 0', width: '720px' }} orientation="right">
        KDesign
      </Divider>
    </div>
  )
}

ReactDOM.render(<Demo />, mountNode)
```
