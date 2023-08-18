---
category: Components
type: 导航
order: 2
title: Menu
subtitle: 导航菜单
---

导航菜单是一种能快速导航到目标页面的组件。

## 使用场景

需要引导用户查找功能，避免用户迷失时。

## API

### Menu

| 属性 | 说明 | 类型 | 默认值 | 可选值 | 版本 |
| --- | --- | --- | --- | --- | --- |
| additionalTools | 底部附加工具  | ReactNode  | - | - | 1.0.0 |
| theme | 菜单主题颜色 | string | `dark` | `light`  `dark` | 1.0.0 |
| mode | 菜单类型，支持垂直和内嵌模式 | string | `vertical` | `vertical` `inline` | 1.0.0 |
| collapsed | 菜单是否收起状态 | boolean | `false` | `true` `false` | 1.0.0 |
| accordion | 手风琴模式，仅在`mode='inline'`下有效  | boolean | `false` | `true` `false` | 1.5.0 |
| defaultOpenKeys | 初始展开的 SubMenu 菜单项 key 数组  | string[] | - | - | 1.0.0 |
| defaultSelectedKey | 初始选中的菜单项 | string | - | - | 1.0.0 |
| forceSubMenuRender | 在子菜单展示之前就渲染进 DOM | boolean | `false` | `true` `false` | 1.0.0 |
| inlineIndent | 菜单收起时的宽度 | number | `50` | - | 1.0.0 |
| openKeys | 当前展开的 SubMenu 菜单项 key 数组  | string[] | - | - | 1.0.0 |
| selectedKey | 当前选中的菜单项  | string | - | - | 1.0.0 |
| triggerSubMenuAction | SubMenu 展开/关闭的触发行为。内嵌模式固定为click，即该值设置只对垂直模式有效 | string | `hover` | `hover` `click` | 1.0.0 |
| onClick | 点击 MenuItem 时的回调  | function({ item, key, keyPath, domEvent })  | - | - | 1.0.0 |
| onOpenChange | SubMenu 展开/关闭的回调  | function(openKey: string)   | - | - | 1.0.0 |

### Menu.SubMenu

| 属性 | 说明 | 类型 | 默认值 | 可选值 | 版本 |
| --- | --- | --- | --- | --- | --- |
| disabled | 是否禁用 | boolean | `false` | `true` `false` | 1.0.0 |
| icon | 菜单图标 | ReactNode | - | - | 1.0.0 |
| key | item的唯一标识 | string \| number | - | - | 1.0.0 |
| popupClassName | 子菜单样式 | string | - | - | 1.0.0 |
| popupOffset | 子菜单偏移量(inline模式下无效) | \[number, number\] | 数组第一个元素值为left，第二个为top | - | 1.0.0 |
| title | 子菜单标题 | string | - | - | 1.0.0 |

### Menu.Item

| 属性 | 说明 | 类型 | 默认值 | 可选值 | 版本 |
| --- | --- | --- | --- | --- | --- |
| disabled | 是否禁用 | boolean | `false` | `true` `false` | 1.0.0 |
| icon | 菜单图标 | ReactNode | - | - | 1.0.0 |
| key | item的唯一标识 | string \| number | - | - | 1.0.0 |

## Design Token

| 分类 | 组件token | 全局token | 默认值 |
| --- | --- | --- | --- |
| color | --kd-c-menu-color-disabled | --kd-g-color-disabled | #b2b2b2 |
|  | --kd-c-menu-sub-color-text | - | rgba(255, 255, 255, 0.65) |
|  | --kd-c-menu-sub-color-text-hover | --kd-g-color-white | #fff |
|  | --kd-c-menu-sub-color-text-active | --kd-g-color-white | #fff |
|  | --kd-c-menu-sub-color-background | - | #121319 |
|  | --kd-c-menu-sub-inline-color-background | - | #1f212b |
|  | --kd-c-menu-inline-color-active | --kd-g-color-white | #fff |
|  | --kd-c-menu-color-background | - | #343848 |
|  | --kd-c-menu-light-color-text | --kd-g-color-text-primary | #212121 |
|  | --kd-c-menu-light-color-text-hover | --kd-g-color-text-primary | #212121 |
|  | --kd-c-menu-light-color-text-active | --kd-g-color-theme | #5582f3 |
|  | --kd-c-menu-light-color-background-hover | - | #f5f5f5 |
|  | --kd-c-menu-light-color-background-active | - | #e3ebff |
| font | --kd-c-menu-icon-font-size | --kd-g-font-size-xx-large | 20px |
| motion | --kd-c-menu-motion-duration | --kd-g-duration | 0.3s |
| sizing | --kd-c-menu-sizing-max-width | - | - |
|  | --kd-c-menu-sizing-min-width | - | 138px |
|  | --kd-c-menu-item-sizing-height | - | 50px |
| z-index | --kd-c-menu-z-index | --kd-g-z-index-dialog | 1050 |
