---
category: Components
type: 反馈
order: 0
title: Alert
subtitle: 警告提示
---

警告提示是一种用于页面中展示提示信息的组件。

## 使用场景

需要用户关注提示信息时。

## API

| 属性 | 说明 | 类型 | 默认值 | 可选值 | 版本 |
| --- | --- | --- | --- | --- | --- |
| banner | 是否悬浮在顶部 | boolean | `false` | `true` `false` | 1.0.0 |
| bannerOffset | 悬浮在顶部时的位置设置 | Array<left: number, top: number> | `[0, 0]` | - | 1.0.0 |
| className | 传入反馈浮层组件的样式 | String | - | - | 1.0.0 |
| closable | 是否可以手动关闭反馈浮层 | boolean | `false` | `true` `false` | 1.0.0 |
| closeNode | 自定义的关闭元素 | ReactNode | - | - | 1.0.0 |
| delayOffTime | 反馈浮层显示的时间 | number | `5000` | - | 1.0.0 |
| extra | 关闭按钮前自定义元素 | ReactNode | - | - | 1.0.0 |
| icon | 反馈浮层的自定义信息标识 | ReactNode | - | - | 1.0.0 |
| message | 反馈浮层的显示文本/自定义元素 | ReactNode | - | - | 1.0.0 |
| onClose | 反馈浮层关闭回调 | Function | - | - | 1.0.0 |
| showIcon | 反馈浮层是否显示信息标识图标 | boolean | `false` |  `true` `false` | 1.0.0 |
| type | 反馈浮层的类型 | string | `warning` | `success` `warning` `error` `info` | 1.0.0 |
## Design Token

| 分类 | 组件token | 全局token | 默认值 |
| --- | --- | --- | --- |
| color | --kd-c-alert-color-background-success | --kd-g-color-background-success | #f2fff5 |
|  | --kd-c-alert-color-background-warning | --kd-g-color-background-warning | #fffbf2 |
|  | --kd-c-alert-color-background-error | --kd-g-color-background-error | #fff2f4 |
|  | --kd-c-alert-color-background-info | --kd-g-color-background-ongoing | #f2f9ff |
|  | --kd-c-alert-color-text-success | --kd-g-color-success | #1ba854 |
|  | --kd-c-alert-color-text-warning | --kd-g-color-warning | #ff991c |
|  | --kd-c-alert-color-text-error | --kd-g-color-error | #fb2323 |
|  | --kd-c-alert-color-text-info | --kd-g-color-ongoing | #276ff5 |
|  | --kd-c-alert-close-icon-color-text | --kd-g-color-text-secondary | #666 |
|  | --kd-c-alert-close-icon-color-text-hover | --kd-g-color-theme-5 | rgb(135, 173, 255) |
| font | --kd-c-alert-message-font-size | --kd-g-font-size-small | 12px |
|  | --kd-c-alert-message-icon-font-size | --kd-g-font-size-middle | 14px |
|  | --kd-c-alert-close-icon-font-size | --kd-g-font-size-middle | 14px |
| spacing | --kd-c-alert-sizing-padding-top | - | 8px |
|  | --kd-c-alert-sizing-padding-bottom | - | 12px |
|  | --kd-c-alert-sizing-padding-horizontal | - | 12px |
|  | --kd-c-alert-message-icon-sizing-margin-right | - | 8px |
|  | --kd-c-alert-close-icon-sizing-margin-left | - | 8px |
