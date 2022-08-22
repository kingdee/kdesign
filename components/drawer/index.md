---
category: Components
type: 数据展示
order: 5
title: Drawer
subtitle: 抽屉
---

抽屉是一种从界面边缘滑出的浮层面板。

## 使用场景

需要在当前流程中插入临时任务，且不希望离开当前页面时。
## API

| 属性 | 说明 | 类型 | 默认值 | 可选值 | 版本 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| closable | 是否显示右上角的关闭按钮 | boolean | true | - | 1.0.0 |
| closeIcon | 自定义关闭图标 | ReactNode | - | - | 1.0.0 |
| destroyOnClose | 关闭时销毁 Drawer 里的子元素 | boolean | false | - | 1.0.0 |
| disableScroll | Drawer挂载的HTML节点是否禁止的滚动，即添加 overflow: hidden | boolean | true | `true` `false` | 1.5.9 |
| footer | 页脚 | ReactNode | - | - | 1.0.0 |
| footerClassName | 页脚 className | string | - | - | 1.0.0 |
| footerStyle | 页脚 styles | CSSProperties | - | - | 1.0.0 |
| forceRender | 预渲染 Drawer 内元素 | boolean | false | - | 1.0.0 |
| getContainer | 指定 Drawer 挂载的 HTML 节点, false 为挂载在当前 dom, 自定义需要设置 position: relative | HTMLElement | `() => HTMLElement | Selectors | false | body` | - | 1.0.0 |
| headerClassName | 页眉 className | string | - | - | 1.0.0 |
| headerStyle | 页眉 styles | CSSProperties | - | - | 1.0.0 |
| keyboard | 是否支持键盘 esc 关闭 | boolean | true | - | 1.0.0 |
| mask | 是否显示遮罩 | boolean | true | - | 1.0.0 |
| maskClassName | 遮罩样式 | string | - | - | 1.0.0 |
| maskClosable | 点击蒙层是否允许关闭 | boolean | true | - | 1.0.0 |
| maskStyle | 遮罩 styles | CSSProperties | - | - | 1.0.0 |
| onClose | 关闭时的回调 | function(e) | - | - | 1.0.0 |
| placement | 抽屉方向 | top | `right | bottom | left | right` | - | 1.0.0 |
| title | 标题 | ReactNode | - | - | 1.0.0 |
| titleClassName | 标题 className | string | - | - | 1.0.0 |
| titleStyle | 标题 styles | CSSProperties | - | - | 1.0.0 |
| visible | Drawer 是否可见 | boolean | - | - | 1.0.0 |
| width | 宽度（placement 为 left/right 时有效，否则为 100%） | string \| number | 365 | - | 1.0.0 |
| zIndex | 设置 Drawer 的 z-index | string \| number | 1050 | - | 1.0.0 |

## Design Token

| 分类 | 组件token | 全局token | 默认值 |
| --- | --- | --- | --- |
| color | --kd-c-drawer-color-background | --kd-g-color-background | #fff |
|  | --kd-c-drawer-title-color-text | --kd-g-color-text-primary | #212121 |
|  | --kd-c-drawer-dividing-color-border | --kd-g-color-border-disabled | #ccc |
|  | --kd-c-drawer-close-icon-color-text | --kd-g-color-text-secondary | #666 |
| font | --kd-c-drawer-title-font-size | --kd-g-font-size-x-large | 18px |
|  | --kd-c-drawer-close-icon-font-size | --kd-g-font-size-large | 16px |
| sizing | --kd-c-drawer-body-max-height-vertical | - | 470px |
|  | --kd-c-drawer-dividing-sizing-width | - | 1px |
| spacing | --kd-c-drawer-header-sizing-padding-vertical | - | 12px |
|  | --kd-c-drawer-header-sizing-padding-horizontal | - | 16px |
|  | --kd-c-drawer-body-sizing-padding | - | 16px |
