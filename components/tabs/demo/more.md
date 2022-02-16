---
order: 5
title: 超长滚动
---

- 当页签过多超出容器宽度时，多余的页签会被收纳到更多按钮中
- 通过设置 `showScrollArrow` 可显示和隐藏两端的翻页按钮 

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Tabs } from '@kdcloudjs/kdesign'

function Demo() {
  const data = Array(20)
    .fill(0)
    .map((v, i) => {
      return {
        name: `TabPane${i}`,
        value: i,
      }
    })
  const showChange = (id) => {
    console.log('id change =>', id)
  }
  return (
    <>
      <br />
      <div style={{ width: '500px' }}>
        <Tabs type="card" showScrollArrow defaultActiveKey={4}>
          {data.map((v) => (
            <Tabs.TabPane key={v.value} tab={v.name} />
          ))}
        </Tabs>
        <br />
        <Tabs showScrollArrow defaultActiveKey={2} onChange={showChange}>
          {data.map((v, i) => (
            <Tabs.TabPane key={v.value} tab={v.name} disabled={i === 2}/>
          ))}
        </Tabs>
      </div>
      <br />
      <div style={{ width: '500px', height: '300px' }}>
        <Tabs type="card" position="left" defaultActiveKey={0}>
          {data.map((v) => (
            <Tabs.TabPane key={v.value} tab={v.name} />
          ))}
        </Tabs>
      </div>
    </>
  )
}

ReactDOM.render(<Demo />, mountNode)
```