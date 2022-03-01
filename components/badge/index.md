---
category: Components
type: 数据展示
title: Badge
subtitle: 徽标数
order: 1
---
徽标是一种用于引导用户处理的组件，常见于图标或头像右上角。包含 2 种类型：
- 数字徽标
- 状态徽标

## 使用场景

需要引导用户关注内容时。
## API

| 属性 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- | --- |
| color | 自定义小圆点的颜色 | string | - | 1.0.0 |
| count | 展示的数字，大于 overflowCount 时显示为 `${overflowCount}+`，为 0 时隐藏 | ReactNode | - | 1.0.0 |
| dot | 不展示数字，只有一个小红点 | boolean | false | 1.0.0 |
| offset | 设置状态点的位置偏移 | \[number, number] | - | 1.0.0 |
| overflowCount | 展示封顶的数字值 | number | 99 | 1.0.0 |
| showZero | 当数值为 0 时，是否展示 Badge | boolean | false | 1.0.0 |
| size | 在设置了 `count` 的前提下有效，设置小圆点的大小 | `default` \| `small` | - | 1.0.0 |
| status | 设置 Badge 为状态点 | `success` \| `processing` \| `default` \| `error` \| `warning` | - | 1.0.0 |
| text | 在设置了 `status` 的前提下有效，设置状态点的文本 | ReactNode | - | 1.0.0 |
| title | 设置鼠标放在状态点上时显示的文字 | string | - | 1.0.0 |

## Design Token

| 分类 | 组件token | 全局token | 默认值 |
| --- | --- | --- | --- |
| color | --kd-c-badge-color-background | - | #fb2323 |
|  | --kd-c-badge-color | --kd-g-color-background | #fff |
|  | --kd-c-badge-color | --kd-g-color-text-primary | #212121 |
|  | --kd-c-badge-color-success | --kd-g-color-success | #1ba854 |
|  | --kd-c-badge-color-ongoing | --kd-g-color-ongoing | #276ff5 |
|  | --kd-c-badge-color-warning | --kd-g-color-warning | #ff991c |
|  | --kd-c-badge-color-error | --kd-g-color-error | #fb2323 |
| font | --kd-c-badge-font-weight | - | 400 |
|  | --kd-c-badge-font-size-base | --kd-g-font-size-middle | 14px |
|  | --kd-c-badge-font-size-small | --kd-g-font-size-small | 12px |
| sizing | --kd-c-badge-sizing-base | - | 16px |
|  | --kd-c-badge-sizing-small | - | 14px |
|  | --kd-c-badge-sizing-dot | - | 8px |
|  | --kd-c-badge-sizing-status | - | 8px |
