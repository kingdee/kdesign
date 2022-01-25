---
order: 0
title: 基本
---

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Tabs } from '@kdcloudjs/kdesign'

function Demo() {
  const carouselRef = React.useRef()
  const [curKey, setCurKey] = React.useState(1)
  const data = [
    { id: 1, name: 'TabPane1', content: 'TabPane1 Content' },
    { id: 2, name: 'TabPane2', content: 'TabPane2 Content' },
  ]
  const tabStyle = {
    marginBottom: '15px',
  }

  const showChange = (id) => {
    console.log('change id>>', id)
    setCurKey(id)
  }

  return (
    <>
      <div style={{ width: '500px' }}>
        <Tabs style={tabStyle} activeKey={curKey} onChange={showChange}>
          {data.map((item) => (
            <Tabs.TabPane key={item.id} tab={item.name}>
              {item.content}
            </Tabs.TabPane>
          ))}
        </Tabs>
      </div>
    </>
  )
}

ReactDOM.render(<Demo />, mountNode)
```