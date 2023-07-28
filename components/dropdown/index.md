---
category: Components
type: 导航
order: 1
title: Dropdown
subtitle: 下拉菜单
---

下拉菜单是一种向下弹出操作列表的组件。

## 使用场景

需要收纳一组操作命令时。

## API

属性如下

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| defaultKey | 默认选中选项的Key | string \| number | - | 1.0.0 |
| menu | 菜单 | `Dropdown.Menu` \| <br />Array&lt;{<br />label: string <br />key?: string <br />danger?: boolean <br />divided?: boolean <br />disabled?: boolean <br />href?: string <br />}> | - | 1.0.0 |
| menuAnimation | 菜单点击动画 | boolean | trigger为`contextMenu`时false，其它true | 1.7.19 |
| selectable | 菜单是否可选中 | boolean | false | 1.0.0 |
| selectedKey | 选中选项的Key | string \| number | - | 1.0.0 |
| onItemClick | 菜单点击事件 | (key: string) => void | - | 1.0.0 |

更多属性请参考 [Tooltip](/components/tooltip/#API)。

### Dropdown.Menu

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| onClick | 菜单点击事件 | (key: string) => void | - | 1.0.0 |

### Dropdown.Item

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| danger | 是否是危险菜单 | boolean | false | 1.0.0 |
| divided | 是否是分隔菜单 | boolean | false | 1.0.0 |
| disabled | 菜单是否禁用 | boolean | false | 1.0.0 |
| key | 唯一的`key`属性 | string \| number | - | 1.0.0 |

## Design Token

| 分类 | 组件token | 全局token | 默认值 |
| --- | --- | --- | --- |
| color | --kd-c-dropdown-item-color-background-hover | --kd-g-color-hover | #f5f5f5 |
|  | --kd-c-dropdown-item-color-text-active | --kd-g-color-theme | #5582f3 |
|  | --kd-c-dropdown-item-color-text-disabled | --kd-g-color-disabled | #b2b2b2 |
|  | --kd-c-dropdown-item-color-text-danger | --kd-g-color-error | #fb2323 |
|  | --kd-c-dropdown-item-color-background-danger-hover | --kd-g-color-error | #fb2323 |
|  | --kd-c-dropdown-item-color-text-hover | --kd-g-color-text-primary | #212121 |
|  | --kd-c-dropdown-divided-color-background | --kd-g-color-border-weak | #e5e5e5 |
|  | --kd-c-dropdown-menu-item-color-text | --kd-g-color-text-primary | #212121 |
|  | --kd-c-dropdown-menu-color-background | --kd-g-color-background | #fff |
| font | --kd-c-dropdown-font-size | --kd-g-font-size-small | 12px |
| sizing | --kd-c-dropdown-menu-sizing-min-width | - | 64px |
|  | --kd-c-dropdown-menu-sizing-max-width | - | 600px |
|  | --kd-c-dropdown-menu-sizing-max-height | - | 328px |
|  | --kd-c-dropdown-divided-sizing-height | - | 1px |
| spacing | --kd-c-dropdown-menu-spacing-padding-vertical | - | 4px |
|  | --kd-c-dropdown-item-spacing-padding-vertical | - | 7px |
|  | --kd-c-dropdown-item-spacing-padding-horizontal | - | 12px |
