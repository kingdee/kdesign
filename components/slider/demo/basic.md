---
title: 基本使用
order: 0
---

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Slider } from '@kdcloudjs/kdesign'

function Demo() {
  const handleChange = (v) => {
    console.log(v, 'hancdfas')
  }
  return (
    <>
      <Slider className="slider-container" defaultValue={30} onAfterChange={handleChange}/>
    </>
  )
}

ReactDOM.render(<Demo />, mountNode)
```

```css
.demo-component .slider-container {
  width: 800px;
}
```
