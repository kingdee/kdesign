---
title: 自定义同步值的事件
order: 7
---

通过 `syncValueTrigger` 配置项，可以自定义同步值的事件。

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Button, Form, Input } from '@kdcloudjs/kdesign'
const Demo = () => {
  const [form] = Form.useForm()
  const [value, setValue] = React.useState(1)
  const onClick = (e) => {
    console.log('input', e.target.value)
    setValue(value + 1)
  }
  const onSubmit = () => {
    form
      .validateFields()
      .then((res) => {
        console.log('success:', res)
      })
      .catch((e) => console.log('error:', e))
  }
  return (
    <div className="demo">
      <Form
        layout="vertical"
        labelWidth={100}
        onValuesChange={(changedValue, values) => {
          console.log('form', changedValue, values)
        }}
        form={form}
        onFinish={(val) => console.log('submit', val)}>
        <Form.Item
          label="用户名"
          name="username"
          required
          validateTrigger="onBlur"
          syncValueTrigger={{
            event: "onClick",
            valueGetter: (props, event) => props.value + 1,
            delay: true
          }}
          rules={[
            {
              validator: (_, value) => {
                console.log('rules====', _, value)
                if (value >= 6) {
                  return Promise.resolve()
                }
                return Promise.reject(new Error('请输入至少6!'))
              }
            }
          ]}>
          <Input onClick={onClick} value={value} />
        </Form.Item>
        <Form.Item
          label="密码"
          name="password"
          required
          rules={[
            {
              validator: (_, value) => {
                if (!value || value.length >= 6) {
                  return Promise.resolve()
                }
                return Promise.reject(new Error('请输入至少6位字符!'))
              }
            }
          ]}>
          <Input type="password" />
        </Form.Item>
        <Form.Item
          label="确认密码"
          name="passwordConfirm"
          required
          rules={[
            ({ getFieldValue }) => ({
              validator(_, value) {
                console.log('password:', getFieldValue('password'))
                if (!value || value === getFieldValue('password')) {
                  return Promise.resolve()
                }
                return Promise.reject(new Error('两次输入不一致'))
              }
            })
          ]}>
          <Input type="password" />
        </Form.Item>
        <Button onClick={onSubmit}>提交</Button>
        <Button
          htmlType="reset"
          style={{
            marginLeft: 10
          }}>
          重置
        </Button>
      </Form>
    </div>
  )
}
ReactDOM.render(<Demo />, mountNode)
```
