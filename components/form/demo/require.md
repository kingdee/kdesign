---
title: 必选样式
order: 4
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
        labelWidth={100}
        form={form}
        onValuesChange={(changedValue, values) => {
          console.log(changedValue, values)
        }}
        onFinish={(val) => console.log(val)}>
        <Form.Item label="姓名" name="note" required>
          <Input />
        </Form.Item>
        <Form.Item label="性别" name="gender">
          <Input />
        </Form.Item>
        <Form.Item label="年龄" name="age" rules={[{ required: true, message: '请输入年龄' }]}>
          <Input />
        </Form.Item>
        <br />
        <Button type="primary" htmlType="submit">提交</Button>
      </Form>
    </div>
  )
}

ReactDOM.render(<Demo />, mountNode)
```
