---
title: 表单方法调用
order: 1
---

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Button, Form, Input, Select, Radio } from '@kdcloudjs/kdesign'

function Demo() {
  const [form] = Form.useForm()

  const handleResetClick = () => {
    form.resetFields()
  }

  const handleSubmitClick = () => {
    form.submit()
  }

  return (
    <div className="demo" style={{ width: '500px' }}>
      <Form
        layout="vertical"
        labelWidth={80}
        form={form}
        onValuesChange={(changedValue, values) => {
          console.log(changedValue, values)
        }}
        onFinish={(val) => console.log(val)}>
        <Form.Item label="Note" name="note" required>
          <Input />
        </Form.Item>
        <Form.Item label="Gender" name="gender" required>
          <Select placeholder="Select a option and change input text above" allowClear>
            <Select.Option value="male">male</Select.Option>
            <Select.Option value="female">female</Select.Option>
            <Select.Option value="other">other</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="Character" name="character" required>
          <Radio.Group>
            <Radio value={1}>A</Radio>
            <Radio value={2}>B</Radio>
            <Radio value={3}>C</Radio>
            <Radio value={4}>D</Radio>
          </Radio.Group>
        </Form.Item>
        <div>
          <Button htmlType="submit">Submit</Button>
          <Button htmlType="reset">Reset</Button>
        </div>
        <br/>
        <div>
          <Button onClick={handleSubmitClick}>FormInstance Submit</Button>
          <Button onClick={handleResetClick}>FormInstance Reset</Button>
        </div>
      </Form>
    </div>
  )
}

ReactDOM.render(<Demo />, mountNode)
```
