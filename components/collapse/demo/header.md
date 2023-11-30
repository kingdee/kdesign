---
title: 折叠头内容
order: 6
---

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Collapse, Icon } from '@kdcloudjs/kdesign'

const Demo: React.FC = () => {
  const collapseRef = React.useRef()
  React.useEffect(() => {
    if (collapseRef.current)
      collapseRef.current.parentNode.style.cssText = 'display:flex; flex:1; padding-left:20px;padding-right:20px;'
  }, [collapseRef.current])
  return (
    <Collapse ref={collapseRef}>
      <Collapse.Panel
        panelKey="panel_1"
        header={
          <div style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>
            <p style={{ display: 'inline-block' }}>This is the header</p>
            <Icon type="warning-solid" style={{ color: 'red', marginLeft: '5px' }} />
          </div>
        }>
        折叠面板内容1
      </Collapse.Panel>
    </Collapse>
  )
}

ReactDOM.render(<Demo />, mountNode)
```
