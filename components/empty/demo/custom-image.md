---
title: 自定义图片
order: 1
---

设置 `image` 属性能自定义图片

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Empty } from '@kdcloudjs/kdesign'

function Demo() {
  return <Empty name="Empty" image="http://ikd.kingdee.com/ikd2/images/common/empty-content.png" />
}

ReactDOM.render(<Demo />, mountNode)
```
