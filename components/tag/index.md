---
category: Components
type: 数据展示
order: 4
title: Tag
subtitle: 标签
---

标签是一种用于标记和选择的标识元素
## 使用场景
- 需要突出标记和选择时
- 视觉样式要与按钮严格区分

## API

| 属性 | 说明 | 类型 | 默认值 | 可选值 | 版本 |
| --- | --- | --- | --- | --- | --- |
| clickable | 是否可以点击 | boolean | false | - | 1.0.0 |
| closable | 是否可关闭, 只有当 `type` 为 `edit` 时才生效 | boolean | false | - | 1.0.0 |
| closeIcon | 关闭按钮 | ReactNode | - | `<Icon type="close">` | 1.0.0 |
| color | 标签色.自定义颜色值，比如 `#f00` ,只有 `type` 为 `attribute` 时才生效 | string | `process` | `process` `success` `warning` `error` `end` `expired` | 1.0.0 |
| disabled | 是否禁用, 只有当 `type` 为 `edit` 时才生效 | boolean | `false` | - | 1.0.0 |
| icon | 设置图标 | ReactNode | - | `<Icon type="tips">` | 1.0.0 |
| size | 标签大小 | string | `middle` | `small` `middle` `large` | 1.0.0 |
| type | 标签类型 | string | `status` | `status` `attribute` `text` `edit` | 1.0.0 |
| onClick | 点击时的回调,只有当 `clickable` 设置为 `true` 时才能触发 | function(e:Event) | - | - | 1.0.0 |
| onClose | 关闭时的回调 | function(e:Event) | - | - | 1.0.0 |

## Design Token

| 分类 | 组件token | 全局token | 默认值 |
| --- | --- | --- | --- |
| color | --kd-c-tag-color-process | --kd-g-color-ongoing | #276ff5 |
|  | --kd-c-tag-color-success | --kd-g-color-success | #1ba854 |
|  | --kd-c-tag-color-warning | --kd-g-color-warning | #ff991c |
|  | --kd-c-tag-color-error | --kd-g-color-error | #fb2323 |
|  | --kd-c-tag-color-end | --kd-g-color-end | #666 |
|  | --kd-c-tag-color-expired | --kd-g-color-disabled | #b2b2b2 |
|  | --kd-c-tag-color-disabled | --kd-g-color-disabled | #b2b2b2 |
|  | --kd-c-tag-attribute-color-text | --kd-g-color-white | #fff |
|  | --kd-c-tag-edit-color-border | --kd-g-color-text-placeholder | #ccc |
|  | --kd-c-tag-edit-color-text | --kd-g-color-text-primary | #212121 |
|  | --kd-c-tag-edit-color-border-hover | --kd-g-color-theme | #5582f3 |
|  | --kd-c-tag-edit-cloesWrapper-color-background-hover | --kd-g-color-theme | #5582f3 |
|  | --kd-c-tag-edit-cloesWrapper-color-text-hover | --kd-g-color-theme | #5582f3 |
|  | --kd-c-tag-edit-color-background-disabled | --kd-g-color-background-contain-disabled | #f5f5f5 |
|  | --kd-c-tag-edit-color-background-disabled | --kd-g-color-border-strong | #d9d9d9 |
|  | --kd-c-tag-edit-color-text-disabled | --kd-g-color-border-strong | #d9d9d9 |
| font | --kd-c-tag-font-size-small | --kd-g-font-size-small | 12px |
|  | --kd-c-tag-font-size-middle | --kd-g-font-size-small | 12px |
|  | --kd-c-tag-font-size-large | --kd-g-font-size-middle | 14px |
| motion | --kd-c-tag-motion-duration | --kd-g-duration | 0.3s |
| radius | --kd-c-tag-radius-border | - | 10px |
| sizing | --kd-c-tag-sizing-height-small | - | 20px |
|  | --kd-c-tag-sizing-height-middle | - | 20px |
|  | --kd-c-tag-sizing-height-large | - | 24px |
|  | --kd-c-tag-sizing-max-width | - | - |
|  | --kd-c-tag-sizing-min-width | - | - |
| spacing | --kd-c-tag-spacing-padding-horizontal-small | - | 6px |
|  | --kd-c-tag-spacing-padding-horizontal-middle | - | 7px |
|  | --kd-c-tag-spacing-padding-horizontal-large | - | 8px |
