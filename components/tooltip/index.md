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
| onVisibleChange | 显示隐藏的回调 | (visible, reason:IReason, payload:IPayload) => void | - | 1.8.29 |
| autoPlacement | 溢出边界时改变 placement，默认镜向翻动 | boolean | true | 1.8.10 |
| autoPlacementList | 溢出边界时，placement 备选展示位置参考 placement | placement\[] | - | 1.8.10 |
| customerModifiers | 自定义修饰符 [参考 popper](https://popper.js.org/docs/v2/modifiers/) | (modifiers: Partial<Modifier<any, any>>\[]) => Partial<Modifier<any, any>>\[] | - | 1.8.10 |



# Ref
- 1.7.59 后对Tooltip进行了全面升级，ref也进行了升级，升级前需注意对DOM元素获取的变化

| 参数 | 说明 | 类型 | 版本 |
| --- | --- | --- | --- |
| dom | 弹窗DOM | HTMLElement \| null | 1.7.59 |
| triggerOpen | 内部弹窗开关方法 | (nextOpen: boolean, reason?: IReason, delay?: number, payload?: IPayload) => void | 1.8.29 |
| visible | 内部visible | boolean | 1.7.59 |
| subPopupRefs | 嵌套弹窗 Ref 集合 | - | 1.8.29 |


# onVisibleChange.IReason

- 其它组件:（如 `Dropdown` / `Select` / `DatePicker` / `ColorPicker` / `CityPicker` / `Cascader`）使用时也会触发 IReason，下列简称`其它组件`

| 参数             | 说明                                                     | 版本   |
| ---------------- | -------------------------------------------------------- | ------ |
| click            | 点击，仅在 placement 为 click 时出现                     | 1.8.28 |
| hover            | 悬停，仅在 placement 为 hover 时出现                     | 1.8.28 |
| focus            | 聚集，仅在 placement 为 focus 时出现                     | 1.8.28 |
| contextMenu      | 点击右键，仅在 placement 为 contextMenu 时出现           | 1.8.28 |
| clickToClose     | 再次次点击触发元素关闭，仅在 clickToClose 为 true 时出现 | 1.8.28 |
| clickOutside     | 点击外部关闭                                             | 1.8.28 |
| parentHidden     | 嵌套 tooltip 中，父级关闭                                | 1.8.28 |
| scroll           | 滚动导致的关闭，仅在 scrollHidden 为 true 时出现         | 1.8.28 |
| selectPopperItem | `其它组件` 选中弹窗选项触发关闭                          | 1.8.28 |
| keyEnter         | `其它组件` 点击回车或其它按键时触发关闭，payload中传入键名   | 1.8.29 |
| unknown          | 受控或其它情况值的改变                                   | 1.8.28 |

# onVisibleChange.IPayload
- payload 在触发条件为 clickOutside、otherEnter 时会传值
- 内部 clickOutside 触发条件： isPopper（弹窗本身）、isReference（触发元素） 、isSubPopper（嵌套弹窗） 均为false

| 参数 | 说明 | 版本 |
| --- | --- | --- |
| event | 事件 event | 1.8.29 |
| popperDom | 弹窗DOM，clickOutside时传值 | 1.8.29 |
| referenceDom | 触发元素DOM，clickOutside时传值 | 1.8.29 |
| subPopupRefs | 嵌套弹窗ref集合，clickOutside时传值 | 1.8.29 |
| enterKey | 触发键名，otherEnter时传值 | 1.8.29 |


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
