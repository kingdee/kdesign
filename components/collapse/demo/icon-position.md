---
title: 设置切换图标位置
order: 7
---

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Collapse, Switch, Icon } from '@kdcloudjs/kdesign'

function Demo() {
  const [expandIconPosition, setExpandIconPosition] = React.useState('left')
  const collapseRef = React.useRef()
  const handleOnChange = React.useCallback((value) => {
    const expandIconPosition = value ? 'right' : 'left'
    setExpandIconPosition(expandIconPosition)
  }, [])
  React.useEffect(() => {
    if (collapseRef.current)
      collapseRef.current.parentNode.style.cssText =
        'display:flex; flex:1; padding-left:20px;padding-right:20px; flex-direction: column;'
  }, [collapseRef.current])
  return (
    <>
      <p>展开按钮靠右</p>
      <br />
      <Switch onChange={handleOnChange} style={{ width: '30px' }} />
      <br />
      <Collapse expandIconPosition={expandIconPosition} ref={collapseRef} bordered>
        <Collapse.Panel
          header="This is the header1"
          panelKey="panel_1"
          extra={<Icon type="setting" style={{ cursor: 'pointer' }} />}>
          折叠面板内容1
        </Collapse.Panel>
        <Collapse.Panel
          header="This is the header2"
          panelKey="panel_2"
          extra={<Icon type="setting" style={{ cursor: 'pointer' }} />}>
          折叠面板内容2
        </Collapse.Panel>
      </Collapse>
    </>
  )
}

ReactDOM.render(<Demo />, mountNode)
```
