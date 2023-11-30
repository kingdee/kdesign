---
title: 不可用
order: 1
---

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Slider } from '@kdcloudjs/kdesign'

const Demo: React.FC = () => {
  return <Slider className="slider-disabled-container" disabled defaultValue={30}/>
}

ReactDOM.render(<Demo />, mountNode)
```

```css
.demo-component .slider-disabled-container {
  width: 800px;
  margin-bottom: 40px !important;
}
```