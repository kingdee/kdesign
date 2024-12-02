---
title: 自定义面板右上角内容
order: 5
---

```tsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Collapse, Icon } from '@kdcloudjs/kdesign'
import type { ICollapseProps } from '@kdcloudjs/kdesign'

const Demo: React.FC = () => {
  const defaultActiveKey: ICollapseProps['defaultActiveKey'] = ['panel_1']
  const collapseRef = React.useRef()
  React.useEffect(() => {
    if (collapseRef.current)
      collapseRef.current.parentNode.style.cssText = 'display:flex; flex:1; padding-left:20px;padding-right:20px;'
  }, [collapseRef.current])
  const handleClick = () => {
    window.alert('Click Setting Icon')
  }
  const buttonStyle = {
    listStyle: 'none',
    border: 'none',
    background: 'none',
    color: '#0E5FD8',
    cursor: 'pointer',
    outline: 'none',
    padding: '0',
    'marginLeft': '24px',
  }
  return (
    <Collapse ref={collapseRef} defaultActiveKey={defaultActiveKey}>
      <Collapse.Panel
        header="为右上角按钮添加样式"
        panelKey="panel_1"
        extra={
          <div style={{ cursor: 'pointer', display: 'flex' }}>
            <button style={buttonStyle}>按钮</button>
            <button style={buttonStyle}>按钮</button>
            <button style={buttonStyle}>按钮</button>
            <button style={buttonStyle}>按钮</button>
          </div>
        }>
        折叠面板内容1
      </Collapse.Panel>
      <Collapse.Panel
        header="为右上角按钮添加点击事件"
        panelKey="panel_2"
        extra={
          <div onClick={handleClick} style={{ cursor: 'pointer' }}>
            <Icon type="setting" style={{ cursor: 'pointer' }} />
          </div>
        }>
        折叠面板内容2
      </Collapse.Panel>
    </Collapse>
  )
}

ReactDOM.render(<Demo />, mountNode)
```
