---
category: Components
type: 表单
order: 7
title: Input
subtitle: 输入框
---

输入框是一种输入或编辑文本、数字的组件。

## 使用场景

- 需要输入文本或数字时。
- 需要输入密码，URL，电话号码或电子邮件地址等时。


## API

| 属性 | 说明 | 类型 | 默认值 | 可选值 | 版本     |
| --- | --- | --- | --- | --- |--------|
| addonAfter | input 后置标签 | string / ReactNode | `-` | `-` | 1.0.0  |
| addonBefore | input 前置标签 | string / ReactNode | `-` | `-` | 1.0.0  |
| allowClear | 可以点击清除图标删除内容 | boolean / ReactNode | `-` | `-` | 1.0.0  |
| borderType | 边框类型 | string | `underline` | `underline` `bordered` `none` | 1.0.0  |
| count | 计数开关 | boolean | `true` | `true` `false` | 1.6.28 |
| defaultValue | 输入框默认内容 | string | `-` | `-` | 1.0.0  |
| disabled | 输入框禁用状态 | boolean | `false` | `true` `false` | 1.0.0  |
| maxLength | 原生属性，最大输入长度 | number | `-` | `-` | 1.0.0  |
| minLength | 原生属性，最小输入长度 | number | `-` | `-` | 1.0.0  |
| placeholder | 输入框内容为空时的输入提示 | string | `请输入` | `-` | 1.0.0  |
| prefix | 带有前缀图标的 input | string / ReactNode | `-` | `-` | 1.0.0  |
| size | 控件大小 | string | `middle` | `small` `middle` `large` | 1.0.0  |
| status | 设置校验状态 | string | `-` | `error` | 1.7.5 |
| suffix | 带有后缀图标的 input | string / ReactNode | `-` | `-` | 1.0.0  |
| value | 输入框内容 | string | `-` | `-` | 1.0.0  |
| onChange | 输入框内容变化时的回调 | (event) => void | `-` | `-` | 1.0.0  |
| onPressEnter | 按下回车的回调 | (inputValue, event) => void | `-` | `-` | 1.0.0  |


### Textarea

| 属性 | 说明 | 类型 | 默认值 | 可选值 | 版本 |
| --- | --- | --- | --- | --- | --- |
| allowClear | 是否可以点击清除图标删除内容 | boolean | `true` | `true` `false` | 1.0.0 |
| autoSize | 自适应内容高度 | boolean \| Object | `true` | true \| false \| object: { minRows: number, maxRows: number } | 1.0.0 |
| borderType | 边框类型 | string | `underline` | `underline` `bordered` `none` | 1.0.0 |
| canResize | 是否可调整大小 | boolean | `true` | `true` `false` | 1.0.0 |
| count | 计数开关 | boolean | `true` | `true` `false` | 1.0.0 |
| countPosition | 计数开关摆放位置 | string | `outter` | `outter` `inner` | 1.6.6 |
| disabled | 输入框禁用状态 | boolean | `false` | `true` `false` | 1.0.0 |
| defaultValue | 输入框默认内容 | string | `-` | `-` | 1.0.0 |
| maxLength | 最大输入长度 | number | `255` | `-` | 1.0.0 |
| size | 控件大小 | string | `middle` | `small` `middle` `large` | 1.0.0 |
| status | 设置校验状态 | string | `-` | `error` | 1.7.5 |
| value | 输入框内容 | string | `-` | `-` | 1.0.0 |

### InputInstance

| 参数 | 说明 | 类型 | 版本 |
|--------| --- | --- |--------|
| blur | 取消焦点 | - | 1.7.22 |
| focus | 获取焦点 | - | 1.7.22 |
| select | 获取焦点 | - | 1.7.22 |

## Design Token

| 分类 | 组件token | 全局token | 默认值 |
| --- | --- | --- | --- |
| color | --kd-c-input-color-text | --kd-g-color-text-primary | #212121 |
|  | --kd-c-input-placeholder-color-text | --kd-g-color-text-placeholder | #ccc |
|  | --kd-c-input-color-border | - | #999 |
|  | --kd-c-input-clear-color | - | #d9d9d9 |
|  | --kd-c-input-clear-color-hover | - | #999 |
|  | --kd-c-input-color-background | --kd-g-color-white | #fff |
|  | --kd-c-input-color-background-disabled | --kd-g-color-background-contain-disabled | #f5f5f5 |
|  | --kd-c-input-color-border-focused | --kd-g-color-theme | #5582f3 |
|  | --kd-c-input-color-border-disabled | --kd-g-color-border-strong | #d9d9d9 |
|  | --kd-c-input-underline-color-border-disabled | --kd-g-color-border-weak | #e5e5e5 |
|  | --kd-c-input-color-disabled | --kd-g-color-disabled | #b2b2b2 |
|  | --kd-c-input-affix-color-text | - | #666 |
|  | --kd-c-input-color-error | --kd-g-color-error | #fb2323 |
| font | --kd-c-input-font-size-small | --kd-g-font-size-small | 12px |
|  | --kd-c-input-font-size-middle | --kd-g-font-size-middle | 14px |
|  | --kd-c-input-font-size-large | --kd-g-font-size-large | 16px |
| motion | --kd-c-input-motion-duration | --kd-g-duration | 0.3s |
| radius | --kd-c-input-radius-border | --kd-g-radius-border | 2px |
| sizing | --kd-c-input-sizing-height-small | - | 20px |
|  | --kd-c-input-sizing-height-middle | - | 30px |
|  | --kd-c-input-sizing-height-large | - | 36px |
|  | --kd-c-input-sizing-border | - | 1px |
|  | --kd-c-input-wrapper-padding-left | - | 0px |
|  | --kd-c-input-padding-left | - | 0px |
| spacing | --kd-c-input-spacing-padding-vertical-small | - | 3px |
|  | --kd-c-input-spacing-padding-horizontal-small | - | 9px |
|  | --kd-c-input-spacing-padding-vertical-middle | - | 5px |
|  | --kd-c-input-spacing-padding-horizontal-middle | - | 9px |
|  | --kd-c-input-spacing-padding-vertical-large | - | 8px |
|  | --kd-c-input-spacing-padding-horizontal-large | - | 9px |
