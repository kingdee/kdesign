---
category: Components
type: 表单
order: 9
title: Radio
subtitle: 单选
---

单选是一种在一组互斥的选项中进行选择的组件。包含 2 种类型：
单选项
单选框

## 何时使用
需要在一组互斥的选项进行选择时使用。


## API

### Radio

| 参数           | 说明                              | 类型                  | 默认值    | 版本   |
| -------------- | --------------------------------- | --------------------- | --------- | ------ |
| checked        | 指定当前是否选中                  | boolean               | false     | 1.0.0 |
| defaultChecked | 初始是否选中                      | boolean               | false     | 1.0.0 |
| disabled       | 禁用 Radio                        | boolean               | false     | 1.0.0 |
| radioType      | 单选类型                          | `default` \| `square` | `default` | 1.0.0 |
| value          | 根据 value 进行比较，判断是否选中 | any                   | -         | 1.0.0 |
| onChange | 选项变化时的回调函数 | function(e: Event) | - | 1.0.0 |


### RadioGroup

单选框组合，用于包裹一组 `Radio`。

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| defaultValue | 默认选中的值 | any | - | 1.0.0 |
| disabled | 禁选所有子单选器 | boolean | false | 1.0.0 |
| name | RadioGroup 下所有 `input[type="radio"]` 的 `name` 属性 | string | - | 1.0.0 |
| options | 以配置形式设置子元素 | string\[] \| Array&lt;{ label: string value: string disabled?: boolean }> | - | 1.0.0 |
| optionType | 用于设置 Radio `options` 类型 | `default` \| `square` \| `button` | `default` | 1.0.0 |
| size | 大小，只对按钮样式生效 | `large` \| `middle` \| `small` | - | 1.0.0 |
| value | 用于设置当前选中的值 | any | - | 1.0.0 |
| onChange | 选项变化时的回调函数 | function(e: Event, checkedValue) | - | 1.6.19 |

## 方法

### Radio

| 名称    | 描述     |
| ------- | -------- |
| blur()  | 移除焦点 |
| focus() | 获取焦点 |

## Design Token

| 分类 | 组件token | 全局token | 默认值 |
| --- | --- | --- | --- |
| color | --kd-c-radio-color-font | --kd-g-color-text-primary | #212121 |
|  | --kd-c-radio-color-theme | --kd-g-color-theme | #5582f3 |
|  | --kd-c-radio-color-border | --kd-g-color-border-strong | #d9d9d9 |
|  | --kd-c-radio-color-disabled | --kd-g-color-disabled | #b2b2b2 |
|  | --kd-c-radio-color-background-disabled | --kd-g-color-background-contain-disabled | #f5f5f5 |
|  | --kd-c-radio-color-border-disabled | --kd-g-color-border-strong | #d9d9d9 |
|  | --kd-c-radio-color-background | --kd-g-color-white | #fff |
| font | --kd-c-radio-font-size | --kd-g-font-size-small | 12px |
| radius | --kd-c-radio-radius-border-width | - | 1px |
| sizing | --kd-c-radio-square-sizing-width-height | - | 14px |
|  | --kd-c-radio-square-sizing-height | - | 32px |
|  | --kd-c-radio-default-label-max-width | - | - |
|  | --kd-c-radio-square-label-max-width | - | - |
|  | --kd-c-radio-button-label-max-width | - | - |
| spacing | --kd-c-radio-spacing-margin-right | - | 8px |
|  | --kd-c-radio-square-spacing-padding-vertical | - | 6px |
|  | --kd-c-radio-square-spacing-padding-horizontal | - | 12px |
|  | --kd-c-radio-spacing-padding-left | - | 4px |
