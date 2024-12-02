---
title: 自定义切换图标
order: 3
---

```tsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Collapse, Icon } from '@kdcloudjs/kdesign'
import type { ICollapseProps } from '@kdcloudjs/kdesign'

const Demo: React.FC = () => {
  const collapseRef = React.useRef()
  const expandIcon:ICollapseProps['expandIcon'] = () => {
    return <Icon type="arrow-right"></Icon>
  }
  React.useEffect(() => {
    if (collapseRef.current)
      collapseRef.current.parentNode.style.cssText = 'display:flex; flex:1; padding-left:20px;padding-right:20px;'
  }, [collapseRef.current])
  return (
    <Collapse ref={collapseRef} expandIcon={expandIcon}>
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
