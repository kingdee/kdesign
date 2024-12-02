---
title: 手风琴模式
order: 1
---

```tsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Collapse } from '@kdcloudjs/kdesign'
import type { ICollapsePanelProps } from '@kdcloudjs/kdesign'

const Demo: React.FC = () => {
  const header1: ICollapsePanelProps['header'] = 'This is the header1'
  const collapseRef = React.useRef()
  React.useEffect(() => {
    if (collapseRef.current)
      collapseRef.current.parentNode.style.cssText = 'display:flex; flex:1; padding-left:20px;padding-right:20px;'
  }, [collapseRef.current])
  return (
    <Collapse accordion ref={collapseRef}>
      <Collapse.Panel header={header1} panelKey="panel_1">
        折叠面板内容1
      </Collapse.Panel>
      <Collapse.Panel header={'This is the header2'} panelKey="panel_2">
        折叠面板内容2
      </Collapse.Panel>
      <Collapse.Panel header={'This is the header3'} panelKey="panel_3">
        折叠面板内容3
      </Collapse.Panel>
      <Collapse.Panel header={'This is the header4'} panelKey="panel_4">
        折叠面板内容4
      </Collapse.Panel>
    </Collapse>
  )
}

ReactDOM.render(<Demo />, mountNode)
```
