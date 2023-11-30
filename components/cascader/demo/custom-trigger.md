---
order: 2
title: 自定义触发元素
---

传入子元素来自定义触发元素，默认触发元素是一个 `Input` 组件

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Cascader } from '@kdcloudjs/kdesign'

const Demo: React.FC = () => {
  const options = [
    {
      value: 'guangdong',
      label: 'Guangdong',
      children: [
        {
          value: 'guangzhou',
          label: 'Guangzhou',
        },
        {
          value: 'shenzhen',
          label: 'Shenzhen',
        },
      ],
    },
    {
      value: 'jiangxi',
      label: 'Jiangxi',
      children: [
        {
          value: 'nanchang',
          label: 'Nanchang',
        },
        {
          value: 'ganzhou',
          label: 'Ganzhou',
        },
      ],
    },
  ]

  const [text, setText] = React.useState('Unselect')

  const onChange = (value, selectedOptions) => {
    setText(selectedOptions.map((o) => o.label).join(', '))
  }

  return (
    <div style={{ width: 300 }}>
      <span dangerouslySetInnerHTML={{ __html: `${text}&nbsp;` }} />
      <Cascader options={options} onChange={onChange}>
        <a href="true" onClick={(e) => e.preventDefault()}>
          Change city
        </a>
      </Cascader>
    </div>
  )
}

ReactDOM.render(<Demo />, mountNode)
```
