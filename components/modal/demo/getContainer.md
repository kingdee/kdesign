---
title: 弹出框放置容器
order: 9
---

弹出框可以设置容器属性,如果没有指定默认是 body，如果指定的是不存在的元素则原地返回

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Button, Modal } from '@kdcloudjs/kdesign'

const Demo: React.FC = () => {
  const [visible, setVisible] = React.useState<boolean>(false)
  const bodyStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }
  const [getContainer, setGetContainer] = React.useState(() => {})
  const handleClick = (bool: boolean) => {
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
        body={'弹出框'}
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
