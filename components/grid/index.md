---
category: Components
type: 布局
order: 1
title: Grid
subtitle: 自适应栅格
---

## 自适应栅格

自适应栅格可以根据屏幕尺寸对内容进行自适应排布

- 自适应栅格由三个元素组成：边距，列和槽。

- 换算方式：列宽 = （屏幕尺寸 - 留白区 - 槽数*槽宽 ）/ 列数

## API
### Row

| 成员 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| align | 垂直对齐 | `top` \| `middle` \| `bottom` | `top` \| `stretch` | 1.0.0 |
| gutter | 间隔，支持像素值或响应式的对象两种写法来设置水平间隔 { xs: 8, sm: 16, md: 24}。或者使用数组形式同时设置 `[水平间距, 垂直间距]` | number \| object \| array | 12 | 1.0.0 |
| justify | 水平对齐 | `start` \| `end` \| `center` \| `space-around` \| `space-between` | `start` | 1.0.0 |
| wrap | 自动换行 | boolean | true | 1.0.0 |

### Col

| 成员 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| flex | flex 属性 | string \| number | - | 1.0.0 |
| offset | 栅格左边的间隔数，间隔内不允许有栅格 | number | 0 | 1.0.0 |
| order | 栅格排序 | number | 0 | 1.0.0 |
| pull | 向左移动格数 | number | 0 | 1.0.0 |
| push | 向右移动格数 | number | 0 | 1.0.0 |
| span | 占位格数，为 0 时相当于 `display: none` | number | - | 1.0.0 |
| xs | `屏幕 < 600px` 响应式栅格，支持栅格数或一个包含其他属性的对象 | number \| object | - | 1.0.0 |
| sm | `屏幕 ≥ 600px` 响应式栅格，支持栅格数或一个包含其他属性的对象 | number \| object | - | 1.0.0 |
| md | `屏幕 ≥ 1024px` 响应式栅格，支持栅格数或一个包含其他属性的对象 | number \| object | - | 1.0.0 |
| lg | `屏幕 ≥ 1280px` 响应式栅格，支持栅格数或一个包含其他属性的对象 | number \| object | - | 1.0.0 |
| xl | `屏幕 > 1920px` 响应式栅格，支持栅格数或一个包含其他属性的对象 | number \| object | - | 1.0.0 |
