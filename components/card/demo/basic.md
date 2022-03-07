---
order: 0
title: 典型卡片
---

包含标题、内容、操作区域。

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Card,Dropdown, Icon } from '@kdcloudjs/kdesign'

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
          编辑卡片
        </a>
      </Dropdown.Item>
      <Dropdown.Item>
        <a target="_blank" rel="noopener noreferrer" href="https://www.yunzhijia.com/">
          全屏查看
        </a>
      </Dropdown.Item>
      <Dropdown.Item>
        <a target="_blank" rel="noopener noreferrer" href="https://www.jdy.com/">
        删除卡片
        </a>
      </Dropdown.Item>
    </Dropdown.Menu>
  )
  return (
    <>
      <Card title="标题文本标题文本标123456789123456789" style={{ width: 300 }}  edits={
    <Dropdown menu={menu}>
      <Icon type="more" />
    </Dropdown>

        }>
        <p>这是内容</p>
        <p>这是内容</p>
        <p>这是内容</p>
      </Card>
    </>
  )
}

ReactDOM.render(<Demo />, mountNode)
```
