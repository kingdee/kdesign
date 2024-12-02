---
title: 嵌套折叠面板
order: 8
---

```tsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Collapse } from '@kdcloudjs/kdesign'
import type { IPanelProps } from '@kdcloudjs/kdesign'

const Demo: React.FC = () => {
  const header1: IPanelProps['header'] = '嵌套面板1'
  const collapseRef = React.useRef()
  React.useEffect(() => {
    if (collapseRef.current)
      collapseRef.current.parentNode.style.cssText = 'display:flex; flex:1; padding-left:20px;padding-right:20px;'
  }, [collapseRef.current])
  return (
    <Collapse expandIconPosition="left" ref={collapseRef} bordered>
      <Collapse.Panel header="折叠面板1" panelKey="panel_1">
        <Collapse expandIconPosition="left" bordered>
          <Collapse.Panel header={header1} panelKey="panel_1_1">
            嵌套面板内容1
          </Collapse.Panel>
          <Collapse.Panel header="嵌套面板2" panelKey="panel_1_2">
            嵌套面板内容2
          </Collapse.Panel>
        </Collapse>
      </Collapse.Panel>
      <Collapse.Panel header="折叠面板2" panelKey="panel_2">
        折叠面板内容1
      </Collapse.Panel>
    </Collapse>
  )
}

ReactDOM.render(<Demo />, mountNode)
```
