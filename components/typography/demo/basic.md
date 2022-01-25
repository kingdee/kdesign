---
title: 基本使用
order: 0
---

```jsx
import React from 'react'
import ReactDOM from 'react-dom'

function Demo() {
  import { Typography } from '@kdcloudjs/kdesign'
  const { Title, Paragraph, Text } = Typography

  return (
    <Typography>
      <Paragraph>
        <Title>输入框 input</Title>
        <Title level={2}>介绍</Title>
        <Text>输入框是一种允许用户输入跟编辑文本或者数字值的文本区；包含2种输入框类型：</Text>
        <ul>
          <li>基础输入框</li>
          <li>多行文本输入框</li>
        </ul>
      </Paragraph>
    </Typography>
  )
}

ReactDOM.render(<Demo />, mountNode)
```
