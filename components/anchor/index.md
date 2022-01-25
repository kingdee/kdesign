---
category: Components
type: 导航
order: 0
title: Anchor
subtitle: 锚点
---

锚点是一种用于跳转到页面指定位置的组件，分为 2 种类型:
- 纵向锚点
- 横向锚点

## 使用场景

在以下情况使用锚点
- 需要对较长内容进行快速定位时

如果出现以下情况，请勿使用锚点
- 需要查看的内容相对独立时，请改用[页签](/components/tabs/)

## API

### Anchor Props

| 属性 | 说明 | 类型 | 默认值 | 可选值 | 版本 |
| --- | --- | --- | --- | --- | --- |
| affix | 固定模式 | boolean | true | `true` `false` | 1.0.0 |
| bounds | 锚点区域边界 | number | 5 | - | 1.0.0
| dropdownStyle | 下拉面板的 style 属性(高级锚点有效) | CSSProperties | - |  | 1.0.0 |
| getContainer | 指定滚动的容器 | () => HTMLElement | () => window |  | 1.0.0 |
| getCurrentAnchor | 自定义高亮的锚点 | () => string | - |  | 1.0.0 |
| icon | 高级锚点显示图标 | ReactNode | - | - | 1.0.0
| lockedIcon | 自定义锁定图标：\[未锁定图标, 锁定后的图标]，为 false 时隐藏 | boolean \| \[ReactNode, ReactNode] | - |  | 1.0.0 |
| offsetTop | 距离窗口顶部达到指定偏移量后触发 | number |  |  | 1.0.0 |
| onChange | 监听锚点链接改变 | (currentActiveLink: string) => void | - |  | 1.0.0 |
| onClick | `click` 事件的 handler | function(e: Event, link: Object) | - |  | 1.0.0 |
| trigger | 触发行为(高级锚点有效)，可使用数组设置多个触发行为 | string \| string\[] | `hover` | `hover` \| `focus` \| `click` \| `contextMenu` | 1.0.0 |
| type | 锚点类型（类型为 `menu` 时只显示一级锚点） | string | `bookmarks` | `bookmarks` `menu` `advanced` | 1.0.0 |

### Link Props

| 成员 | 说明 | 类型 | 默认值 | 可选值 | 版本 |
| --- | --- | --- | --- | --- |
| href | 锚点链接 | string | - |  | 1.0.0 |
| title | 文字内容 | ReactNode | - |  | 1.0.0 |