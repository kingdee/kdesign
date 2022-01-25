---
title: 垂直滑块
order: 3
---

通过 `vertical` 属性调整滑块的水平，竖直方向

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Slider } from '@kdcloudjs/kdesign'

function Demo() {
  return <Slider className="slider-vertical-container" vertical defaultValue={30}/>
}

ReactDOM.render(<Demo />, mountNode)
```

```css
.demo-component .slider-vertical-container {
  height: 300px;
  margin-bottom: 40px !important;
}
```