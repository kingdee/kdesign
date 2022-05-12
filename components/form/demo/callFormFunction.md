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
        <Form.Item label="姓名" name="name" required>
          <Input />
        </Form.Item>
        <Form.Item label="性别" name="gender" required>
          <Select placeholder="请选择" allowClear>
            <Select.Option value="male">男</Select.Option>
            <Select.Option value="female">女</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="血型" name="blood" required>
          <Radio.Group>
            <Radio value={1}>A</Radio>
            <Radio value={2}>B</Radio>
            <Radio value={3}>O</Radio>
            <Radio value={4}>AB</Radio>
          </Radio.Group>
        </Form.Item>
        <div>
          <Button htmlType="submit">提交</Button>
          <Button htmlType="reset" style={{marginLeft: 10}}>重置</Button>
        </div>
        <br/>
        <div>
          <Button onClick={handleSubmitClick}>方法提交</Button>
          <Button onClick={handleResetClick} style={{marginLeft: 10}}>方法重置</Button>
        </div>
      </Form>
    </div>
  )
}

ReactDOM.render(<Demo />, mountNode)
```
