---
category: Components
type: 反馈
order: 4
title: Tooltip
subtitle: 文字提示
---

文字提示是一种显示内容帮助信息的气泡式弹出框。

## 使用场景

### 在以下情况下使用文字提示

- 解释图标按钮时使用。
- 文字显示不全时使用。
- 显示帮助信息时使用。

### 在以下情况请勿使用文字提示

帮助信息中包含判断操作时，建议使用气泡确认框。

## API

| 参数 | 说明     | 类型                         | 默认值 | 版本  |
| ---- | -------- | ---------------------------- | ------ | ----- |
| tip  | 提示文字 | ReactNode \| () => ReactNode | -      | 1.0.0 |

### 共享 API

以下为 Tooltip、Popconfirm、Dropdown 共享的 API。

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| arrow | 是否显示浮层小箭头 | boolean | true | 1.6.14 |
| defaultVisible | 默认显隐 | boolean | false | 1.0.0 |
| disabled | 是否禁用 | boolean | false | 1.0.0 |
| getPopupContainer | 浮层渲染父节点，默认渲染到 body 上 | function(locatorNode) | () => document.body | 1.0.0 |
| getTriggerElement | 触发显示浮层的元素, 默认就是定位元素 | function(locatorNode) | (locatorNode) => locatorNode | 1.0.0 |
| mouseEnterDelay | 延时显示浮层秒数 | number | 0.1 | 1.0.0 |
| mouseLeaveDelay | 延时隐藏浮层秒数 | number | 0.1 | 1.0.0 |
| popperClassName | 浮层类名 | string | - | 1.0.0 |
| popperStyle | 浮层样式 | object | - | 1.8.13 |
| popperOuterClassName | 浮层最外层类名 | string | - | 1.8.13 |
| popperOuterStyle | 浮层最外层样式 | object | - | 1.0.0 |
| placement | 浮层位置，可选 `top` `left` `right` `bottom` `topLeft` `topRight` `bottomLeft` `bottomRight` `leftTop` `leftBottom` `rightTop` `rightBottom` | string | `top` | 1.0.0 |
| scrollHidden | 滚动时浮层是否可关闭 | boolean | false | 1.0.0 |
| clickToClose | 点击浮层是否可关闭 | boolean | true | 1.0.0 |
| trigger | 触发行为，有 `hover` \| `focus` \| `click` \| `contextMenu` 四个行为可选，可使用数组设置多个触发行为 | string \| string\[] | `hover` | 1.0.0 |
| visible | 手动控制浮层显隐 | boolean | false | 1.0.0 |
| onVisibleChange | 显示隐藏的回调 | (visible) => void | - | 1.0.0 |
| autoPlacement | 溢出边界时改变 placement，默认镜向翻动 | boolean | true | 1.8.10 |
| autoPlacementList | 溢出边界时，placement 备选展示位置 [参考 popper](https://popper.js.org/docs/v2/modifiers/flip/) | placement\[] | - | 1.8.10 |
| customerModifiers | 自定义修饰符 [参考 popper](https://popper.js.org/docs/v2/modifiers/) | (modifiers: Partial<Modifier<any, any>>\[]) => Partial<Modifier<any, any>>\[] | - | 1.8.10 |

## Design Token

| 分类    | 组件 token                                | 全局 token                | 默认值  |
| ------- | ----------------------------------------- | ------------------------- | ------- |
| color   | --kd-c-tooltip-color-text                 | --kd-g-color-text-primary | #212121 |
|         | --kd-c-tooltip-color-background           | --kd-g-color-background   | #fff    |
| font    | --kd-c-tooltip-color-text                 | --kd-g-font-size-small    | 12px    |
| radius  | --kd-c-tooltip-radius-border              | --kd-g-radius-border      | 2px     |
| sizing  | --kd-c-tooltip-sizing-max-width           | -                         | 360px   |
| spacing | --kd-c-tooltip-spacing-padding-vertical   | -                         | 8px     |
|         | --kd-c-tooltip-spacing-padding-horizontal | -                         | 12px    |
