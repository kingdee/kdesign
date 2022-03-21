---
order: 6
title: 右上角操作卡片
---

右上角的操作区域可配置

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Card, Icon, Dropdown } from '@kdcloudjs/kdesign'

function Demo() {
  const menu = (
    <Dropdown.Menu>
      <Dropdown.Item>
        <a target="_blank" rel="noopener noreferrer" href="https://www.kingdee.com/">
          数据过滤
        </a>
      </Dropdown.Item>
      <Dropdown.Item>
        <a target="_blank" rel="noopener noreferrer" href="https://www.kdcloud.com/">
          数据编辑
        </a>
      </Dropdown.Item>
    </Dropdown.Menu>
  )
  return (
    <>
      <Card
        title="标题文本"
        style={{ width: 300 }}
        extra={[
          <Icon type="refresh" key="refresh" />,
          <Icon type="setting" key="setting" />,
          <Dropdown menu={menu} key="dropdown">
            <Icon type="more" />
          </Dropdown>,
        ]}>
        <p>这是内容</p>
        <p>这是内容</p>
        <p>这是内容</p>
      </Card>
    </>
  )
}

ReactDOM.render(<Demo />, mountNode)
```
