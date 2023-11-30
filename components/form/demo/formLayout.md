---
title: 表单布局
order: 2
---

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Button, Form, Input, Select, Radio } from '@kdcloudjs/kdesign'

const Demo: React.FC = () => {
  const [form] = Form.useForm()
  const [layout, setLayout] = React.useState('horizontal')

  const onChangeLayout = (e) => {
    setLayout(e.target.value)
  }

  return (
    <div className="demo" style={{ width: '800px' }}>
      <Form
        labelWidth={50}
        form={form}
        layout={layout}
        onFinish={(val) => console.log(val)}>
        <Form.Item label="布局" name="layout">
          <Radio.Group defaultValue={layout} onChange={onChangeLayout}>
            <Radio.Button value="horizontal">Horizontal</Radio.Button>
            <Radio.Button value="vertical">Vertical</Radio.Button>
            <Radio.Button value="inline">Inline</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="姓名" name="name" required>
          <Input />
        </Form.Item>
        <Form.Item label="性别" name="gender" required>
          <Select placeholder="请选择" allowClear>
            <Select.Option value="male">男</Select.Option>
            <Select.Option value="female">女</Select.Option>
          </Select>
        </Form.Item>
        <br />
        <Button type="primary" htmlType="submit">提交</Button>
      </Form>
    </div>
  )
}

ReactDOM.render(<Demo />, mountNode)
```
