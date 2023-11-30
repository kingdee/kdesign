---
title: 尺寸可配置
order: 10
---

尺寸可根据需要进行配置。

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import _ from 'lodash'
import { Input, Modal } from '@kdcloudjs/kdesign'

const Demo: React.FC = () => {
  const [width, setWidth] = React.useState<number>(300)
  const [height, setHeight] = React.useState<number>(500)
  const [visible, setVisible] = React.useState<boolean>(true)
  const bodyStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }
  const onChangeWidth = _.debounce(
    (evt, ...args) => {
      setWidth(+evt.target.value)
    },
    300,
    { leading: true },
  )
  const onChangeHeight = _.debounce(
    (evt) => {
      setHeight(+evt.target.value)
    },
    300,
    { leading: true },
  )
  const handleClick = (bool) => {
    setVisible(bool)
  }
  return (
    <>
      <Input
        placeholder="宽度"
        onChange={onChangeWidth}
        style={{
          width: 100,
          marginRight: 50,
        }}
      />
      <Input
        placeholder="高度"
        onChange={onChangeHeight}
        style={{
          width: 100,
        }}
      />
      <Modal
        body={'可以设置提示弹窗的宽高, 只能输入数字类型'}
        onCancel={() => {
          handleClick(false)
        }}
        onOk={() => {
          handleClick(false)
        }}
        width={width}
        bodyStyle={bodyStyle}
        height={height}
        type="normal"
        closable={true}
        getContainer={false}
        mask={false}
        visible={visible}
      />
    </>
  )
}

ReactDOM.render(<Demo />, mountNode)
```
