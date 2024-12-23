---
category: Components
type: 表单
title: GeoZonePicker
subtitle: 行政区划
---

行政区划组件是一种选择国家和选择地区的组件。

## 使用场景

### 在以下情况下使用行政区划

需要选择国家和地区时。

### 如果出现以下情况，请勿使用行政区划

- 只需要选择城市时，使用城市选择。
- 只需要选择国家时，使用选择器。

## API

| 属性            | 说明                       | 类型          | 默认值 | 可选值      | 版本   |
| --------------- | -------------------------- | ------------- | ------ | ----------- | ------ |
| className       | 传入组件的自定义类名       | string        |        |             | 1.7.48 |
| disabled        | 禁用行政区划               | boolean       | false  |             | 1.7.48 |
| bordered        | 开启圆框，默认为下划线边框 | boolean       | false  | -           | 1.7.48 |
| countryList     | 国家列表                   | {code,name}[] | -      | -           | 1.7.48 |
| geoZoneData     | 行政区划数据               | string        | -      | -           | 1.7.48 |
| provinceGroup   | 省级区划分组               | string        | -      | -           | 1.7.48 |
| defaultCountry  | 默认选中国家               | string        | -      | -           | 1.7.48 |
| showSearch      | 国家面板是否展示搜索框     | boolean       | `true` | `           | 1.7.48 |
| onClear         | 清除回调                   | () => void    |        | -           | 1.7.48 |
| onChange        | 切换行政区划回调函数       | () => void    | -      | -           | 1.7.48 |
| onCountryChange | 切换国家回调函数           | string        | -      | -           | 1.7.48 |
| level           | 展示到指定的行政区划级别   | number        | 3      | `1` `2` `3` | 1.7.48 |


## Design Token

| 分类 | 组件token | 全局token | 默认值 |
| --- | --- | --- | --- |
| color | --kd-c-geo-zone-picker-color-text | --kd-g-color-text-primary | #212121 |
|  | --kd-c-geo-zone-picker-color-border | - | #949494 |
|  | --kd-c-geo-zone-picker-color-border-active | - | #0a48c4 |
|  | --kd-c-geo-zone-picker-color-border-hover | - | #0a48c4 |
|  | --kd-c-geo-zone-picker-color-border-disabled | --kd-g-color-disabled | #b2b2b2 |
|  | --kd-c-geo-zone-picker-dropdown-color-background | --kd-g-color-background | #fff |
|  | --kd-c-geo-zone-picker-highlight-color-text | - | #0a48c4 |
|  | --kd-c-geo-zone-picker-country-item-color-bg-active | - | #edf6ff |
|  | --kd-c-geo-zone-picker-country-item-color-bg-hover | - | #f5f5f5 |
| font | --kd-c-geo-zone-picker-font-size | - | 12px |
| line-height | --kd-c-geo-zone-picker-input-line-height | - | 16px |
| sizing | --kd-c-geo-zone-picker-sizing-height | - | 32px |
| z-index | --kd-c-geo-zone-picker-z-index | - | 1050 |
