---
title: 切换按钮
order: 5
---

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Carousel } from '@kdcloudjs/kdesign'

function Demo() {
  const carouselRef = React.useRef()

  React.useEffect(() => {
    if (!carouselRef.current) return
    carouselRef.current.getRef().parentNode.style.display = 'flex'
    carouselRef.current.getRef().parentNode.parentNode.style.display = 'flex'
  }, [carouselRef])
  const itemStyle = {
    backgroundColor: '#F2F2F2',
    height: '160px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#212121',
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: '1' }}>
      <p>默认切换按钮</p>
      <br />
      <Carousel ref={carouselRef} dots={false} jumpNode>
        {Array(4).fill(0).map((_,i)=>{
          return (
            <div style={itemStyle} key={i}>
              <h3>{i + 1}</h3>
            </div>
          )
        })}
      </Carousel>
      <br />
      <p>自定义切换按钮</p>
      <br />
      <Carousel jumpNode={[<div class="jump-demo">上一页</div>,<div class="jump-demo">下一页</div>]}>
        {Array(4).fill(0).map((_, i)=>{
          return (
            <div style={itemStyle} key={i}>
              <h3>{i + 1}</h3>
            </div>
          )
        })}
      </Carousel>
    </div>
  )
}

ReactDOM.render(<Demo />, mountNode)
```

```css
.jump-demo {
  color: #d9d9d9;
}
.jump-demo:hover {
  color: #666;
}
```
