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
| collapsed | 菜单是否收起状态 | boolean | `false` | `true` `false` | 1.0.0 |
| defaultOpenKeys | 初始展开的 SubMenu 菜单项 key 数组  | string[] | - | - | 1.0.0 |
| defaultSelectedKey | 初始选中的菜单项 | string | - | - | 1.0.0 |
| forceSubMenuRender | 在子菜单展示之前就渲染进 DOM | boolean | `false` | `true` `false` | 1.0.0 |
| inlineIndent | 菜单收起时的宽度 | number | `50` | - | 1.0.0 |
| mode | 菜单类型，支持垂直和内嵌模式 | string | `vertical` | `vertical` `inline` | 1.0.0 |
| openKeys | 当前展开的 SubMenu 菜单项 key 数组  | string[] | - | - | 1.0.0 |
| selectedKey | 当前选中的菜单项  | string | - | - | 1.0.0 |
| theme | 菜单主题颜色 | string | `dark` | `light`  `dark` | 1.0.0 |
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
