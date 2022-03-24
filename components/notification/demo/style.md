---
title: 自定义内容
order: 51
---

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Button, Icon, Notification } from '@kdcloudjs/kdesign'

function Demo() {
  const icon = () => {
    Notification.open({
      type: 'info',
      content: 'icon',
      title: '系统通知',
      showIcon: true,
      icon: <Icon type={'add-solid'} />,
      closeNode: '知道了',
    })
  }
  const style = () => {
    Notification.open({
      content: <div className="zdy-style">自定义通知内容</div>,
      title: (
        <div className="kd-notice-content-title">
          <div className="kd-notice-content-title-left">
            <div className="kd-notice-content-title-left-text">自定义标题内容</div>
          </div>
        </div>
      ),
      footer: <div className="kd-notice-content-description">自定义底部内容</div>,
       duration: 5000
    })
  }

  return (
    <div>
      <Button style={{ marginRight: '12px' }} onClick={icon}>
        自定义icon
      </Button>
      <Button style={{ marginRight: '12px' }} onClick={style}>
        自定义元素
      </Button>
    </div>
  )
}

ReactDOM.render(<Demo />, mountNode)
```

```css
.zdy-style {
  padding: 20px;
}
```
