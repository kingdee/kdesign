---
category: Components
type: 反馈
title: Watermark
subtitle: 水印
---

## 使用场景

给指定页面区域添加水印。

## API

| 属性 | 说明 | 类型 | 默认值 | 可选值 | 版本 |
| ---- | ---- | ---- | ------ | ------ | ---- |
| width | 水印的宽度 | number | 100 | - | 1.0.0 |
| height | 水印的高度 | number | - | - | 1.0.0 |
| rotate | 水印绘制时，旋转的角度，单位 ° | number | -20 | - | 1.0.0 |
| zIndex | 追加的水印元素的 z-index | number | 1 | - | 1.0.0 |
| image | 图片源 | string | - | - | 1.0.0 |
| content | 水印文字内容 | `string | string[]` | - | - | 1.0.0 |
| fontStyle | 文字样式 | [Font](#Font) | [Font](#Font) | - | 1.0.0 |
| gap | 水印之间的间距 | `[number, number]` | [100, 100] | - | 1.0.0 |
| offset | 水印距离容器左上角的偏移量 | `[number, number]` | [0, 0] | - | 1.0.0 |

### Font

| 属性 | 说明 | 类型 | 默认值 | 可选值 | 版本 |
| ---- | ---- | ---- | ------ | ------ | ---- |
| color | 文字颜色 | string | rgba(0, 0, 0, 0.15) | - | 1.0.0 |
| fontFamily | 字体 | string | sans-serif | - | 1.0.0 |
| fontSize | 字体大小 | string | 16px | - | 1.0.0 |
| fontWeight | 字体粗细 | `number | string` | normal | - | 1.0.0 |