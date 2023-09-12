---
category: Components
type: 导航
order: 4
title: Tabs
subtitle: 页签
---

页签是一种将多个大块内容进行分组和隐藏的组织方式

## 使用场景

当有多个大块并列内容，且可以被分组和隐藏时

1、当内容区块太少时，不适合使用页签，建议使用折叠面板

2、页签不太适合2个以上层级的展示，层级过多时可以考虑将内容重组/选择树形菜单

3、信息之间不应该存在对比或并行关系，否则用户会在便签之间不断切换

## API

### Tabs

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| activeKey | 当前激活tabs面板的key | string\|number | - | 1.0.0 |
| className | tabs 器类名 | string | - | 1.0.0 |
| defaultActiveKey | 默认激活的tabs面板的key | string\|number | - | 1.0.0 |
| disabled | 禁用，tabs的禁用是禁用所有选项 | boolean | false | 1.0.0 |
| effect | 内置走马灯的切换动效`scrollx`,`fade`,`none` | string | none | 1.0.0 |
| noContainer | 是否不展示内容部分 | boolean | false | 1.0.0 |
| position | tabs显示位置，目前只支持设置`left` | string | - | 1.0.0 |
| size | tabs的尺寸，可选值：`middle` `small` | string | middle | 1.0.0 |
| type | tabs的类型，可选值`line`,`card`,`grid`,`dynamic` | string | line | 1.0.0 |
| onChange | 变化时回调函数 | Function(id: string\|number, event: Event) |  | 1.0.0 |

### Tabs.TabPane

单个tab页签，被标签包裹的部分会当成内容进行渲染，如果没有内容则把tab传入的当做内容来渲染

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| className | tabs 器类名 | string | - | 1.0.0 |
| disabled | 禁用当前的页签，禁用的页签会移至末尾 | boolean | false | 1.0.0 |
| key | 对应 activeKey | string | - | 1.0.0 |
| specialPane | 用于插入图标的位置，仅在`type='dynamic'`时生效，可选值`left`,`right`,`contextMenu`，`contextMenu`是右键下拉菜单内容 | string | - | 1.0.0 |
| tab | 当前tab显示的内容 | React.ReactNode | - | 1.0.0 |

## Design Token

| 分类 | 组件token | 全局token | 默认值 |
| --- | --- | --- | --- |
| color | --kd-c-tabs-color-border | --kd-g-color-border-strong | #d9d9d9 |
|  | --kd-c-tabs-line-color-active | --kd-g-color-theme | #5582f3 |
|  | --kd-c-tabs-card-color-background | --kd-g-color-background-contain-disabled | #f5f5f5 |
|  | --kd-c-tabs-color-background-disabled | - | transparent |
|  | --kd-c-tabs-color-text | --kd-g-color-text-secondary | #666 |
|  | --kd-c-tabs-color-text-active | --kd-g-color-theme | #5582f3 |
|  | --kd-c-tabs-color-text-hover | --kd-g-color-theme | #5582f3 |
|  | --kd-c-tabs-color-text-disabled | --kd-g-color-disabled | #b2b2b2 |
| font | --kd-c-tabs-pane-font-size | --kd-g-font-size-middle | 14px |
| line-height | --kd-c-tabs-pane-height | - | 48px |
| motion | --kd-c-tabs-motion-timing-function | - | cubic-bezier(0.42, 0, 1, 1) |
|  | --kd-c-tabs-motion-duration | --kd-g-duration | 0.3s |
| sizing | --kd-c-tabs-sizing-height | - | 48px |
|  | --kd-c-tabs-sizing-border | - | 1px |
|  | --kd-c-tabs-pane-sizing-height | - | 48px |
|  | --kd-c-tabs-pane-type-line-sizing-height-small | - | 32px |
|  | --kd-c-tabs-pane-type-line-sizing-height-middle | - | 32px |
|  | --kd-c-tabs-pane-type-dynamic-sizing-height | - | 32px |
|  | --kd-c-tabs-pane-text-sizing-max-width | - | - |
| spacing | --kd-c-tabs-pane-line-paddinng-horizontal | - | 20px |
|  | --kd-c-tabs-pane-card-paddinng-horizontal | - | 18px |
|  | --kd-c-tabs-pane-grid-paddinng-horizontal | - | 20px |
