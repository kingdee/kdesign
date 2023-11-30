---
order: 0
title: 基本用法
---

单击图像可以放大显示。

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Image } from '@kdcloudjs/kdesign'

const Demo: React.FC = () => {
  return (
    <Image
      width={142}
      src="https://kui.kingdee.com/assets/image/img01.jpg"
    />
  );
}

ReactDOM.render(<Demo />, mountNode)
```
