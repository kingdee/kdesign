---
category: Components
order: 0
type: 基础
title: Button
subtitle: 按钮
---

按钮是一种用于触发操作的组件。

## 使用场景

需要触发一个操作时。

## API

| 属性 | 说明 | 类型 | 默认值 | 可选值 | 版本 |
| --- | --- | --- | --- | --- | --- |
| block | 开启该属性按钮将撑满父元素 | boolean | `false` | `true` `false` | 1.0.0 |
| bordered | 是否带边框 | boolean | `true` | `true` `false` | 1.0.0 |
| disabled | 按钮禁用状态 | boolean | `false` | `true` `false` | 1.0.0 |
| ghost | 幽灵属性，使按钮背景透明 | boolean | `false` | `true` `false` | 1.0.0 |
| loading | 按钮加载状态（加载中的按钮将不能触发点击事件） | boolean | `false` | `true` `false` | 1.0.0 |
| shape | 按钮形状 | string | `''` | `''` `circle` `round` | 1.0.0 |
| size | 按钮尺寸 | string | `middle` | `small` `middle` `large` | 1.0.0 |
| type | 按钮类型 | string | `second` | `second` `primary` `ghost` `text` | 1.0.0 |
| onClick | 点击按钮时的回调 | (event) => void | `-` | `-` | 1.0.0 |
| htmlType | 设置 button 原生的 type 值 | string | `-` | `submit` `button` `reset` | 1.0.0 |

## Design Token

