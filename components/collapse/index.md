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
| activeKey | 当前激活 tab 面板的 key | string[] \| string \| number[] \| number | 默认无，accordion 模式下默认第一个元素 | - | 1.0.0 |
| bordered | 是否边框风格折叠面板是否边框风格折叠面板 | boolean | false | true \| false | 1.0.0 |
| defaultActiveKey | 初始化选中面板的 key | string[] \| string \| number[] \| number | - | - | 1.0.0 |
| expandIcon | 自定义切换图标 | (panelProps) => ReactNode | - | - | 1.0.0 |
| expandIconPosition | 设置切换图标位置 | string | `left` | `left` \| `right` | 1.0.0 |
| onChange | 切换面板时的回调 | function | - | - | 1.0.0 |

### Collapse.Panel

| 属性     | 说明                           | 类型      | 默认值 | 可选值        | 版本   |
| -------- | ------------------------------ | --------- | ------ | ------------- | ------ |
| disabled | 禁用                           | boolean   | false  | true \| false | 1.0.0 |
| extra    | 自定义渲染每个面板右上角的内容 | ReactNode | -      | -             | 1.0.0 |
| header   | 折叠头内容                     | ReactNode | -      | -             | 1.0.0 |
| key      | 对应 Collapse 的 activeKey     | ReactNode | -      | -             | 1.0.0 |
