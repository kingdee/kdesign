---
category: Components
type: 表单
order: 8
title: InputNumber
subtitle: 数值输入框
---

## 使用场景

用于录入跟数值相关的数据，如整数、小数、价位等，支持对数值进行格式化展示处理。 `(KDesign组件库中Input组件的属性在该组件中同样适用)`

## API

| 属性 | 说明 | 类型 | 默认值 | 可选值 | 版本 |
| --- | --- | --- | --- | --- | --- |
| decimalLength | 小数位数 | number | `-` | `-` | 1.0.0 |
| digitLength | 数字的位数 | number | `-` | `-` | 1.0.0 |
| formatter | 指定输入框展示值的格式 | function(value: string): string | `-` | `-` | 1.0.0 |
| max | 最大值 | string | `-` | `-` | 1.0.0 |
| maxMark | 最大值比较符 | string | `]` | `)` \| `]` | 1.0.0 |
| min | 最小值 | number | `-` | `-` | 1.0.0 |
| minMark | 最小值比较符 | string | `(` | `(` \| `[` | 1.0.0 |
| mustInPrecisionScope | 输入限制在精度范围 | boolean | `true` | `true`\|`false` | 1.0.0 |
| mustInScope | 输入内容是否必须在设定的数字范围内(不在范围内则不允许输入) | boolean | `false` | `true`\|`false` | 1.0.0 |
| numberMode | 数值模式。当数值超过Number能表示的最大值，会损失精度。同时 onChange 返回的 `e.target.value` 是 number 类型 | boolean | `false` | `true`\|`false` | 1.6.28 |
| showDecimalTailZero | 是否显示小数尾部 0 | boolean | `false` | `true`\|`false` | 1.0.0 |
| size | 控件大小 | string | `middle` | `small` `middle` `large` | 1.0.0 |
| stepOption | 步进器模式配置，设置后开启步进功能，可配置`type`(步进器类型)，`step`(步长)，`stepBtnClassName`(步进按钮样式)) | StepOption { type?: 'embed' \| 'base', step?: number, stepBtnClassName?: string } | `-` | `-` | 1.0.0 |
| symbol | 货币符号 | string | `-` | `-` | 1.0.0 |
| value | 当前值, 设置为 `number`类型，当数值超过Number能表示的最大值会损失精度 | string \| number | `-` | `-` | 1.0.0 |
| onChange | 输入框内容变化时的回调 | (event) => void | `-` | `-` | 1.0.0  |
| onKeyDown | 键盘事件回调 | (e: Event) => void | `-` | `-` | 1.7.24 |
| zeroShow | 为零是否显示 | boolean | `false` | `true` `false` | 1.0.0 |

## Design Token

| 分类 | 组件token | 全局token | 默认值 |
| --- | --- | --- | --- |
| color | --kd-c-input-number-color-border-strong | --kd-g-color-border-strong | #d9d9d9 |
|  | --kd-c-input-number-color-theme-5 | --kd-g-color-theme-5 | rgb(135, 173, 255) |
|  | --kd-c-input-number-color-text | - | #f6f7f9 |
|  | --kd-c-input-number-color-text-baseStep | --kd-g-color-text-secondary | #666 |
|  | --kd-c-input-number-color-text-baseStep-hover | --kd-g-color-text-secondary | #666 |
| sizing | --kd-c-input-number-sizing-height-small | - | 20px |
|  | --kd-c-input-number-sizing-height-middle | - | 30px |
|  | --kd-c-input-number-sizing-height-large | - | 36px |
