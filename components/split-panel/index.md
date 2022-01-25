---
category: Components
type: 数据展示
order: 8
title: SplitPanel
subtitle: 分割容器
---

分割容器是一种分割页面内容的容器。
## 何时使用

需要快速查看页面内容中的对比信息或关联信息时。

## API

| 属性 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| canFold | 折叠功能是否启用 | boolean | true | 1.0.0 |
| defaultSplit | 面板默认分割比例，可以是0-1代表百分比，也可以传数字`10`或`10px`则代表具体的像素值 | number\|string | 0.5 | 1.0.0 |
| disabled | 是否禁用分割线拖拽 | boolean | false | 1.0.0 |
| firstSlot | 分割面板第一个容器的内容，在`horizontal`模式下为left区域，在`vertical`模式下为top区域 | React.ReactNode |  | 1.0.0 |
| lineStyle | 自定义分割线样式 | ((mode: 'horzontal'\|'vertical') => React.CSSProperties)\|React.CSSProperties |  | 1.0.0 |
| mode | 分割模式，可选为水平模式`horizontal`或垂直模式`vertical` | string | `horizontal` | 1.0.0 |
| min | 最小阈值（即第一个面板的最小宽度），同`defaultSplit`，传0-1代表百分比，传数字`10`或`10px`则代表具体的像素值  | number\|string | 0 | 1.0.0 |
| max | 最大阈值（即第二个面板的最小宽度），同`defaultSplit`，传0-1代表百分比，传数字`10`或`10px`则代表具体的像素值 |  number\|string | 0 | 1.0.0 |
| secondSlot | 分割面板第二个容器的内容，在`horizontal`模式下为right区域，在`vertical`模式下为bottom区域 | React.ReactNode |  | 1.0.0 |
| onFold | 分割线中的折叠icon点击的事件回调，其中`direction`为折叠方向（top\|bottom\|left\|right） | (e: React.MouseEvent, direction: FoldDirection) => void |  | 1.0.0 |
| onMoving | 分割线在拖拽中的事件回调 | (e: MouseEvent) => void |  | 1.0.0 |
| onMoveStart | 分割线在开始拖拽时的事件回调 | (e: React.MouseEvent) => void |  | 1.0.0 |
| onMoveEnd | 分割线在拖拽结束时的事件回调| (e: MouseEvent) => void |  | 1.0.0 |
