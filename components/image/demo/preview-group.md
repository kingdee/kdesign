---
order: 4
title: 多张图片预览
---

点击左右切换按钮可以预览多张图片。

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Image } from '@kdcloudjs/kdesign'

const { PreviewGroup } = Image
const Demo: React.FC = () => {
  return (
    <PreviewGroup>
      <Image width={142} src="https://kui.kingdee.com/assets/image/img01.jpg" />
      <Image width={142} src="https://kui.kingdee.com/assets/image/img02.jpg" />
      <Image width={142} src="https://kui.kingdee.com/assets/image/img03.jpg" />
    </PreviewGroup>
  )
}

ReactDOM.render(<Demo />, mountNode)
```
