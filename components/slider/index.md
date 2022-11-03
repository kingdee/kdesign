---
category: Components
type: 表单
title: Slider
subtitle: 滑动输入
---

滑动条是一种允许用户从一系列值中进行选择的滑动型输入器
## 使用场景

## API

| 属性 | 说明 | 类型 | 默认值 | 可选值 | 版本 |
| --- | --- | --- | --- | --- | --- |
| defaultValue | 设置初始取值。当 `range` 为 false 时，使用 number，否则用 \[number, number] | number \| \[number, number] | 0 \| \[0, 0] |  | 1.0.0 |
| disabled | 值为 true 时，滑块为禁用状态 | boolean | false |  | 1.0.0 |
| dots | 是否只能拖拽到刻度上 | boolean | false |  | 1.0.0 |
| getPopupContainer | Tooltip 渲染父节点，默认渲染到 body 上 | (triggerNode) => HTMLElement | () => document.body |  | 1.6.12 |
| included | `marks` 不为空对象时有效，值为 true 时表示值为包含关系，false 表示并列 | boolean | true |  | 1.0.0 |
| marks | 刻度标记，key 的类型必须为 `number` 且取值在闭区间 \[min, max] 内，每个标签可以单独设置样式 | object | { number: ReactNode } or { number: { style: CSSProperties, label: ReactNode } } |  | 1.0.0 |
| max | 最大值 | number | 100 |  | 1.0.0 |
| min | 最小值 | number | 0 |  | 1.0.0 |
| range | 双滑块模式 | boolean \| [range](#range) | false |  | 1.0.0 |
| reverse | 反向坐标轴 | boolean | false |  | 1.0.0 |
| step | 步长，取值必须大于 0，并且可被 (max - min) 整除。当 `marks` 不为空对1.0.0象时，可以设置 `step` 为 null，此时 Slider 的可选值仅有 marks 标出来的部分 | number \| null | 1 |  | 1.0.0 |
| tipFormatter | Slider 会把当前值传给 `tipFormatter`，并在 Tooltip 中显示 `tipFormatter` 的返回值，若为 null，则隐藏 Tooltip | value => ReactNode \| null | IDENTITY |  | 1.0.0 |
| tooltipPlacement | 设置 Tooltip 展示位置。参考 [Tooltip](/components/tooltip/) | string | - |  | 1.0.0 |
| tooltipVisible | 值为 true 时，Tooltip 将会始终显示；否则始终不显示，哪怕在拖拽及移入时 | boolean | - |  | 1.0.0 |
| value | 设置当前取值。当 `range` 为 false 时，使用 number，否则用 \[number, number] | number \| \[number, number] | - |  | 1.0.0 |
| vertical | 值为 true 时，Slider 为垂直方向 | boolean | false |  | 1.0.0 |
| onAfterChange | 与 `onmouseup` 触发时机一致，把当前值作为参数传入 | (value) => void | - |  | 1.0.0 |
| onChange | 当 Slider 的值发生改变时，会触发 onChange 事件，并把改变后的值作为参数传入 | (value) => void | - |  | 1.0.0 |

## 方法

| 名称 | 描述 | 版本 |
| --- | --- | --- |
| blur() | 移除焦点 | 1.0.0 |
| focus() | 获取焦点 | 1.0.0 |

## Design Token

| 分类 | 组件token | 全局token | 默认值 |
| --- | --- | --- | --- |
| color | --kd-c-slider-trail-color-background | --kd-g-color-border-weak | #e5e5e5 |
|  | --kd-c-slider-track-color-background | --kd-g-color-theme | #5582f3 |
|  | --kd-c-slider-track-color-background-hover | --kd-g-color-theme-5 | rgb(135, 173, 255) |
|  | --kd-c-slider-track-color-background-hover | --kd-g-color-disabled | #b2b2b2 |
|  | --kd-c-slider-handle-color-border | --kd-g-color-theme | #5582f3 |
|  | --kd-c-slider-handle-color-border-hover | --kd-g-color-theme-5 | rgb(135, 173, 255) |
|  | --kd-c-slider-handle-color-border-hover | --kd-g-color-disabled | #b2b2b2 |
|  | --kd-c-slider-dot-color-border | --kd-g-color-theme | #5582f3 |
|  | --kd-c-slider-dot-color-border-actived | --kd-g-color-theme | #5582f3 |
|  | --kd-c-slider-dot-color-border-actived | --kd-g-color-disabled | #b2b2b2 |
|  | --kd-c-slider-mark-color-text | --kd-g-color-text-primary | #212121 |
|  | --kd-c-slider-mark-color-text-actived | --kd-g-color-text-primary-2 | rgba(255, 255, 255, 1) |
