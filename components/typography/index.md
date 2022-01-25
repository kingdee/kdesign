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

