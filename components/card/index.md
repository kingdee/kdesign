---
category: Components
type: 数据展示
order: 2
title: Card
subtitle: 卡片
---

通用卡片容器。

## 何时使用

最基础的卡片容器，可承载文字、列表、图片、段落，常用于后台概览页面。

## API

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| actions | 卡片操作组，位置在卡片底部 | Array&lt;ReactNode> | - | 1.0.0 |
| avatar | 头像配置，avatar有值时，只显示avatar, 不显示title | [Avatar](#Avatar) | - | 1.0.0 |
| bodyStyle | 内容区域自定义样式 | CSSProperties | - | 1.0.0 |
| checkboxProps | 选择框的属性对象 | [CheckboxProps](/components/checkbox/#API) | - | 1.0.0 |
| headStyle | 自定义标题区域样式 | CSSProperties | - | 1.0.0 |
| hoverable | 鼠标移过时可浮起 | boolean | false | 1.0.0 |
| selectable | 是否可被选中 | boolean | false | 1.0.0 |
| tags | 标签组，位置在标题下面 | Array&lt;ReactNode> | - | 1.0.0 |
| title | 卡片标题 | ReactNode | - | 1.0.0 |

### Avatar
```js
{
  src: string, // 头像地址
  title?: string, // 标题
  square?: boolean, // 是否是方块形
  description?: string, // 描述
}
```