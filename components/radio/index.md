---
category: Components
type: 录入
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
| onChange | 选项变化时的回调函数 | function(e:Event) | - | 1.0.0 |

## 方法

### Radio

| 名称    | 描述     |
| ------- | -------- |
| blur()  | 移除焦点 |
| focus() | 获取焦点 |
