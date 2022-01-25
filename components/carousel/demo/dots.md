---
title: 面板指示点样式
order: 3
---

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Carousel } from '@kdcloudjs/kdesign'

function Demo() {
  const carouselRef = React.useRef()
  const [dotPosition, setDotPosition] = React.useState('bottom')
  React.useEffect(() => {
    if (!carouselRef.current) return
    carouselRef.current.getRef().parentNode.style.display = 'flex'
    carouselRef.current.getRef().parentNode.parentNode.style.display = 'flex'
  }, [carouselRef])
  const itemStyle = {
    backgroundColor: 'blue',
    height: '160px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#fff',
  }
  const dots = { dotsClassName: `kd-carousel-slidebar-dot`, activeDotsClassName: `kd-carousel-slidebar-dot-active` }
  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: '1' }}>
      <p>隐藏面板指示点</p>
      <br />
      <Carousel name="Carousel" dotPosition={dotPosition} ref={carouselRef} dots={false} autoplay={true}>
        <div style={itemStyle}>
          <h3>1</h3>
        </div>
        <div style={itemStyle}>
          <h3>2</h3>
        </div>
        <div style={itemStyle}>
          <h3>3</h3>
        </div>
        <div style={itemStyle}>
          <h3>4</h3>
        </div>
      </Carousel>
      <br />
      <p>自定义面板指示点样式</p>
      <br />
      <Carousel name="Carousel" dotPosition={dotPosition} ref={carouselRef} dots={dots} autoplay={true}>
        <div style={itemStyle}>
          <h3>1</h3>
        </div>
        <div style={itemStyle}>
          <h3>2</h3>
        </div>
        <div style={itemStyle}>
          <h3>3</h3>
        </div>
        <div style={itemStyle}>
          <h3>4</h3>
        </div>
      </Carousel>
    </div>
  )
}

ReactDOM.render(<Demo />, mountNode)
```
