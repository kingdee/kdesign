---
title: 登录框
order: 5
---

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Button, Form, Input } from '@kdcloudjs/kdesign'

function Demo() {
  const [form] = Form.useForm()

  return (
    <div className="demo" style={{ width: '200px' }}>
      <Form
        labelWidth={200}
        form={form}
        onValuesChange={(changedValue, values) => {
          console.log(changedValue, values)
        }}
        onFinish={(val) => console.log(val)}>
        <Form.Item name="username" rules={[{ required: true, message: 'Please input your Username!' }]}>
          <Input placeholder="Username" />
        </Form.Item>
        <Form.Item name="password" rules={[{ required: true, type: 'number', min: 3 }]}>
          <Input placeholder="Password" />
        </Form.Item>
        <br />
        <Button type="primary" htmlType="submit">Submit</Button>
      </Form>
    </div>
  )
}

ReactDOM.render(<Demo />, mountNode)
```
