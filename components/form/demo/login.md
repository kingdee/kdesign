---
title: 登录框
order: 5
---

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Button, Form, Input } from '@kdcloudjs/kdesign'

const Demo: React.FC = () => {
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
        <Form.Item name="用户名" rules={[{ required: true, message: '用户名是必填项' }]}>
          <Input placeholder="Username" />
        </Form.Item>
        <Form.Item
          name="密码"
          rules={[
            { required: true, message: '密码是必填项'},
            {min: 3, message: '密码至少3位'},
          ]}>
          <Input placeholder="Password" />
        </Form.Item>
        <br />
        <Button type="primary" htmlType="submit">提交</Button>
      </Form>
    </div>
  )
}

ReactDOM.render(<Demo />, mountNode)
```
