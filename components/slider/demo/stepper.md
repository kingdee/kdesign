---
title: 结合步进器使用
order: 5
---

滑块与步进器的值保持同步

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Slider, Stepper } from '@kdcloudjs/kdesign'


function Demo() {
  const [val, setVal] = React.useState(5)
  const handleChange = (e) => {
    setVal(+e.target.value)
  }
  const handleSliderChange = (v) => {
    setVal(v)
  }
  return (
    <>
      <Slider className="slider-tooltip-container" tooltipVisible={false} value={val} min={0} max={10} onChange={(v) => handleSliderChange(v)}/>

      <Stepper className="slider-inputnumber" placeholder="基本使用" borderType="bordered" value={val} onChange={(e) => handleChange(e)} min={0} max={10}/>
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
.demo-component .slider-inputnumber {
  width: 250px;
}
```
