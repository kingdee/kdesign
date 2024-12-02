---
title: 基本使用
order: 0
---

```tsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Collapse } from '@kdcloudjs/kdesign'
import type { ICollapseProps } from '@kdcloudjs/kdesign'

const Demo: React.FC = () => {
  const defaultActiveKey: ICollapseProps['defaultActiveKey'] = ['panel_1']
  const collapseRef = React.useRef()
  React.useEffect(() => {
    if (collapseRef.current)
      collapseRef.current.parentNode.style.cssText = 'display:flex; flex:1; padding-left:20px;padding-right:20px;'
  }, [collapseRef.current])
  return (
    <Collapse ref={collapseRef} defaultActiveKey={defaultActiveKey}>
      <Collapse.Panel header={'This is the header'} panelKey="panel_1">
        折叠面板内容
      </Collapse.Panel>
    </Collapse>
  )
}

ReactDOM.render(<Demo />, mountNode)
```
