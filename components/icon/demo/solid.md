---
title: 面性icon
order: 0
---

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import copy from 'copy'
import { Icon, Message } from '@kdcloudjs/kdesign'

const solidIcon = [
  'arrow-left-circle-solid',
  'arrow-right-circle-solid',
  'arrow-up-solid',
  'arrow-right-solid',
  'arrow-down-solid',
  'arrow-left-solid',
  'left-unfold-solid',
  'right-unfold-solid',
  'unlock-solid',
  'multiply',
  'division-solid',
  'title-solid',
  'communication-solid',
  'fixed-solid',
  'more-info-solid',
  'timezone-solid',
  'mosaic-solid',
  'strike-solid',
  'lock-solid',
  'filter-solid',
  'person-solid',
  'bold-solid',
  'delete-solid',
  'processing-solid',
  'tips-solid',
  'quote-solid',
  'oblique-solid',
  'sun-solid',
  'underline-solid',
  'font-background-solid',
  'eliminate-solid',
  'font-color-solid',
  'refresh-solid',
  'right-solid',
  'location-solid',
  'add-solid',
  'warning-solid',
  'close-solid',
  'right-bold',
  'close-bold',
  'workbench',
  'star',
  'notice',
  'avatar-solid',
  'business-type',
  'my-receipt',
  'order-facet',
  'report-form',
  'dashboard',
]
const Demo: React.FC = () => {
  const handleClick = (type, e) => {
    copy(type)
    Message.success({
      content: `拷贝 ${type} Icon 成功`,
      closable: true,
    })
  }
  const baseicons = solidIcon.map((type) => {
    return (
      <div
        style={{ float: 'left' }}
        key={type}
        className={'icon-item'}
        onClick={(e) => {
          handleClick(type, e)
        }}>
        <Icon type={type} style={{ fontSize: '48px' }} />
        <div>{type}</div>
      </div>
    )
  })
  return <div>{baseicons}</div>
}

ReactDOM.render(<Demo />, mountNode)
```
