---
category: Components
type: 布局
order: 2
title: Layout
subtitle: 布局
---

页面布局是一种帮助内容进行有效排版的方式。通过不同布局方式的运用，确保页面有秩序的进行展示。

## 使用场景
需要构建页面整体布局时。

## 布局组件总览

- `Layout`：布局容器，可嵌套其他布局组件 和 `Layout` 本身，可以放在任何容器中。
- `Header`：顶部容器，自带默认样式，可嵌套任何元素，但只能放在 `Layout` 中。
- `Content`：内容容器，自带默认样式，可嵌套任何元素，但只能放在 `Layout` 中。
- `Footer`：底部容器，自带默认样式，可嵌套任何元素，但只能放在 `Layout` 中。
- `Sider`：侧边栏，自带默认样式和基本功能，可嵌套任何元素，但只能放在 `Layout` 中。

## API

### Layout, Header, Footer, Content

布局容器。

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| className | 容器类名 | string | - | 1.0.0 | 
| hasSider | 容器里是否有 `Sider` | boolean | - | 1.0.0 | 
| style | 容器样式 | CSSProperties | - | 1.0.0 | 

### Sider

侧边栏。

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| breakpoint | 响应式布局的[断点](/components/grid/#Col) | `xs` \| `sm` \| `md` \| `lg` \| `xl` | - | 1.0.0 | 
| className | 侧边栏类名 | string | - | 1.0.0 | 
| collapsed | 收起状态 | boolean | - | 1.0.0 | 
| collapsedWidth | 收缩宽度为0时会出现特殊`trigger` | number | 50 | 1.0.0 | 
| collapsible | 是否可收起 | boolean | false | 1.0.0 | 
| defaultCollapsed | 是否默认收起 | boolean | false | 1.0.0 | 
| reverseArrow | 翻转箭头方向，当 `Sider` 在右边时可用 | boolean | false | 1.0.0 | 
| style | 侧边栏样式 | CSSProperties | - | 1.0.0 | 
| theme | 主题色 | `light` \| `dark` | `dark` | 1.0.0 | 
| trigger | 自定义 `trigger`，设置为 null 时隐藏 trigger | ReactNode | - | 1.0.0 |
| width | 宽度 | number \| string | 200 | 1.0.0 | 
| zeroWidthTriggerStyle | 当 `collapsedWidth` 等于0时出现的trigger 的样式 | object | - | 1.0.0 | 
| onBreakpoint | 触发响应式布局[断点](/components/grid/#API)时的回调 | (broken) => {} | - | 1.0.0 | 
| onCollapse | 展开-收起时的回调函数 | (collapsed, type) => {} | - | 1.0.0 | 

#### breakpoint width

```javascript
{
  xs: '480px',
  sm: '600px',
  md: '1024px',
  lg: '1280px',
  xl: '1920px',
}
```

## Design Token

| 分类 | 组件token | 全局token | 默认值 |
| --- | --- | --- | --- |
| color | --kd-c-layout-body-color-background | --kd-g-color-background-2 | #f2f2f2 |
|  | --kd-c-layout-header-color-background | --kd-g-color-background | #fff |
|  | --kd-c-layout-header-color-text | --kd-g-color-text-primary | #212121 |
|  | --kd-c-layout-footer-color-background | --kd-g-color-background-2 | #f2f2f2 |
|  | --kd-c-layout-sider-color-background | - | #343848 |
|  | --kd-c-layout-trigger-color-background | - | #343848 |
|  | --kd-c-layout-trigger-color-text | --kd-g-color-white | #fff |
|  | --kd-c-layout-sider-color-background-light | --kd-g-color-background | #fff |
|  | --kd-c-layout-trigger-color-background-light | --kd-g-color-background | #fff |
|  | --kd-c-layout-trigger-color-text-light | --kd-g-color-text-primary | #212121 |
| sizing | --kd-c-layout-header-sizing-height | - | 52px |
|  | --kd-c-layout-trigger-sizing-height | - | 50px |
|  | --kd-c-layout-trigger-sizing-width | - | 36px |
|  | --kd-c-layout-trigger-sizing-height | - | 42px |
| spacing | --kd-c-layout-header-spacing-padding | - | 0 20px 0 35px |
|  | --kd-c-layout-footer-spacing-padding | - | 24px 50px |
