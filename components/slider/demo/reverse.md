---
title: 反向滑块
order: 2
---

通过 `reverse` 属性将滑块反转

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Slider } from '@kdcloudjs/kdesign'

function Demo() {
  return <Slider className="slider-reverse-container" reverse defaultValue={30}/>
}

ReactDOM.render(<Demo />, mountNode)
```

```css
.demo-component .slider-reverse-container {
  width: 800px;
  margin-bottom: 40px !important;
}
```