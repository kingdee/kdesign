---
category: Components
type: 表单
order: 10
title: Rate
subtitle: 评分
---

单选是一种在一组互斥的选项中进行选择的组件。

## 使用场景

需要在一组互斥的选项进行选择时使用。

## API

| 属性 | 说明 | 类型 | 默认值 | 可选值 | 版本 |
| --- | --- | --- | --- | --- | --- |
| activeIcon | 自定义选中时的图标 | ReactNode | (RateProps) => ReactNode | `<Icon type="star">` | 1.0.0 |
| allowHalf | 是否允许半选 | boolean | `true` | `true` `false` | 1.0.0 |
| color | 选中时 icon 颜色 | string | `-` | `-` | 1.0.0 |
| className | 自定义样式类名 | string | `-` | `-` | 1.0.0 |
| count | star 总数 | number | `5` | `-` | 1.0.0 |
| defaultValue | 默认选中的星星数 | number | `0` | `-` | 1.0.0 |
| disabled | 只读，无法选择 | boolean | `false` | `true` `false` | 1.0.0 |
| icon | 自定义显示的 icon | ReactNode | `(RateProps) => ReactNode` | `<Icon type="star">` | 1.0.0 |
| onlyActiveCurrent | 仅选中当前图标 | boolean | `false` | `true` `false` | 1.0.0 |
| size | 评分尺寸（large/middle/small） | string | `middle` | `large` `middle` `small` | 1.0.0 |
| style | 自定义样式 | CSSProperties | `-` | `-` | 1.0.0 |
| value | 当前选中的星星数，受控值 | number | `0` | `-` | 1.0.0 |
| onBlur | 失去焦点时的回调 | function() | `-` | `-` | 1.0.0 |
| onChange | 选择时的回调 | function(value: number) | `-` | `-` | 1.0.0 |
| onHoverChange | 鼠标 hover 时回调 | function(value: number) | `-` | `-` | 1.0.0 |
| onFocus | 获取焦点时的回调 | function() | `-` | `-` | 1.0.0 |

## Design Token

| 分类 | 组件token | 全局token | 默认值 |
| --- | --- | --- | --- |
| color | --kd-c-rate-color-text-selected | - | #FEC104 |
|  | --kd-c-rate-color-text-not-selected | - | #E5E5E5 |
| font | --kd-c-rate-font-size-small | - | 12px |
|  | --kd-c-rate-font-size-middle | - | 16px |
|  | --kd-c-rate-font-size-large | - | 20px |
| motion | --kd-c-rate-motion-duration | --kd-g-duration | 0.3s |
| spacing | --kd-c-rate-spacing-margin-right | - | 8px |
