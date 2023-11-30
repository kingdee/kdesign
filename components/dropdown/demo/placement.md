---
order: 1
title: 弹出位置
---

通过 `placement` 属性设置，支持 12 个弹出位置。

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Dropdown, Button } from '@kdcloudjs/kdesign'

const Demo: React.FC = () => {
  const menu = (
    <Dropdown.Menu>
      <Dropdown.Item>
        <a target="_blank" rel="noopener noreferrer" href="https://www.kingdee.com/">
          Kingdee
        </a>
      </Dropdown.Item>
      <Dropdown.Item>
        <a target="_blank" rel="noopener noreferrer" href="https://www.kdcloud.com/">
          kdcloud
        </a>
      </Dropdown.Item>
      <Dropdown.Item>
        <a target="_blank" rel="noopener noreferrer" href="https://www.yunzhijia.com/">
          yunzhijia
        </a>
      </Dropdown.Item>
      <Dropdown.Item>
        <a target="_blank" rel="noopener noreferrer" href="https://www.jdy.com/">
        jdy
        </a>
      </Dropdown.Item>
    </Dropdown.Menu>
  )

  const buttonWidth = 70
  const buttonStyle = {
    width: 70,
    marginRight: 8,
    marginBottom: 8,
  }

  return (
    <div className="demo" style={{ width: '350px' }}>
      <div style={{ marginLeft: buttonWidth + 4, whiteSpace: 'nowrap' }}>
        <Dropdown placement="topLeft" menu={menu}>
          <Button style={buttonStyle}>TL</Button>
        </Dropdown>
        <Dropdown placement="top" menu={menu}>
          <Button style={buttonStyle}>Top</Button>
        </Dropdown>
        <Dropdown placement="topRight" menu={menu}>
          <Button style={buttonStyle}>TR</Button>
        </Dropdown>
      </div>
      <div style={{ width: buttonWidth, float: 'left' }}>
        <Dropdown placement="leftTop" menu={menu}>
          <Button style={buttonStyle}>LT</Button>
        </Dropdown>
        <Dropdown placement="left" menu={menu}>
          <Button style={buttonStyle}>Left</Button>
        </Dropdown>
        <Dropdown placement="leftBottom" menu={menu}>
          <Button style={buttonStyle}>LB</Button>
        </Dropdown>
      </div>
      <div style={{ width: buttonWidth, marginLeft: buttonWidth * 4 + 24 }}>
        <Dropdown placement="rightTop" menu={menu}>
          <Button style={buttonStyle}>RT</Button>
        </Dropdown>
        <Dropdown placement="right" menu={menu}>
          <Button style={buttonStyle}>Right</Button>
        </Dropdown>
        <Dropdown placement="rightBottom" menu={menu}>
          <Button style={buttonStyle}>RB</Button>
        </Dropdown>
      </div>
      <div style={{ marginLeft: buttonWidth + 4, clear: 'both', whiteSpace: 'nowrap' }}>
        <Dropdown placement="bottomLeft" menu={menu}>
          <Button style={buttonStyle}>BL</Button>
        </Dropdown>
        <Dropdown placement="bottom" menu={menu}>
          <Button style={buttonStyle}>Bottom</Button>
        </Dropdown>
        <Dropdown placement="bottomRight" menu={menu}>
          <Button style={buttonStyle}>BR</Button>
        </Dropdown>
      </div>
    </div>
  )
}

ReactDOM.render(<Demo />, mountNode)
```
