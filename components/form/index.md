---
category: Components
type: 表单
order: 5
title: Form
subtitle: 表单
---

表单是一种以结构化的方式输入信息、校验信息的组件。

## 使用场景

- 需要收集信息时，如：注册。
- 需要校验信息时，如：登录。

## API

### Form

| 属性 | 说明 | 类型 | 默认值 | 可选值 | 版本 |
| --- | --- | --- | --- | --- | --- |
| className | 传入表单的自定义类名 | string | | | 1.0.0 |
| defaultValue | 配置`Form.Item`的默认值。设置后，会根据 `Form.Item` 的 `name` 进行内容的默认值配置 | { string: any } | `undefined` | | 1.0.0|
| disabled | 表单是否禁用 | boolean | false ||1.0.0 |
| form | 通过`Form.useForm()`创建的实例对象 | FormInstance | | | 1.0.0 |
| labelAlign | 标签的对齐方式 | LabelAlign | 'left' | `'left' | 'right'` | 1.0.0 |
| labelWidth | 标签的宽度 | `string | number` | | | 1.0.0 |
| layout | 表单布局 | `FormLayout` | `'vertical'` | `'horizontal' | 'vertical' | 'inline'` | 1.0.0 |
| name | 表单名称 | `string` | | | 1.0.0 |
| wrappedWidth | 输入控件宽度 | `string | number` | | | 1.0.0 |
| onFinish | 提交表单且数据验证成功后回调事件 | `function(values)` | | | 1.0.0 |
| onFinishFailed | 提交表单且数据验证失败后回调事件 | `function({ values, errorFields })` | | | 1.0.0 |
| onValuesChange | 字段值更新时触发回调事件 | `function({changedValues, allValues})` | | | 1.0.0 |

### Form.Item
| 属性              | 说明 | 类型 | 默认值 | 可选值 | 版本         |
|-----------------| --- | --- | --- | --- |------------|
| className       | 传入表单的自定义类名 | string | | | 1.0.0      |
| defaultValue    | 默认值 | { string: any } | | | 1.0.0      |
| disabled        | 表单是否禁用 | boolean | false ||1.0.0 |
| hidden          | 是否隐藏 | boolean | | | 1.0.0      |
| label           | 标签内容 | `string | number` | |            | 1.0.0 |
| labelAlign      | 标签的对齐方式 | LabelAlign | 'left' | `'left' | 'right'`   | 1.0.0 |
| labelWidth      | 标签的宽度 | `string | number` | |            | 1.0.0 |
| layout          | 表单布局 | `FormLayout` | `'vertical'` | `'horizontal' | 'vertical' | 'inline'` | 1.0.0 |
| name            | item名称 | `string` | | | 1.0.0      |
| required        | 是否必录 | `boolean` | `false` | | 1.0.0      |
| rules           | 校验规则 | `Rule[]` | | | 1.0.0      |
| validateTrigger | 字段校验的时机 | `string` | `'onchange'` | | 1.0.0      |
| wrappedWidth    | 输入控件宽度 | `string | number` | |            | 1.0.0 |
| htmlFor         | 设置子元素 label htmlFor 属性 | string | | | 1.6.7      |
| extra         | 额外的提示信息 | ReactNode | | | 1.7.25      |

### FormInstance
| 属性 | 说明 | 类型 | 默认值 | 可选值 | 版本 |
| --- | --- | --- | --- | --- | --- |
| getFieldError | 获取对应字段名的错误信息 | `(name: NamePath) => string | undefined` | | | 1.0.0 |
| getFieldsError | 获取一组字段名对应的错误信息 | `(nameList?: NamePath[]) => FieldError` | | | 1.0.0 |
| getFieldsValue | 获取一组字段名对应的值 | `(namePathList?: NamePath[]) => any` | | | 1.0.0 |
| getFieldValue | 获取对应字段名的值 | `(name: NamePath) => any` |||1.0.0|
| resetFields | 重置一组字段到 `defaultValues` | | | | 1.0.0 |
| setFieldsValue | 设置表单的值 | `(value: Values) => void` | | | 1.0.0 |
| setFieldValue | 设置表单指定字段值 | `(name: NamePath, value: Values) => void` | | | 1.0.0 |
| submit | 提交表单 | `() => void` | | | 1.0.0 |
| validateFields | 触发表单校验 | `(namePathList?: NamePath[]) => Promise<Values>` | | | 1.0.0 |
| valuePropName | 子节点的值的属性，如 Switch 的是 'checked'。 | string | | `value` | 1.3.0 |

## Design Token

| 分类 | 组件token | 全局token | 默认值 |
| --- | --- | --- | --- |
| color | --kd-c-form-field-color | --kd-g-color-text-secondary | #666 |
|  | --kd-c-form-error-color | --kd-g-color-error | #fb2323 |
|  | --kd-c-form-extra-color | --kd-g-color-text-third | #999 |
| font | --kd-c-form-field-label-font-size | - | 12px |
|  | --kd-c-form-field-message-font-size | - | 12px |
| line-height | --kd-c-form-field-label-line-height | - | 18px |
|  | --kd-c-form-field-message-line-height | - | 18px |
| spacing | --kd-c-form-field-spacing-margin-right | - | 30px |
|  | --kd-c-form-field-spacing-margin-bottom | - | 22px |
|  | --kd-c-form-field-message-spacing-padding-horizontal | - | 2px |
|  | --kd-c-form-field-message-spacing-padding-vertical | - | 8px |
|  | --kd-c-form-field-label-spacing-margin-bottom | - | 5px |
