---
category: Components
type: 录入
order: 13
title: Stepper
subtitle: 步进器
---

步进器是一种在指定的数值范围内增减步进值的组件。

## 使用场景

- 数值范围较大或无上下限制的情况下

- 需要强化用户键入数字时，可采用嵌入式步进器

## API

| 属性 | 说明 | 类型 | 默认值 | 可选值 | 版本 |
| --- | --- | --- | --- | --- | --- |
| decimalLength | 小数位数 | number | `-` | `-` | 1.0.0 |
| digitLength | 数字的位数 | number | `-` | `-` | 1.0.0 |
| formatter | 指定输入框展示值的格式 | function(value: string): string | `-` | `-` | 1.0.0 |
| max | 最大值 | number | `-` | `-` | 1.0.0 |
| maxMark | 最大值比较符 | string | `]` | `)` \| `]` | 1.0.0 |
| min | 最小值 | number | `-` | `-` | 1.0.0 |
| minMark | 最小值比较符 | string | `(` | `(` \| `[` | 1.0.0 |
| mustInPrecisionScope | 输入限制在精度范围 | boolean | `true` | `true`\|`false` | 1.0.0 |
| mustInScope | 输入内容是否必须在设定的数字范围内(不在范围内则不允许输入) | boolean | `false` | `true`\|`false` | 1.0.0 |
| onChange | 输入框内容变化时的回调 | (event) => void | `-` | `-` | 1.0.0 |
| showDecimalTailZero | 是否显示小数尾部 0 | boolean | `false` | `true`\|`false` | 1.0.0 |
| step | 步长 | number | `1` | `-` | 1.0.0 |
| stepBtnClassName | 步进按钮样式 | string | `-` | `-` | 1.0.0 |
| symbol | 货币符号 | string | `-` | `-` | 1.0.0 |
| type | 步进器类型 | string | `base` | `embed` `base` | 1.0.0 |
| zeroShow | 为零是否显示 | boolean | `false` | `true` `false` | 1.0.0 |


## Design Token

| 分类 | 组件token | 全局token | 默认值 |
| --- | --- | --- | --- |
| color | --kd-c-stepper-icon-color | --kd-g-color-text-secondary | #666 |
|  | --kd-c-stepper-icon-color-hover | --kd-g-color-theme-5 | rgb(135, 173, 255) |
|  | --kd-c-stepper-color-border-strong | --kd-g-color-border-strong | #d9d9d9 |
|  | --kd-c-stepper-embed-icon-color-background | - | #f6f7f9 |
| sizing | --kd-c-stepper-input-small-sizing-height | - | 20px |
|  | --kd-c-stepper-input-middle-sizing-height | - | 30px |
|  | --kd-c-stepper-input-large-sizing-height | - | 36px |
| spacing | --kd-c-stepper-input-spacing-padding-horizontal| - | 9px |
| motion | --kd-c-stepper-motion-duration | --kd-g-color-duration | 0.3s |