| 分类 | 组件token | 全局token | 默认值 |
| --- | --- | --- | --- |
| color | --kd-c-button-primary-color-background | --kd-g-color-theme | #5582f3 |
|  | --kd-c-button-primary-color-border | --kd-g-color-theme | #5582f3 |
|  | --kd-c-button-primary-color-text | --kd-g-color-white | #fff |
|  | --kd-c-button-primary-color-background-hover | --kd-g-color-theme-5 | rgb(135, 173, 255) |
|  | --kd-c-button-primary-color-border-hover | --kd-g-color-theme-5 | rgb(135, 173, 255) |
|  | --kd-c-button-primary-color-background-active | --kd-g-color-theme-7 | rgb(55, 92, 202) |
|  | --kd-c-button-primary-color-border-active | --kd-g-color-theme | #5582f3 |
|  | --kd-c-button-primary-color-background-disabled | --kd-g-color-theme-3 | rgb(227, 238, 255) |
|  | --kd-c-button-primary-color-border-disabled | --kd-g-color-theme-3 | rgb(227, 238, 255) |
|  | --kd-c-button-ghost-color-background | - | transparent |
|  | --kd-c-button-ghost-color-border | --kd-g-color-border-strong | #d9d9d9 |
|  | --kd-c-button-ghost-color-text | --kd-g-color-text-secondary | #666 |
|  | --kd-c-button-ghost-color-border-hover | --kd-g-color-theme | #5582f3 |
|  | --kd-c-button-ghost-color-text-hover | --kd-g-color-theme | #5582f3 |
|  | --kd-c-button-ghost-color-border-active | --kd-g-color-theme-7 | rgb(55, 92, 202) |
|  | --kd-c-button-ghost-color-background-disabled | --kd-g-color-background-contain-disabled | #f5f5f5 |
|  | --kd-c-button-ghost-color-text-active | --kd-g-color-theme-7 | rgb(55, 92, 202) |
|  | --kd-c-button-ghost-color-border-disabled | --kd-g-color-disabled | #b2b2b2 |
|  | --kd-c-button-ghost-color-text-disabled | --kd-g-color-disabled | #b2b2b2 |
|  | --kd-c-button-second-color-background | --kd-g-color-background-3 | rgba(255, 255, 255, 0.65) |
|  | --kd-c-button-second-color-border | --kd-g-color-border-strong-3 | rgba(217, 217, 217, 0.65) |
|  | --kd-c-button-second-color-text | --kd-g-color-text-secondary-3 | rgba(102, 102, 102, 0.65) |
|  | --kd-c-button-second-color-background-hover | --kd-g-color-white | #fff |
|  | --kd-c-button-second-color-border-hover | --kd-g-color-border-strong | #d9d9d9 |
|  | --kd-c-button-second-color-text-hover | --kd-g-color-text-secondary | #666 |
|  | --kd-c-button-second-color-background-active | --kd-g-color-white | #fff |
|  | --kd-c-button-second-color-border-active | --kd-g-color-border-strong | #d9d9d9 |
|  | --kd-c-button-second-color-text-active | --kd-g-color-text-secondary | #666 |
|  | --kd-c-button-second-color-background-disabled | --kd-g-color-background-3 | rgba(255, 255, 255, 0.65) |
|  | --kd-c-button-second-color-border-disabled | --kd-g-color-text-secondary-3 | rgba(102, 102, 102, 0.65) |
|  | --kd-c-button-second-color-text-disabled | --kd-g-color-text-secondary-3 | rgba(102, 102, 102, 0.65) |
|  | --kd-c-button-text-color-text | --kd-g-color-theme | #5582f3 |
|  | --kd-c-button-text-color-text-hover | --kd-g-color-theme-5 | rgb(135, 173, 255) |
|  | --kd-c-button-text-color-text-active | --kd-g-color-theme-7 | rgb(55, 92, 202) |
|  | --kd-c-button-text-color-text-disabled | --kd-g-color-disabled | #b2b2b2 |
|  | --kd-c-button-color-background-disabled | --kd-g-color-background-contain-disabled | #f5f5f5 |
|  | --kd-c-button-color-border-disabled | --kd-g-color-border-strong | #d9d9d9 |
|  | --kd-c-button-text-color-disabled | --kd-g-color-white | #fff |
|  | --kd-c-button-danger-color-background | --kd-g-color-error | #fb2323 |
|  | --kd-c-button-danger-color-border | --kd-g-color-error | #fb2323 |
|  | --kd-c-button-danger-color-text | --kd-g-color-white | #fff |
|  | --kd-c-button-text-color-loading | --kd-g-color-theme | #5582f3 |
|  | --kd-c-button-primary-color-text-loading | --kd-g-color-white | #fff |
|  | --kd-c-button-background-ghost-color-text | --kd-g-color-theme | #5582f3 |
|  | --kd-c-button-background-ghost-color-text-hover | --kd-g-color-white | #fff |
| duration | --kd-c-button-motion-timing-function | - | cubic-bezier(0.075, 0.82, 0.165, 1) |
|  | --kd-c-button-motion-duration-fade | --kd-g-duration-slowly | 0.4s |
|  | --kd-c-button-motion-duration-wave | --kd-g-duration-quickly | 0.2s |
| font | --kd-c-button-font-weight | --kd-g-font-weight | 400 |
|  | --kd-c-button-font-size-small | --kd-g-font-size-small | 12px |
|  | --kd-c-button-font-size-middle | --kd-g-font-size-small | 12px |
|  | --kd-c-button-font-size-large | --kd-g-font-size-large | 16px |
| radius | --kd-c-button-radius-border | --kd-g-radius-border | 2px |
| sizing | --kd-c-button-sizing-border | - | 1px |
|  | --kd-c-button-sizing-height-small | - | 24px |
|  | --kd-c-button-sizing-min-height-small | - | 60px |
|  | --kd-c-button-sizing-height-middle | - | 28px |
|  | --kd-c-button-sizing-min-height-middle | - | 60px |
|  | --kd-c-button-sizing-height-large | - | 32px |
|  | --kd-c-button-sizing-min-height-large | - | 80px |
| spacing | --kd-c-button-spacing-padding-vertical-small | - | 3px |
|  | --kd-c-button-spacing-padding-horizontal-small | - | 8px |
|  | --kd-c-button-spacing-padding-vertical-middle | - | 5px |
|  | --kd-c-button-spacing-padding-horizontal-middle | - | 8px |
|  | --kd-c-button-spacing-padding-vertical-large | - | 6px |
|  | --kd-c-button-spacing-padding-horizontal-large | - | 8px |
