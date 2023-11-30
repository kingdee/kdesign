---
title: 自定义元素
order: 3
---

提示弹窗可以使用自定义元素: 自定义标题、标题前的 icon、关闭的 icon、底部按钮

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Button, Modal, Icon } from '@kdcloudjs/kdesign'

const Demo: React.FC = () => {
  const bodyStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }
  const map = {
    body: {
      content: '自定义内容元素',
      el: () => {
        return <div className={'customed-body'}>自定义内容元素</div>
      },
    },
    footer: {
      content: '自定义底部内容',
      el: () => {
        return <Button className={'customed-footer'}>自定义底部内容</Button>
      },
    },
    title: {
      content: '自定义标题',
      el: () => {
        return <div className={'customed-title'}>自定义标题</div>
      },
    },
    titleIcon: {
      content: '自定义标题icon',
      el: () => {
        return (
          <div className={'customed-title-icon'}>
            <Icon type="loadding-circle" spin />
          </div>
        )
      },
    },
  }
  const createBody = (type) => {
    return `这是${map[type].content}的提示弹窗`
  }
  const [visible, setVisible] = React.useState(false)
  const [type, setType] = React.useState('body')
  const handleClick = (bool) => {
    setVisible(bool)
  }
  const prop = {
    [type]: map[type].el(),
  }
  return (
    <>
      {Object.keys(map).map((type, index) => {
        return (
          <Button
            key={index}
            onClick={() => {
              handleClick(true)
              setType(type)
            }}>
            {map[type].content}
          </Button>
        )
      })}
      <Modal
        body={createBody(type)}
        bodyStyle={bodyStyle}
        type="normal"
        closable={true}
        onCancel={() => handleClick(false)}
        onOk={() => handleClick(false)}
        mask={true}
        {...prop}
        visible={visible}
      />
    </>
  )
}

ReactDOM.render(<Demo />, mountNode)
```