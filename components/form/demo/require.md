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
        <Form.Item label="Note" name="note" required>
          <Input />
        </Form.Item>
        <Form.Item label="Gender" name="gender">
          <Input />
        </Form.Item>
        <Form.Item label="Age" name="age" rules={[{ required: true, message: '请输入年龄!' }]}>
          <Input />
        </Form.Item>
        <br />
        <Button type="primary" htmlType="submit">Submit</Button>
      </Form>
    </div>
  )
}

ReactDOM.render(<Demo />, mountNode)
```
