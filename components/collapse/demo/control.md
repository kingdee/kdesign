---
title: 受控模式
order: 9
---

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Collapse } from '@kdcloudjs/kdesign'

function Demo() {
  const collapseRef = React.useRef()
  React.useEffect(() => {
    if (collapseRef.current)
      collapseRef.current.parentNode.style.cssText = 'display:flex; flex:1; padding-left:20px;padding-right:20px;'
  }, [collapseRef.current])
  const [activeKey, setActiveKey] = React.useState([])
  const onChange = (val) => {
    console.log('onChange', val)
    setActiveKey(val)
  }
  return (
    <Collapse name="Collapse" ref={collapseRef} activeKey={activeKey} onChange={onChange}>
      <Collapse.Panel header={'This is the header1'} panelKey="panel_1">
        折叠面板内容1
      </Collapse.Panel>
      <Collapse.Panel header={'This is the header2'} panelKey="panel_2">
        折叠面板内容2
      </Collapse.Panel>
      <Collapse.Panel header={'This is the header3'} panelKey="panel_3">
        折叠面板内容3
      </Collapse.Panel>
    </Collapse>
  )
}

ReactDOM.render(<Demo />, mountNode)
```
