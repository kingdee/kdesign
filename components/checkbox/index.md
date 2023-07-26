---
category: Components
type: 表单
order: 2
title: Checkbox
subtitle: 多选
---

多选是在一组备选项中进行选择的组件。

## 何时使用

在一组备选项中进行多项选择时。

## API

### Checkbox

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| checkboxType | 复选类型 | `default` \| `square` | `default` | 1.0.0 |
| checked | 指定当前是否选中 | boolean | false | 1.0.0 |
| defaultChecked | 初始是否选中 | boolean | false | 1.0.0 |
| disabled | 禁用 Checkbox | boolean | false | 1.0.0 |
| indeterminate | 半选状态 | boolean | false | 1.0.0 |
| value | 在 CheckboxGroup 组内是唯一，根据 value 进行比较，判断是否选中 | any | - | 1.0.0 |
| onChange | 变化时回调 | function(e:Event) | - | 1.0.0 |

### Checkbox.Group

复选框组合，用于包裹一组 `Checkbox`。

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| checkboxType | 用于设置 Checkbox 的类型 | `default` \| `square` \| `button` | `default` | 1.0.0 |
| defaultValue | 默认选中的值 | string[] \| string | - | 1.0.0 |
| disabled | 禁选所有子选项 | boolean | false | 1.0.0 |
| name | CheckboxGroup 下所有 `input[type="checkbox"]` 的 `name` 属性 | string | - | 1.0.0 |
| options | 以配置形式设置子元素 | string\[] \| Array&lt;{ label: string value: string disabled?: boolean }> | - | 1.0.0 |
| size | 大小，只对按钮样式生效 | `large` \| `middle` \| `small` | - | 1.0.0 |
| value | 用于设置当前选中的值 | string[] | - | 1.0.0 |
| onChange | 选项变化时的回调函数 | function(checkedValue, e:Event) | - | 1.6.26 |

## Design Token

| 分类 | 组件token | 全局token | 默认值 |
| --- | --- | --- | --- |
| color | --kd-c-checkbox-color-theme | --kd-g-color-theme | #5582f3 |
|  | --kd-c-checkbox-color-text-primary | - | #212121 |
|  | --kd-c-checkbox-color-border | - | #d9d9d9 |
|  | --kd-c-checkbox-color-border-active | --kd-g-color-theme | #5582f3 |
|  | --kd-c-checkbox-color-text-hover | --kd-g-color-theme | #5582f3 |
|  | --kd-c-checkbox-default-input-icon-color | - | #fff |
|  | --kd-c-checkbox-square-input-icon-color | - | #fff |
|  | --kd-c-checkbox-color-background | --kd-g-color-background | #fff |
|  | --kd-c-checkbox-color-background-disabled | --kd-g-color-background-contain-disabled | #f5f5f5 |
|  | --kd-c-checkbox-color-border-disabled | --kd-g-color-border-disabled | #ccc |
|  | --kd-c-checkbox-color-text-disabled | --kd-g-color-disabled | #b2b2b2 |
|  | --kd-c-checkbox-default-color-background-disabled | - | #e5e5e5 |
|  | --kd-c-checkbox-default-color-background-disabled | - | #d9d9d9 |
| font | --kd-c-checkbox-font-size | --kd-g-font-size-small | 12px |
|  | --kd-c-checkbox-default-input-icon-font-size | - | 12px |
|  | --kd-c-checkbox-default-input-icon-font-size | - | 12px |
| motion | --kd-c-checkbox-motion-duration | --kd-g-duration | 0.3s |
| radius | --kd-c-checkbox-default-input-radius-border | - | 2px |
| sizing | --kd-c-checkbox-border-width | - | 1px |
|  | --kd-c-checkbox-default-input-sizing-height | - | 14px |
|  | --kd-c-checkbox-default-input-sizing-width | - | 14px |
|  | --kd-c-checkbox-default-input-border-width | - | 1px |
|  | --kd-c-checkbox-default-input-label-max-width | - | - |
|  | --kd-c-checkbox-square-triangle-sizing-height | - | 18px |
|  | --kd-c-checkbox-square-triangle-sizing-width | - | 18px |
|  | --kd-c-checkbox-default-indeterminate-sizing-square | - | 6px |
| spacing | --kd-c-checkbox-group-spacing-margin-right | - | 12px |
|  | --kd-c-checkbox-default-spacing-padding | - | 0 |
|  | --kd-c-checkbox-default-input-spacing-margin-right | - | 4px |
|  | --kd-c-checkbox-square-spacing-padding-horizontal | - | 7px |
|  | --kd-c-checkbox-square-spacing-padding-vertical | - | 12px |
