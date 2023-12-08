---
title: 改变文字距离左/右的间距
order: 3
---

改变嵌入文本间距，`orientation` 属性为 `center` 时不生效。

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Divider } from '@kdcloudjs/kdesign'

const Demo: React.FC = () => {
  // 改下面的代码
  return (
    <div>
      <p>KDesign of React 是金蝶生态设计系统，将设计赋能给产品、设计、开发各个环节，以保障金蝶系产品的统一体验。</p>
      <Divider style={{ margin: '10px 0', width: '720px' }} orientation="left" orientationMargin="100">
        KDesign
      </Divider>
      <p>KDesign of React 是金蝶生态设计系统，将设计赋能给产品、设计、开发各个环节，以保障金蝶系产品的统一体验。</p>
      <Divider style={{ margin: '10px 0', width: '720px' }} orientation="right" orientationMargin="100">
        KDesign
      </Divider>
    </div>
  )
}

ReactDOM.render(<Demo />, mountNode)
```
