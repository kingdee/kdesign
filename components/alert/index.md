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