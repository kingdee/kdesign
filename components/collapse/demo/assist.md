---
title: 辅助信息可配置
order: 6
---

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Collapse } from '@kdcloudjs/kdesign'

const Demo: React.FC = () => {
  const collapseRef = React.useRef()
  React.useEffect(() => {
    if (collapseRef.current)
      collapseRef.current.parentNode.style.cssText = 'display:flex; flex:1; padding-left:20px;padding-right:20px;'
  }, [collapseRef.current])

  const pStyle = { 'marginLeft': '12px' }

  return (
    <Collapse ref={collapseRef}>
      <Collapse.Panel
        header="我的行程"
        panelKey="panel_1"
        assist={
          <div style={{ cursor: 'pointer', display: 'flex' }}>
            <span style={pStyle}>共计三段行程</span>
            <p style={pStyle}>|</p>
            <span style={pStyle}>
              费用合计： <span style={{ color: '#EE6723' }}>￥236</span>
            </span>
            <p style={pStyle}>|</p>
            <span style={pStyle}>摘要： 费用报销单</span>
          </div>
        }>
        折叠面板内容1
      </Collapse.Panel>
    </Collapse>
  )
}
ReactDOM.render(<Demo />, mountNode)
```
