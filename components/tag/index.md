---
category: Components
type: 导航
order: 5
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