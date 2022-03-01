---
category: Components
type: 导航
order: 3
title: Steps
subtitle: 步骤条
---

步骤条是一种显示任务进度或引导用户按照步骤完成任务的组件。

## 使用场景

当需要对复杂的任务进行拆解，按照固定顺序明确步骤

建议流程 2 ～ 5 个以内，且每个流程内容可以在当前页面完成。

如注册引导、初始化

## API

| 属性 | 说明 | 类型 | 默认值 | 可选值 | 版本 |
| --- | --- | --- | --- | --- | --- |
| canClickCurrentStep | 配置了 onChange 后点击 current 对应的当前步骤项是否可以触发 onChange 事件 | boolean | `false` | `true` `false` | 1.0.0 |
| current | 当前步骤 | number | - | - | 1.0.0 |
| direction | 步骤方向 | string | `horizontal` | `horizontal` `vertical` | 1.0.0 |
| icons | 各状态对应图标 | object {status: reactNode} | - | - | 1.0.0 |
| initial | 起始序号 | number | - | - | 1.0.0 |
| status | 当前步骤状态（Step 有设置时以子元素为准） | string | `process` | `wait`, `process`, `finish`, `error` | 1.0.0 |
| onChange | 步骤改变事件，当有配置该属性时步骤项将可点击，否则不可点击 | (current: number) => void | `false` | `true` `false` | 1.0.0 |

### Steps.Step

| 属性 | 说明 | 类型 | 默认值 | 可选值 | 版本 |
| --- | --- | --- | --- | --- | --- |
| description | 描述 | ReactNode | - | - | 1.0.0 |
| icon | 图标 | ReactNode | - | - | 1.0.0 |
| icons | 各状态对应图标 | object {status: reactNode} | - | - | 1.0.0 |
| status | 步骤状态 | string | `process` | `wait`, `process`, `finish`, `error` | 1.0.0 |
| stepNumber | 步骤数值 | number | - | - | 1.0.0 |
| title | 标题 | ReactNode | - | - | 1.0.0 |

## Design Token

| 分类 | 组件token | 全局token | 默认值 |
| --- | --- | --- | --- |
| color | --kd-c-steps-color-completed | --kd-g-color-theme | #5582f3 |
|  | --kd-c-steps-color-error | --kd-g-color-error | #fb2323 |
|  | --kd-c-steps-color-wait | --kd-g-color-text-secondary | #666 |
|  | --kd-c-steps-color-white | --kd-g-color-white | #fff |
|  | --kd-c-steps-icon-color-background | --kd-g-color-theme | #5582f3 |
| font | --kd-c-steps-font-size | --kd-g-font-size-small | 12px |
| sizing | --kd-c-steps-icon-sizing-width | - | 28px |
|  | --kd-c-steps-line-sizing-height | - | 4px |
|  | --kd-c-steps-horizontal-description-sizing-height | - | 60px |
|  | --kd-c-steps-vertical-description-sizing-width | - | 200px |
