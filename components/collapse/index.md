---
category: Components
type: 数据展示
order: 3
title: Collapse
subtitle: 折叠面板
---

折叠面板是一种对内容进行折叠和展开的容器。

## 使用场景

需要对复杂的内容进行分组和隐藏时，保证页面的整洁。

## API

### Collapse

| 属性 | 说明 | 类型 | 默认值 | 可选值 | 版本 |
| --- | --- | --- | --- | --- | --- |
| accordion | 是否手风琴模式 | boolean | false | true \| false | 1.0.0 |
| activeKey | 当前激活 tab 面板的 key | string[] \| string \| number[] \| number | - | - | 1.0.0 |
| bordered | 是否边框风格折叠面板是否边框风格折叠面板 | boolean | false | true \| false | 1.0.0 |
| defaultActiveKey | 初始化选中面板的 key | string[] \| string \| number[] \| number | - | - | 1.0.0 |
| expandIcon | 自定义切换图标 | (panelProps) => ReactNode | - | - | 1.0.0 |
| expandIconPosition | 设置切换图标位置 | string | `left` | `left` \| `right` | 1.0.0 |
| onChange           | 切换面板时的回调 | function | - | - | 1.0.0 |

### Collapse.Panel

| 属性     | 说明                           | 类型      | 默认值 | 可选值        | 版本   |
| -------- | ------------------------------ | --------- | ------ | ------------- | ------ |
| disabled | 禁用                           | boolean   | false  | true \| false | 1.0.0 |
| extra    | 自定义渲染每个面板右上角的内容     | ReactNode | -      | -             | 1.0.0 |
| header   | 折叠头内容                     | ReactNode | -      | -             | 1.0.0 |
| key      | 对应 Collapse 的 activeKey     | string \| number | -      | -             | 1.0.0 |
| title    | 对折叠头的描述性短语              | string           | -      | -             | 1.7.26 |

## Design Token

| 分类 | 组件token | 全局token | 默认值 |
| --- | --- | --- | --- |
| color | --kd-c-collapse-color-border-strong-2 | --kd-g-color-border-strong-2 | #d9d9d9 |
|  | --kd-c-collapse-header-color-text-primary | --kd-g-color-text-primary | #212121 |
|  | --kd-c-collapse-header-color-text-secondary | --kd-g-color-text-secondary | #666 |
|  | --kd-c-collapse-content-color-text-primary | --kd-g-color-text-primary | #212121 |
|  | --kd-c-collapse-color-disabled | - | raba(178, 178, 178, 1) |
|  | --kd-c-collapse-header-color-background | - | rgba(0, 0, 0, 0) |
|  | --kd-c-collapse-content-color-background | - | rgba(0, 0, 0, 0) |
|  | --kd-c-collapse-header-color-text-hover | - | #666666 |
| font | --kd-c-collapse-header-font-size | - | 16px |
|  | --kd-c-collapse-content-font-size | --kd-g-font-size-middle | 14px |
|  | --kd-c-collapse-icon-font-size | - | 16px |
| motion | --kd-c-collapse-motion-duration | --kd-g-duration | 0.3s |
| sizing | --kd-c-collapse-border-width | - | 1px |
|  | --kd-c-collapse-spacing-margin-right | - | 6px |
|  | --kd-c-collapse-header-spacing-padding | - | 8px 50px 8px 28px |
|  | --kd-c-collapse-content-bordered-spacing-padding | - | 12px |
|  | --kd-c-collapse-content-spacing-padding | - | 0 50px |
