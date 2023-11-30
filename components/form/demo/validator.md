---
title: 校验
order: 6
---

Form 组件的校验使用 `async-validator.js` 更多校验规则可参考 [async-validator 官网](https://www.npmjs.com/package/async-validator)

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Button, Form, Input } from '@kdcloudjs/kdesign'

const Demo: React.FC = () => {
  const [form] = Form.useForm()

  const onChange = (e) => {
    console.log('input', e.target.value)
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
          rules={[
            { required: true, message: '请输入' },
            { min: 6, message: '请输入至少6位字符' },
          ]}>
          <Input onChange={onChange} />
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
              },
            },
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
              },
            })
          ]}>
          <Input type="password" />
        </Form.Item>
        <Button onClick={onSubmit}>提交</Button>
        <Button htmlType="reset" style={{marginLeft: 10}}>重置</Button>
      </Form>
    </div>
  )
}

ReactDOM.render(<Demo />, mountNode)
```
