---
title: 面板指示点位置
order: 2
---

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Carousel, Radio } from '@kdcloudjs/kdesign'
import type { DotPositionType } from '@kdcloudjs/kdesign'


const Demo: React.FC = () => {
  const carouselRef = React.useRef()
  const [dotPosition, setDotPosition] = React.useState<DotPositionType>('bottom')
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
  const onChange = (event) => {
    setDotPosition(event.target.value)
  }
  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: '1' }}>
      <Radio.Group onChange={onChange} defaultValue="bottom">
        <Radio.Button value="top">Top</Radio.Button>
        <Radio.Button value="bottom">Bottom</Radio.Button>
        <Radio.Button value="left">Left</Radio.Button>
        <Radio.Button value="right">Right</Radio.Button>
      </Radio.Group>

      <br />
      <Carousel
        dotPosition={dotPosition}
        ref={carouselRef}
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
