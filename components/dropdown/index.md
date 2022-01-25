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
| selectable | 菜单是否可选中 | boolean | false | 1.0.0 |
| onItemClick | 菜单点击事件 | (key: string) => void | - | 1.0.0 |

更多属性请参考 [Tooltip](/components/tooltip/#API)。

### Dropdown.Menu

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| defaultKey | 默认选中选项的Key | string \| number | - | 1.0.0 |
| selectable | 菜单是否可选中 | boolean | false | 1.0.0 |
| onClick | 菜单点击事件 | (key: string) => void | - | 1.0.0 |

### Dropdown.Item

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| danger | 是否是危险菜单 | boolean | false | 1.0.0 |
| divided | 是否是分隔菜单 | boolean | false | 1.0.0 |
| disabled | 菜单是否禁用 | boolean | false | 1.0.0 |
| key | 唯一的`key`属性 | string \| number | - | 1.0.0 |