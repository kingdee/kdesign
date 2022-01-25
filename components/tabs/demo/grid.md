---
order: 2
title: 栅格类型
---

通过设置 `type = 'grid'` 可变为栅格页签

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Tabs } from '@kdcloudjs/kdesign'

function Demo() {
  const carouselRef = React.useRef()
  const [curKey, setCurKey] = React.useState(1)
  const [curBigKey, setCurBigKey] = React.useState(1)
  const data = [
    { id: 1, name: 'TabPane1', content: 'TabPane1 Content' },
    { id: 2, name: 'TabPane2', content: 'TabPane2 Content' },
  ]
  const bigData = Array(20)
    .fill(0)
    .map((v, i) => {
      return {
        name: `TabPane${i}`,
        value: i,
      }
    })
  const tabStyle = {
    marginBottom: '15px',
  }
  const itemStyle = {
    height: '160px',
    lineHeight: '160px',
  }

  const showChange = (id) => {
    console.log('change id>>', id)
    setCurKey(id)
  }

  const showBigChange = (id) => {
    console.log('change id>>', id)
    setCurBigKey(id)
  }

  return (
    <>
      <div style={{ width: '500px' }}>
        <Tabs type="grid" style={tabStyle} activeKey={curKey} onChange={showChange}>
          {data.map((item) => (
            <Tabs.TabPane key={item.id} tab={item.name}>
              {item.content}
            </Tabs.TabPane>
          ))}
        </Tabs>

        <Tabs type="grid" style={tabStyle} disabled activeKey={curKey} onChange={showChange}>
          {data.map((item) => (
            <Tabs.TabPane key={item.id} tab={item.name} />
          ))}
        </Tabs>

        <Tabs type="grid" style={tabStyle} activeKey={curBigKey} onChange={showBigChange}>
          {bigData.map((item) => (
            <Tabs.TabPane key={item.value} tab={item.name} />
          ))}
        </Tabs>
      </div>
    </>
  )
}

ReactDOM.render(<Demo />, mountNode)
```