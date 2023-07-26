---
category: Components
type: 筛选
order: 6
title: Filter
subtitle: 过滤
---

过滤是一种通过设定过滤条件筛选数据的组件。
## 使用场景

需要从数据中查看符合条件的数据时。

## API

| 属性 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| conditions | 可筛选条件数据源 | [Condition](#Condition)[] | - | 1.0.0 |
| defaultSpread | 指定过滤面板默认展开状态 | boolean | - | 1.0.0 |
| defaultTabKey | 指定默认显示面板， 可选`condition` `scheme` | string | `condition` | 1.0.0 |
| defaultValue | 指定默认选中的条件 | [FilterValue](#FilterValue) | - | 1.0.0 |
| fields | 方案中可供编辑的字段 | [Field](#Field)[] | - | 1.0.0 |
| schemes | 方案列表 | [Scheme](#Scheme)[] | - | 1.0.0 |
| search | 搜索框的属性集 | [SearchProps](/components/search#API) | - | 1.0.0 |
| spread | 指定当前过滤面板的展开状态 | boolean | - | 1.0.0 |
| title | 过滤器的标题 | string | - | 1.0.0 |
| value | 指定当前选中的条件 | [FilterValue](#FilterValue) | - | 1.0.0 |
| getSchemeSettingMenu | 方案设置菜单 | (scheme: [Scheme](#Scheme)) => typeof [Dropdown.Menu](/components/dropdown#Dropdown.Menu) | - | 1.0.0 |
| onChange | 筛选条件改变时的回调 | (value: [FilterValue](#FilterValue), condition?: [Condition](#Condition), option?: [Option](#Option)) => void | - | 1.0.0 |
| onSchemeSave | 保存方案时的回调 | (scheme: [Scheme](#Scheme)) => void | - | 1.0.0 |
| onSpreadChange | 筛选面板收缩状态改变时的回调 | (spread: boolean) => void | - | 1.0.0 |

### Condition

```typescript
interface Condition {
  key: string
  label: string
  options: Option[]
  required?: boolean
  multiple?: boolean
  addition?: React.ReactNode
}
```

### Option

```typescript
type Option = {
  value?: string
  label?: string
  component?: React.ReactNode
}
```

### FilterValue

```typescript
type FilterValue = {
  [key: string]: string[] | Scheme
}
```

### Scheme

```typescript
interface Scheme {
  name?: string
  preset?: boolean
  items: SchemeItem[]
}
```

### SchemeItem

```typescript
interface SchemeItem {
  fieldName: string
  value: string
  operator: string
}
```

### Field

```typescript
interface Field {
  name: string
  label: string
  required?: boolean
  operators: React.ReactElement
  assignOptions: Record<string, React.ReactElement>
}
```

## Design Token

| 分类 | 组件token | 全局token | 默认值 |
| --- | --- | --- | --- |
| color | --kd-c-filter-header-title-color-text | --kd-g-color-text-primary | #212121 |
|  | --kd-c-filter-condition-label-color-text | --kd-g-color-text-third | #999 |
|  | --kd-c-filter-handle-color-text | --kd-g-color-ongoing | #276ff5 |
|  | --kd-c-filter-handle-color-background-spread | --kd-g-color-background-contain | #fafafa |
|  | --kd-c-filter-handle-color-border-spread | --kd-g-color-border-strong | #d9d9d9 |
|  | --kd-c-filter-body-color-background | --kd-g-color-background-contain | #fafafa |
|  | --kd-c-filter-body-color-border | --kd-g-color-border-strong | #d9d9d9 |
|  | --kd-c-filter-body-tabs-color-border | --kd-g-color-border-weak | #e5e5e5 |
|  | --kd-c-filter-body-tabs-item-color-text | --kd-g-color-text-third | #999 |
|  | --kd-c-filter-body-tabs-item-color-text-active | --kd-g-color-ongoing | #276ff5 |
| font | --kd-c-filter-header-title-font-size | --kd-g-font-size-large | 16px |
|  | --kd-c-filter-condition-label-font-size | --kd-g-font-size-middle | 14px |
|  | --kd-c-filter-handle-font-size | --kd-g-font-size-middle | 14px |
|  | --kd-c-filter-body-tabs-item-font-size | --kd-g-font-size-middle | 14px |
| sizing | --kd-c-filter-body-condition-label-width | - | - |
|  | --kd-c-filter-body-condition-option-max-width | - | - |
