---
title: 表单布局
order: 2
---

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Button, Form, Input, Select, Radio } from '@kdcloudjs/kdesign'

function Demo() {
  const [form] = Form.useForm()
  const [layout, setLayout] = React.useState('inline')

  const onChangeLayout = (e) => {
    setLayout(e.target.value)
  }

  return (
    <div className="demo" style={{ width: '800px', textAlign: 'center' }}>
      <Form
        labelWidth={50}
        form={form}
        layout={layout}
        onFinish={(val) => console.log(val)}>
        <Form.Item label="Layout" name="layout">
          <Radio.Group defaultValue={layout} onChange={onChangeLayout}>
            <Radio.Button value="horizontal">Horizontal</Radio.Button>
            <Radio.Button value="vertical">Vertical</Radio.Button>
            <Radio.Button value="inline">Inline</Radio.Button>
          </Radio.Group>
        </Form.Item>
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
        <br />
        <Button type="primary" htmlType="submit">Submit</Button>
      </Form>
    </div>
  )
}

ReactDOM.render(<Demo />, mountNode)
```
