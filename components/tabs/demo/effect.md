---
order: 9
title: 内置切换效果
---

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Tabs } from '@kdcloudjs/kdesign'

const Demo: React.FC = () => {
  const data = [
    { id: 1, name: 'TabPane1', content: 'TabPane1 Content' },
    { id: 2, name: 'TabPane2', content: 'TabPane2 Content' },
  ]
  return (
    <>
      <div style={{ width: '500px' }}>
        <div>默认：无动画</div>
        <Tabs defaultActiveKey={1} style={{ marginBottom: '10px' }}>
          {data.map((item) => (
            <Tabs.TabPane key={item.id} tab={item.name}>
              <div style={{ lineHeight: '30px', background: 'green', color: '#fff' }}>{item.content}</div>
            </Tabs.TabPane>
          ))}
        </Tabs>
        <br />
        <div>滑动</div>
        <Tabs defaultActiveKey={1} effect="scrollx" style={{ marginBottom: '10px' }}>
          {data.map((item) => (
            <Tabs.TabPane key={item.id} tab={item.name}>
              <div style={{ lineHeight: '30px', background: 'green', color: '#fff', textAlign: 'center' }}>
                {item.content}
              </div>
            </Tabs.TabPane>
          ))}
        </Tabs>
        <div>渐显</div>
        <Tabs defaultActiveKey={1} effect="fade" style={{ marginBottom: '10px' }}>
          {data.map((item) => (
            <Tabs.TabPane key={item.id} tab={item.name}>
              <div style={{ lineHeight: '30px', background: 'green', color: '#fff' }}>{item.content}</div>
            </Tabs.TabPane>
          ))}
        </Tabs>
      </div>
      <br />
    </>
  )
}

ReactDOM.render(<Demo />, mountNode)
```