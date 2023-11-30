---
title: 滑块提示
order: 4
---

通过 `tooltipVisible` 属性设置tooltip的常显和常藏

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Slider } from '@kdcloudjs/kdesign'

const Demo: React.FC = () => {
  return (
    <>
      <Slider className="slider-tooltip-container" tooltipVisible={false} defaultValue={30}/>
    
      <Slider className="slider-tooltip-container" tooltipVisible={true} defaultValue={30}/>
    </>
  )
}

ReactDOM.render(<Demo />, mountNode)
```

```css
.demo-component .slider-tooltip-container {
  width: 800px;
}
.demo-component .slider-tooltip-container:first-child{
  margin-bottom: 80px !important;
}
```