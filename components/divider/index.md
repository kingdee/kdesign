---
category: Components
type: 布局
title: Divider
subtitle: 分割线
---

分割线是一种用于在界面中创建水平或垂直分隔元素的线条

## 使用场景

• 当用户需要对内容进行划分时

## API

| 属性 | 说明 | 类型 | 默认值 | 可选值 | 版本 |
| --- | --- | --- | --- | --- | --- |
| borderStyle | 分割线样式 | string | `solid` | `solid` \| `dashed` \| `dotted` | 2.0.0 |
| children | 嵌套的标题内容 | ReactNode | - | - | 2.0.0 |
| className | 分割线样式类名 | string | - | - | 2.0.0 |
| orientation | 分割线标题的位置 | string | `left` | `left` \| `center` \| `right` | 2.0.0 |
| orientationMargin | 标题和最近 left/right 边框之间的距离，去除了分割线，同时 orientation 必须为 left 或 right。如果传入 string 类型的数字且不带单位，默认单位是 px | string \| number | - | - | 2.0.0 |
| style | 分割线样式对象 | CSSProperties | - | - | 2.0.0 |
| type | 水平还是垂直类型 | string | `horizontal` | `horizontal` \| `vertical` | 2.0.0 |


## Design Token

| 分类 | 组件token | 全局token | 默认值 |
| --- | --- | --- | --- |
| color | --kd-c-divider-color-text | --kd-g-color-text-primary | #212121 |
| font | --kd-c-divider-font-size | --kd-g-font-size-small | 12px |
| spacing | --kd-c-divider-spacing-padding-horizontal | - | 0px |
