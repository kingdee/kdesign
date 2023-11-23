---
title: 自动切换面板
order: 1
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
    backgroundColor: '#F2F2F2',
    height: '160px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#212121',
  }
  const beforeChange = (from, to) => {
    console.log('beforeChange', { from, to })
  }
  const afterChange = (index) => {
    console.log('afterChange', index)
  }
  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: '1' }}>
      <Carousel
        dotPosition={dotPosition}
        ref={carouselRef}
        autoplay={true}
        afterChange={afterChange}
        beforeChange={beforeChange}>
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
