---
category: Components
type: 录入
title: CityPicker
subtitle: 城市选择
order: 3
---

城市选择是一种选择城市的组件。

## 使用场景

需要选择城市时。

## API

| 属性 | 说明 | 类型 | 默认值 | 可选值 | 版本 |
| --- | --- | --- | --- | --- | --- |
| cityList | 城市列表数据 | `Record<CityGroups, Citys>` | - | - | 1.0.0 |
| className | 类名 | string | - | - | 1.0.0 |
| commons | 常用城市数据 | `Record<CityGroups, Array<Citys>>` | - | - | 1.0.0 |
| disabled | 禁用 | boolean | `false` | `true`、`false` | 1.0.0
| groups | 分组数据 | `Array<string>` | - | - | 1.0.0 |
| inputClassName | 输入框类名 | string | - | - | 1.0.0 |
| inputStyle | 输入框样式 | `React.CSSProperty` | - | - | 1.0.0 |
| placeholder | 输入框占位文字 | string | - | - | 1.0.0 |
| showTitle | 标题显示 | boolean | `true` | `true`、`false` | 1.0.0
| style | 样式 | `React.CSSProperty` | - | - | 1.0.0 |
| title | 标题 | string | - | - | 1.0.0 |

## CityGroups

| 属性 | 说明 | 类型 | 默认值 | 可选值 | 版本 |
| --- | --- | --- | --- | --- | --- |
| CityGroups | 城市类型 | - | - | `domestic`、`foreign` | 1.0.0 |

## Citys

| 属性 | 说明 | 类型 | 默认值 | 可选值 | 版本 |
| --- | --- | --- | --- | --- | --- |
| Citys | 根据关键字进行分组的城市组 | `[key: string]: Array<City>` | - | - | 1.0.0 |

## City
| 属性 | 说明 | 类型 | 默认值 | 可选值 | 版本 |
| --- | --- | --- | --- | --- | --- |
| id | 城市 Id | string | - | - | 1.0.0 |
| country | 国家 | string | - | - | 1.0.0 |
| province | 省份 | string | - | - | 1.0.0 |
| name | 城市名 | string | - | - | 1.0.0 |
