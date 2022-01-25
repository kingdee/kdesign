---
title: 滑块标记
order: 4
---

通过 `marks` 属性设置滑块的刻度

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Slider } from '@kdcloudjs/kdesign'

function Demo() {
  const tmpMarks = {
    0: '0',
    10: '10',
    20: '20',
    100: {
      style: {
        color: '#f50',
      },
      label: <strong>100</strong>,
    },
  };
  
  return <Slider className="slider-marks-container" marks={tmpMarks} defaultValue={30}/>
}

ReactDOM.render(<Demo />, mountNode)
```

```css
.demo-component .slider-marks-container {
  width: 800px;
}
```