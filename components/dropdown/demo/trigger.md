---
order: 4
title: 触发方式
---

提供了 `hover`、`click`、 `focus` 和 `contextMenu` 4 种触发方式，默认是 `hover` 触发菜单

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

  const triggers = ['hover', 'click', 'focus', 'contextMenu']

  return (
    <>
      {triggers.map((trigger) => (
          <Dropdown key={trigger} menu={menu} trigger={trigger}>
            {trigger === 'contextMenu' ? (
              <div
                style={{
                  textAlign: 'center',
                  height: 100,
                  width: 200,
                  lineHeight: '100px',
                  background: '#f7f7f7',
                  color: '#777',
                }}>
                Right Click on here
              </div>
            ) : (
              <Button style={{ display: 'block', width: 120, marginBottom: 20 }}>
                {trigger} me
              </Button>
            )}
          </Dropdown>
      ))}
    </>
  )
}

ReactDOM.render(<Demo />, mountNode)
```
