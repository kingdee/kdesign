---
category: Components
type: 反馈
order: 1
title: Modal
subtitle: 提示弹窗
---

弹出框是一种无需离开页面，提供展示或操作的组件。

## 使用场景

在以下情况使用锚点

- 需要中断用户操作时使用。

在以下情况请勿使用弹出框

- 提示信息不需要中断用户当前操作时，建议使用消息提示。
- 带判断操作的信息不需要中断用户当前操作时，建议使用气泡确认框。

## API

| 属性 | 说明 | 类型 | 默认值 | 可选值 | 版本 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| body | 自定义渲染对话框内容 | ReactNode | - | - | 1.0.0 |
| bodyClassName | 对话框主体内容 className | string | - | - | 1.0.0 |
| bodyStyle | 对话框主体内容 style | CSSProperties | - | - | 1.0.0 |
| bounds | 拖拽边界 | {left?: number, top?: number, right?: number, bottom?: number} | - | - | 1.7.2 |
| cancelButtonProps | 取消按钮属性（可接收 Button 控件的所有属性） | ButtonProps | - | - | 1.0.0 |
| cancelText | 取消按钮文本 | string | 取消 | - | 1.0.0 |
| className | 传入反馈浮层组件的样式 | String | - | - | 1.0.0 |
| closable | 是否显示右上角的关闭按钮 | boolean | true | - | 1.0.0 |
| closeIcon | 自定义关闭按钮 | ReactNode | - | - | 1.0.0 |
| destroyOnClose | 关闭时销毁 Modal 里的子元素 | boolean | false | - | 1.0.0 |
| draggable | 是否可拖拽 | boolean | true | - | 1.0.0 |
| focusTriggerAfterClose | 对话框关闭后是否需要聚焦触发元素 | boolean | true | - | 1.0.0 |
| footer | 底部内容，当不需要默认底部按钮时，可以设为 footer={null} | ReactNode | - | - | 1.0.0 |
| footerBtnOrder | 确定取消按钮排列方式 | string | normal | ` normal | reverse ` | 1.0.0 |
| getContainer | 指定 Modal 挂载的 HTML 节点 | HTMLElement | `() => HTMLElement | Selectors | null | document.body` | - | 1.0.0 |
| height | 高度 | number | 340 | - | 1.0.0 |
| keyboard | 是否支持键盘 esc 关闭 | boolean | true | - | 1.0.0 |
| mask | 是否显示遮罩 | boolean | true | - | 1.0.0 |
| maskClassName | 遮罩样式 | string | - | - | 1.0.0 |
| maskClosable | 点击蒙层是否允许关闭 | boolean | true | - | 1.0.0 |
| maskStyle | 遮罩 styles | CSSProperties | - | - | 1.0.0 |
| okButtonProps | 确定按钮属性（可接收 Button 控件的所有属性） | ButtonProps | - | - | 1.0.0 |
| onDragStart | 开始拖拽的回调,如果返回`false`则不触发操作 | (event, data) => void \| false | - | - | 1.7.2 |
| onDrag | 拖拽时的回调,如果返回`false`则不触发操作 | (event, data) => void \| false | - | - | 1.7.2 |
| onDragStop | 拖拽结束时的回调,如果返回`false`则不触发操作 | (event, data) => void \| false | - | - | 1.7.2 |
| okText | 确定按钮文本 | string | 确定 | - | 1.0.0 |
| onCancel | 点击遮罩层或右上角叉或取消按钮的回调 | (evt?) => void | - | - | 1.0.0 |
| onOk | 点击确定回调 | (evt?) => void | - | - | 1.0.0 |
| showline | 是否显示分割线 | boolean | true | - | 1.0.0 |
| title | 标题 | ReactNode | - | - | 1.0.0 |
| titleIcon | 标题前面的显示 icon | ReactNode | - | - | 1.0.0 |
| visible | 对话框是否可见, 传入后由该值强控制弹窗显示 | boolean | - | - | 1.0.0 |
| width | 宽度 | number | 460 | - | 1.0.0 |

### Modal.method()

包括：

- `Modal.error`
- `Modal.warning`
- `Modal.confirm`

## Design Token

| 分类 | 组件token | 全局token | 默认值 |
| --- | --- | --- | --- |
| color | --kd-c-modal-color-text-primary | --kd-g-color-text-primary | #212121 |
|  | --kd-c-modal-color-text-secondary | --kd-g-color-text-secondary | #666 |
|  | --kd-c-modal-color-ongoing | --kd-g-color-ongoing | #276ff5 |
|  | --kd-c-modal-color-warning | --kd-g-color-warning | #ff991c |
|  | --kd-c-modal-color-error | --kd-g-color-error | #fb2323 |
|  | --kd-c-modal-footer-text-color | --kd-g-color-text-secondary | #666 |
|  | --kd-c-modal-body-text-color | --kd-g-color-text-primary | #212121 |
|  | --kd-c-modal-title-text-color | --kd-g-color-text-primary | #212121 |
|  | --kd-c-modal-color-border | --kd-g-color-border-strong-2 | #d9d9d9 |
|  | --kd-c-modal-color-theme-hover | --kd-g-color-theme-5 | rgb(135, 173, 255) |
|  | --kd-c-modal-color-theme-active | --kd-g-color-theme-7 | rgb(55, 92, 202) |
|  | --kd-c-modal-mask-color-background | - | rgba(55, 55, 55, 0.5) |
|  | --kd-c-modal-close-icon-color-text | - | #666666 |
|  | --kd-c-modal-title-icon-color-backround-ongoing | --kd-g-color-ongoing | #276ff5 |
|  | --kd-c-modal-title-icon-color-backround-warning | --kd-g-color-warning | #ff991c |
|  | --kd-c-modal-title-icon-color-backround-warning | --kd-g-color-warning | #ff991c |
| font | --kd-c-modal-footer-font-size | - | 14px |
|  | --kd-c-modal-body-font-size | - | 16px |
|  | --kd-c-modal-title-font-size | - | 18px |
| radius | --kd-c-modal-boeder-radius | - | 2px |
| shadow | --kd-c-modal-box-shadow | - | 0 4px 10px 0 rgba(0, 0, 0, 0.2) |
| sizing | --kd-c-modal-icon-circle-sizing | - | 6px |
|  | --kd-c-modal-sizing-border | - | 1px |
|  | --kd-c-modal-close-icon-font-size | - | 16px |
|  | --kd-c-modal-header-sizing-height | - | 50px |
|  | --kd-c-modal-footer-sizing-height | - | 50px |
| spacing | --kd-c-modal-footer-button-spacing | - | 12px |
|  | --kd-c-modal-title-icon-sizing-margin-right | - | 8px |
|  | --kd-c-modal-header-sizing-padding-horizontal | - | 20px |
|  | --kd-c-modal-header-sizing-padding-vertical | - | 0px |
|  | --kd-c-modal-body-sizing-padding | - | 20px |
| z-index | --kd-c-modal-z-index | --kd-g-z-index-dialog | 1050 |
