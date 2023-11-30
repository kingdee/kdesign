---
title: 禁用
order: 5
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
  return (
    <Collapse defaultActiveKey="panel_1" ref={collapseRef}>
      <Collapse.Panel header="This is the header1" panelKey="panel_1" disabled>
        折叠面板内容1
      </Collapse.Panel>
      <Collapse.Panel header="This is the header2" panelKey="panel_2" disabled>
        折叠面板内容2
      </Collapse.Panel>
    </Collapse>
  )
}

ReactDOM.render(<Demo />, mountNode)
```
