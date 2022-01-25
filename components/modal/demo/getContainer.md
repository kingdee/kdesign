---
title: 提示弹窗放置容器
order: 9
---

提示弹窗可以设置容器属性,如果没有指定默认是 body，如果指定的是不存在的元素则原地返回

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Button, Modal } from '@kdcloudjs/kdesign'

function Demo() {
  const [visible, setVisible] = React.useState(false)
  const bodyStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }
  const [getContainer, setGetContainer] = React.useState(() => {})
  const handleClick = (bool) => {
    setVisible(bool)
  }
  return (
    <>
      <Button
        onClick={() => {
          handleClick(true)
          setGetContainer(() => document.body)
        }}>
        {'点击显示在body上'}
      </Button>
      <Button
        onClick={() => {
          handleClick(true)
          setGetContainer(() => false)
        }}>
        {'点击显示在原地'}
      </Button>
      <Modal
        body={'提示弹窗'}
        bodyStyle={bodyStyle}
        onCancel={() => {
          handleClick(false)
        }}
        onOk={() => {
          handleClick(false)
        }}
        type="normal"
        getContainer={getContainer}
        closable={true}
        mask={false}
        focusTriggerAfterClose
        visible={visible}
      />
    </>
  )
}

ReactDOM.render(<Demo />, mountNode)
```