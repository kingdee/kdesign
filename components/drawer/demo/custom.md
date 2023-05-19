---
title: 自定义元素
order: 1
---

抽屉可以自定义元素:

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Drawer, Button, Radio, Icon } from '@kdcloudjs/kdesign'

function Demo() {
  const [visible, setVisible] = React.useState(false)
  const [prop, setProp] = React.useState('closeIcon')
  const map = {
    closeIcon: {
      content: '关闭图标',
      Component: () => {
        return <Icon type="loadding" />
      },
    },
    footer: {
      content: '底部元素',
      Component: () => {
        return <Button>我知道了</Button>
      },
    },
    title: {
      content: '标题元素',
      Component: () => {
        return <div>自定义标题</div>
      },
    },
  }
  const onChange = React.useCallback((e) => {
    setProp(e.target.value)
  }, [])
  return (
    <>
      <Radio.Group onChange={onChange} value={prop}>
        {Object.keys(map).map((prop) => {
          return (
            <Radio value={prop} key={prop}>
              {map[prop].content}
            </Radio>
          )
        })}
        <Radio value="children">内容元素</Radio>
      </Radio.Group>
      <Button onClick={() => setVisible(!visible)}>Open</Button>
      <Drawer visible={visible} {...{ [prop]: map[prop] && map[prop].Component() }} onClose={() => setVisible(false)}>
        {prop === 'children' ? <div>自定义内容元素</div> : <div>自定义{map[prop].content}</div>}
      </Drawer>
    </>
  )
}

ReactDOM.render(<Demo />, mountNode)
```
