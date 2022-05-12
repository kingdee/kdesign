---
title: 基本使用
order: 0
---

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Button, Form, Input } from '@kdcloudjs/kdesign'

function Demo() {
  const onChange = (e) => {
    console.log('input', e.target.value)
  }

  return (
    <div className="demo">
      <Form
        layout="vertical"
        labelWidth={100}
        onValuesChange={(changedValue, values) => {
          console.log('form', changedValue, values)
        }}
        onFinish={(val) => console.log('submit', val)}>
        <Form.Item
          label="用户名"
          name="username"
          required
          validateTrigger="onBlur">
          <Input onChange={onChange} />
        </Form.Item>
        <Form.Item label="密码" name="password" required>
          <Input type="password" />
        </Form.Item>
        <Button htmlType="submit">提交</Button>
        <Button htmlType="reset" style={{marginLeft: 10}}>重置</Button>
      </Form>
    </div>
  )
}

ReactDOM.render(<Demo />, mountNode)
```
