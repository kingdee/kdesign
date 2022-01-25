---
order: 3
title: 位置
---

可以设置12个位置。

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Popconfirm, Button, Message } from '@kdcloudjs/kdesign'

function Demo() {
  const text = 'Are you sure to delete this task?'

  function confirm() {
    Message.success({
      content: 'Clicked on Yes.',
      closable: true,
    })
  }

  const buttonWidth = 70

  const buttonStyle = {
    width: 70,
    marginRight: 8,
    marginBottom: 8,
  }

  return (
    <div className="demo">
      <div style={{ marginLeft: buttonWidth + 4, whiteSpace: 'nowrap' }}>
        <Popconfirm placement="topLeft" message={text} onConfirm={confirm} okText="Yes" cancelText="No">
          <Button style={buttonStyle}>TL</Button>
        </Popconfirm>
        <Popconfirm placement="top" message={text} onConfirm={confirm} okText="Yes" cancelText="No">
          <Button style={buttonStyle}>Top</Button>
        </Popconfirm>
        <Popconfirm placement="topRight" message={text} onConfirm={confirm} okText="Yes" cancelText="No">
          <Button style={buttonStyle}>TR</Button>
        </Popconfirm>
      </div>
      <div style={{ width: buttonWidth, float: 'left' }}>
        <Popconfirm placement="leftTop" message={text} onConfirm={confirm} okText="Yes" cancelText="No">
          <Button style={buttonStyle}>LT</Button>
        </Popconfirm>
        <Popconfirm placement="left" message={text} onConfirm={confirm} okText="Yes" cancelText="No">
          <Button style={buttonStyle}>Left</Button>
        </Popconfirm>
        <Popconfirm placement="leftBottom" message={text} onConfirm={confirm} okText="Yes" cancelText="No">
          <Button style={buttonStyle}>LB</Button>
        </Popconfirm>
      </div>
      <div style={{ width: buttonWidth, marginLeft: buttonWidth * 4 + 24 }}>
        <Popconfirm placement="rightTop" message={text} onConfirm={confirm} okText="Yes" cancelText="No">
          <Button style={buttonStyle}>RT</Button>
        </Popconfirm>
        <Popconfirm placement="right" message={text} onConfirm={confirm} okText="Yes" cancelText="No">
          <Button style={buttonStyle}>Right</Button>
        </Popconfirm>
        <Popconfirm placement="rightBottom" message={text} onConfirm={confirm} okText="Yes" cancelText="No">
          <Button style={buttonStyle}>RB</Button>
        </Popconfirm>
      </div>
      <div style={{ marginLeft: buttonWidth + 4, clear: 'both', whiteSpace: 'nowrap' }}>
        <Popconfirm placement="bottomLeft" message={text} onConfirm={confirm} okText="Yes" cancelText="No">
          <Button style={buttonStyle}>BL</Button>
        </Popconfirm>
        <Popconfirm placement="bottom" message={text} onConfirm={confirm} okText="Yes" cancelText="No">
          <Button style={buttonStyle}>Bottom</Button>
        </Popconfirm>
        <Popconfirm placement="bottomRight" message={text} onConfirm={confirm} okText="Yes" cancelText="No">
          <Button style={buttonStyle}>BR</Button>
        </Popconfirm>
      </div>
    </div>
  )
}

ReactDOM.render(<Demo />, mountNode)
```