---
title: 自定义切换图标
order: 3
---

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Collapse, Icon } from '@kdcloudjs/kdesign'

function Demo() {
  const collapseRef = React.useRef()
  React.useEffect(() => {
    if (collapseRef.current)
      collapseRef.current.parentNode.style.cssText = 'display:flex; flex:1; padding-left:20px;padding-right:20px;'
  }, [collapseRef.current])
  return (
    <Collapse
      name="Collapse"
      ref={collapseRef}
      expandIcon={() => {
        return <Icon type="arrow-right"></Icon>
      }}>
      <Collapse.Panel header="This is the header1" panelKey="panel_1">
        折叠面板内容1
      </Collapse.Panel>
      <Collapse.Panel header="This is the header2" panelKey="panel_2">
        折叠面板内容2
      </Collapse.Panel>
    </Collapse>
  )
}

ReactDOM.render(<Demo />, mountNode)
```
