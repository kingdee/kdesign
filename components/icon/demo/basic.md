---
title: 线性icon
order: 0
---

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import copy from 'copy'
import { Icon, Message } from '@kdcloudjs/kdesign'

const BaseIcon = [
  'arrow-up',
  'arrow-down',
  'arrow-left',
  'arrow-right',
  'first',
  'last',
  'double-arrow-left',
  'double-arrow-right',
  'push-down',
  'put-top',
  'put-bottom',
  'put-on',
  'put-off',
  'switch-up',
  'switch-down',
  'all-border',
  'top-border',
  'right-border',
  'bottom-border',
  'left-border',
  'left-extension',
  'right-extension',
  'left-unfold',
  'right-unfold',
  'unfoldmenu',
  'foldmenu',
  'enlarge',
  'expand',
  'close-full-screen',
  'split',
  'back',
  'arrow',
  'no-border',
  'border',
  'rough-border',
  'align-left',
  'align-right',
  'align-center',
  'vertical-center',
  'delete-indentation',
  'equal',
  'greater-equal',
  'not-equal',
  'male',
  'female',
  'copy',
  'print',
  'lock',
  'scanning',
  'like',
  'project',
  'user-info',
  'shutdown',
  'image',
  'delete-line',
  'add-line',
  'job-info',
  'detect',
  'cancel',
  'stop',
  'cell',
  'fixed-shrink',
  'attachment',
  'location',
  'reduce',
  'resign-report',
  'forbid',
  'education',
  'unlock',
  'contract',
  'filter',
  'more',
  'operating-element',
  'fail',
  'edit',
  'have-attachment',
  'hide',
  'preview',
  'unfold-all',
  'wrap',
  'filter-switch',
  'qualification-info',
  'cn',
  'en',
  'git',
  'reset',
  'preview-view',
  'unfold',
  'comment',
  'shoppingcart',
  'add-child',
  'save',
  'detail',
  'table-setting',
  'edit-view',
  'edit-border',
  'hyperlink',
  'code',
  'import',
  'address',
  'analysis',
  'share',
  'chart',
  'fixed-window',
  'order',
  'phone',
  'classify',
  'feedback',
  'menu',
  'voice',
  'search-border',
  'material',
  'finish',
  'more-info',
  'fixed',
  'change',
  'copy-code',
  'return',
  'qrcode',
  'counterclockwise',
  'list',
  'switch',
  'task-process',
  'add',
  'delete',
  'add-word',
  'two-window',
  'spin',
  'ordered-list',
  'cooperation',
  'quit',
  'shrink',
  'zoom',
  'graffiti',
  'experience',
  'medical-report',
  'bankcard',
  'yunzhijia',
  'customize',
  'refresh',
  'search',
  'loadding',
  'loadding-circle',
  'right',
  'close',
  'upload',
  'download',
  'upload-cloud',
  'waiting',
  'warning',
  'exclamatory',
  'tips',
  'setting',
  'chart-display',
  'date',
  'more-item',
  'international',
  'little-k',
  'bellOutlined',
  'sigma',
  'fold'
]
const Demo: React.FC = () => {
  const handleClick = (type, e) => {
    copy(type)
    Message.success({
      content: `拷贝 ${type} Icon 成功`,
      closable: true,
    })
  }

  const baseicons = BaseIcon.map((type) => {
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
