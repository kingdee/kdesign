---
category: Components
type: 基础
title: Clipboard
subtitle: 剪贴板
---

剪贴板是一种用于内容复制或剪贴的组件。

## 使用场景

需要复制或剪贴文本或元素内容时。

## API

| 属性 | 说明 | 类型 | 默认值 | 可选值 | 版本 |
| --- | --- | --- | --- | --- | --- |
| action | 剪贴板动作 | string | `copy` | `copy` `cut` | 1.7.30 |
| content | 剪贴内容（与 `target` 属性同时存在时，优先级更高，并且忽略 `cut` 动作） | string | `-` | `-` | 1.7.30 |
| className | 样式名 | string | `-` | `-` | 1.7.30 |
| disabled | 剪贴板禁用状态 | boolean | `false` | `true` `false` | 1.7.30 |
| icon | 自定义图标 | ReactNode, null | - | - | 1.7.30 |
| size | 剪贴板尺寸 | string | `middle` | `small` `middle` `large` | 1.7.30 |
| style | 剪贴板样式 | CSSProperties | - | - | 1.7.30 |
| target | 剪贴目标（可以是元素、元素 id 或 class） | HTMLElement, string | `-` | `-` | 1.7.30 |
| onError | 剪贴失败时的回调 | (error: Error) => void | `-` | `-` | 1.7.30 |
| onSuccess | 剪贴成功时的回调 | (content: string) => void | `-` | `-` | 1.7.30 |
