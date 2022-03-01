---
category: Components
type: 反馈
order: 2
title: Popconfirm
subtitle: 气泡确认框
---

气泡确认框是一种轻量级的确认浮层。

## 何时使用

需要用户根据被指向的对象信息作进一步操作确认时。

## API

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| cancelButtonProps | 取消按钮props | [ButtonProps](/components/button/#API) | - | 1.0.0 |
| cancelText | 取消按钮文本 | string | `取消` | 1.0.0 |
| icon | 自定义弹出气泡图标 | boolean \| ReactNode | false | 1.0.0 |
| message | 描述 | ReactNode \| () => ReactNode | - | 1.0.0 |
| okButtonProps | 确认按钮props | [ButtonProps](/components/button/#API) | - | 1.0.0 |
| okText | 确认按钮文本 | string | `确定` | 1.0.0 |
| okType | 确认按钮类型 | string | `primary` | 1.0.0 |
| title | 标题 | ReactNode \| () => ReactNode | - | 1.0.0 |
| onCancel | 取消回调 | function(e) | - | 1.0.0 |
| onConfirm | 确认回调 | function(e) | - | 1.0.0 |

更多属性请参考 [Tooltip](/components/tooltip/#API)。
## Design Token

| 分类 | 组件token | 全局token | 默认值 |
| --- | --- | --- | --- |
| color | --kd-c-popconfirm-title-color-text | --kd-g-color-text-primary | #212121 |
|  | --kd-c-popconfirm-message-color-text | --kd-g-color-text-primary | #212121 |
|  | --kd-c-popconfirm-icon-color-text | --kd-g-color-warning | #ff991c |
|  | --kd-c-popconfirm-color-background | --kd-g-color-background | #fff |
| font | --kd-c-popconfirm-title-font-size | --kd-g-font-size-middle | 14px |
|  | --kd-c-popconfirm-message-font-size | --kd-g-font-size-small | 12px |
| radius | --kd-c-popconfirm-radius-border | --kd-g-radius-border | 2px |
| sizing | --kd-c-popconfirm-sizing-min-width | - | 164px |
|  | --kd-c-popconfirm-sizing-max-width | - | 500px |
|  | --kd-c-popconfirm-sizing-min-height | - | 98px |
|  | --kd-c-popconfirm-sizing-max-height | - | 400px |
|  | --kd-c-popconfirm-icon-sizing-square | - | 17px |
| spacing | --kd-c-popconfirm-spacing-padding-vertical | - | 16px |
|  | --kd-c-popconfirm-spacing-padding-horizontal | - | 16px |
|  | --kd-c-popconfirm-title-icon-spacing-margin-right | - | 8px |
|  | --kd-c-popconfirm-message-spacing-margin-top | - | 6px |
|  | --kd-c-popconfirm-message-spacing-margin-bottom | - | 20px |
|  | --kd-c-popconfirm-button-spacing | - | 12px |
