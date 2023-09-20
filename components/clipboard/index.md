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

| 属性      | 说明             | 类型                        | 默认值   | 可选值                   | 版本   |
| --------- | ---------------- | --------------------------- | -------- | ------------------------ | ------ |
| action    | 剪贴板动作       | string                      | `copy`   | `copy` `cut`             | 1.7.37 |
| content   | 剪贴内容         | string                      | `-`      | `-`                      | 1.7.37 |
| className | 样式名           | string                      | `-`      | `-`                      | 1.7.37 |
| disabled  | 剪贴板禁用状态   | boolean                     | `false`  | `true` `false`           | 1.7.37 |
| icon      | 自定义图标       | ReactNode \| false          | -        | -                        | 1.7.37 |
| size      | 剪贴板尺寸       | string                      | `middle` | `small` `middle` `large` | 1.7.37 |
| style     | 剪贴板样式       | CSSProperties               | -        | -                        | 1.7.37 |
| target    | 剪贴目标         | () => HTMLElement \| string | `-`      | `-`                      | 1.7.37 |
| onError   | 剪贴失败时的回调 | (error: Error) => void      | `-`      | `-`                      | 1.7.37 |
| onSuccess | 剪贴成功时的回调 | (content: string) => void   | `-`      | `-`                      | 1.7.37 |
