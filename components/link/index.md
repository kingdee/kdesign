---
category: Components
type: 基础
title: Link
subtitle: 链接
---

文本链接是一种跳转至其它页面或当前页面指定位置的组件。
## 使用场景

在以下情况下使用文本链接
- 需要跳转到其他页面时。
- 需要作为锚点跳转到当前页面指定位置时。

在以下情况下请勿使用文本链接
- 需要触发操作时，请使用[按钮](/components/button/)

## API

| 属性 | 说明 | 类型 | 默认值 | 可选值 | 版本 |
| --- | --- | --- | --- | --- | --- |
| disabled | 链接禁用状态 | boolean | `false` | `true` `false` | 1.0.0 |
| href | 点击跳转的地址 | string | - | - | 1.0.0 |
| onClick | 点击链接时的回调 | (event) => void | `-` | `-` | 1.0.0 |
| prefix | 带有前缀图标的 link | string / ReactNode | `-` | `-` | 1.0.0 |
| underscore | 下划线 | boolean | `false` | `true` `false` | 1.0.0 |
| size | 链接尺寸 | string | `middle` | `small` `middle` `large` | 1.0.0 |
| suffix | 带有后缀图标的 link | string / ReactNode | `-` | `-` | 1.0.0 |
| target | 相当于 a 链接的 target 属性，href 存在时生效 | string | `-` | `-` | 1.0.0 |

## Design Token

| 分类 | 组件token | 全局token | 默认值 |
| --- | --- | --- | --- |
| color | --kd-c-link-color-text | --kd-g-color-text-link | #0e5fd8 |
|  | --kd-c-link-color-text-link-hover | - | #87A9FF |
|  | --kd-c-link-color-text-link-active | - | #3761CA |
|  | --kd-c-link-color-text-link-disabled | - | #9EBFEF |
| font | --kd-c-link-font-weight | --kd-g-font-weight | 400 |
|  | --kd-c-link-font-size-small | --kd-g-font-size-small | 12px |
|  | --kd-c-link-font-size-middle | --kd-g-font-size-middle | 14px |
|  | --kd-c-link-font-size-large | --kd-g-font-size-large | 16px |
| sizing | --kd-c-link-sizing-height-small | - | 18px |
|  | --kd-c-link-sizing-height-middle | - | 21px |
|  | --kd-c-link-sizing-height-large | - | 24px |
| spacing | --kd-c-link-prefix-horizontal | - | 4px |
|  | --kd-c-link-suffix-horizontal | - | 4px |
