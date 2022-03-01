---
category: Components
type: 基础
order: 4
title: Typography
subtitle: 排版
---
## 使用场景

- 当需要展示标题、段落、列表内容时使用，如文章/博客/日志的文本样式。

## API

### Typography.Text

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| code | 添加代码样式 | boolean | false | 1.0.0 |
| delete | 添加删除线样式 | boolean | false | 1.0.0 |
| disabled | 禁用文本 | boolean | false | 1.0.0 |
| keyboard | 添加键盘样式 | boolean | false | 1.0.0 |
| mark | 添加标记样式 | boolean | false | 1.0.0 |
| onClick | 点击 Text 时的回调 | (event) => void | - | 1.0.0 |
| strong | 是否加粗 | boolean | false | 1.0.0 |
| italic | 是否斜体 | boolean | false | 1.0.0 |
| type | 文本类型 | `second` \| `success` \| `warning` \| `danger` \| `assist` | - | 1.0.0 |
| underline | 添加下划线样式 | boolean | false | 1.0.0 |

### Typography.Title

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| code | 添加代码样式 | boolean | false | 1.0.0 |
| delete | 添加删除线样式 | boolean | false | 1.0.0 |
| disabled | 禁用文本 | boolean | false | 1.0.0 |
| level | 重要程度，相当于 `h1`、`h2`、`h3`、`h4`、`h5` | number: 1, 2, 3, 4, 5 | 1 | 1.0.0 |
| mark | 添加标记样式 | boolean | false | 1.0.0 |
| onClick | 点击 Title 时的回调 | (event) => void | - | 1.0.0 |
| italic | 是否斜体 | boolean | false | 1.0.0 |
| type | 文本类型 | `second` \| `success` \| `warning` \| `danger` \| `assist` | - | 1.0.0 |
| underline | 添加下划线样式 | boolean | false | 1.0.0 |

### Typography.Paragraph

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| code | 添加代码样式 | boolean | false | 1.0.0 |
| delete | 添加删除线样式 | boolean | false | 1.0.0 |
| disabled | 禁用文本 | boolean | false | 1.0.0 |
| mark | 添加标记样式 | boolean | false | 1.0.0 |
| onClick | 点击 Paragraph 时的回调 | (event) => void | - | 1.0.0 |
| strong | 是否加粗 | boolean | false | 1.0.0 |
| italic | 是否斜体 | boolean | false | 1.0.0 |
| type | 文本类型 | `second` \| `success` \| `warning` \| `danger` \| `assist` | - | 1.0.0 |
| underline | 添加下划线样式 | boolean | false | 1.0.0 |

## Design Token

| 分类 | 组件token | 全局token | 默认值 |
| --- | --- | --- | --- |
| color | --kd-c-typography-title-color-text | - | #276ff5 |
|  | --kd-c-typography-color-text-primary | --kd-g-color-text-primary | #212121 |
|  | --kd-c-typography-color-text-secondary | --kd-g-color-text-secondary | #666 |
|  | --kd-c-typography-color-text-third | --kd-g-color-text-third | #999 |
|  | --kd-c-typography-color-warning | --kd-g-color-warning | #ff991c |
|  | --kd-c-typography-color-error | --kd-g-color-error | #fb2323 |
|  | --kd-c-typography-color-success | --kd-g-color-success | #1ba854 |
|  | --kd-c-typography-color-disabled | --kd-g-color-disabled | #b2b2b2 |
|  | --kd-c-typography-color-text-link | --kd-g-color-text-link | #0e5fd8 |
|  | --kd-c-typography-color-text-link-hover | --kd-g-color-text-link-hover | #3987ed |
|  | --kd-c-typography-color-text-link-active | --kd-g-color-text-link-active | #0041b0 |
| font | --kd-c-typography-title-font-weight | - | 600 |
|  | --kd-c-typography-font-size-1 | - | 40px |
|  | --kd-c-typography-font-size-2 | - | 28px |
|  | --kd-c-typography-font-size-3 | - | 18px |
| motion | --kd-c-typography-motion-duration | --kd-g-duration | 0.3s |
| sizing | --kd-c-typography-sizing-width-max | - | 830px |
| spacing | --kd-c-typography-title-spacing-margin-top | - | 1.2em |
|  | --kd-c-typography-title-spacing-margin-bottom | - | 0.5em |
|  | --kd-c-typography-paragraph-spacing-margin-bottom | - | 24px |
|  | --kd-c-typography-spacing-margin-bottom | - | 80px |
|  | --kd-c-typography-spacing-margin-bottom-1 | - | 12px |
|  | --kd-c-typography-spacing-margin-bottom-2 | - | 24px |
|  | --kd-c-typography-spacing-margin-bottom-3 | - | 12px |
