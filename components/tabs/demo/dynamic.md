---
order: 8
title: 动态页签
---

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Tabs, Button, Icon } from '@kdcloudjs/kdesign'

const Demo: React.FC = () => {
  const [panes, setPanes] = React.useState([
        { name: 'TabPane1', value: '1' },
        { name: 'TabPane2', value: '2' },
        { name: 'TabPane3', value: '3' },
        { name: 'TabPane4', value: '4' },
      ])
  const [activeKey, setActiveKey] = React.useState<number>(1)
  const [newTabIndex, setNewTabIndex] = React.useState<number>(0)
  
  const backHome = () => {
    setActiveKey((panes[0] && panes[0].value) || 0)
  }
  const add = () => {
    const activeKey = `newTab${newTabIndex + 1}`
    const newPanes = [...panes]
    newPanes.push({
      name: `new tab${newTabIndex}`,
      value: activeKey,
    })
    setPanes(newPanes)
    setActiveKey(activeKey)
    setNewTabIndex(newTabIndex + 1)
  }
  const remove = (target) => {
    const newPanes = panes.filter((pane) => {
      return String(pane.value) !== String(target)
    })
    setPanes(newPanes)
    setActiveKey((newPanes[0] && newPanes[0].value) || 0)
  }
  const setActive = (key) => {
    setActiveKey(key)
  }
  const closeOther = (key) => {
    const newPane = panes.find((pane) => {
      return String(pane.value) === String(key)
    })
    setPanes([newPane])
    setActiveKey((newPane && newPane.value) || 0)
  }
  const closeTrigger = (key) => {
    console.log('click key ==>', key)
    const newPanes = panes.filter((pane) => {
      return String(pane.value) !== String(key)
    })
    setPanes(newPanes)
    setActiveKey((newPanes[0] && newPanes[0].value) || 0)
  }
  const removeBtn = (
      <Button type="text" onClick={remove}>
        <Icon type="close" />
      </Button>
    )
  return (
    <>
        <div style={{ width: '500px' }}>
         <Button type="primary" onClick={add}>
          新建页签
        </Button>
          <Tabs type="dynamic" showScrollArrow activeKey={activeKey} onChange={setActive}>
            <Tabs.TabPane specialPane="left">
              <Icon type="workbench" onClick={backHome} style={{ color: '#999999' }} />
            </Tabs.TabPane>
            {panes.map((pane) => {
              return (
                <Tabs.TabPane key={pane.value} tab={pane.name} operations={[removeBtn]}>
                  {pane.name}
                </Tabs.TabPane>
              )
            })}
            <Tabs.TabPane specialPane="right">
              <Icon type="tips" className="tabs-right-operations-icon" />
              <Icon type="expand" className="tabs-right-operations-icon" />
              <Icon type="setting" className="tabs-right-operations-icon" />
            </Tabs.TabPane>
            <Tabs.TabPane specialPane="contextMenu">
              <div onClick={closeTrigger}>关闭当前</div>
              <div onClick={closeOther}>关闭其他</div>
            </Tabs.TabPane>
          </Tabs>
        </div>
      </>
  )
} 

ReactDOM.render(<Demo />, mountNode)
```
```css
.tabs-right-operations-icon {
  font-size: 18px;
}
```