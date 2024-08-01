---
category: Components
type: 表单
order: 4
title: DatePicker
subtitle: 日期选择器
---

日期选择器是一种选择日期的控件。

## 使用场景

需要选择日期时。

## API

| 属性                | 说明                       | 类型                               | 默认值                 | 可选值 | 版本     |
|-------------------|--------------------------|----------------------------------|---------------------| --- |--------|
| allowClear        | 是否显示清除按钮                 | `boolean`                        | true                |  | 1.0.0  |
| autoFocus         | 自动获取焦点                   | `boolean`                        | false               |  | 1.0.0  |
| borderType        | 边框类型                     | `string`                         | `underline`         | `underline` `bordered` `none` | 1.0.0  |
| className         | 选择器 className            | `string`                         |                     |  | 1.0.0  |
| clearIcon         | 自定义的清除图标                 | `ReactNode`                      |                     |  | 1.0.0  |
| defaultOpen       | 默认弹层展开                   | `boolean`                        | false               |  | 1.0.0  |
| disabled          | 禁用                       | `boolean`                        | false               |  | 1.0.0  |
| disabledDate      | 不可选择的日期                  | `(date: DateType, info?: { panelType?: 'month' | 'quarter' | 'year' ;range?: 'start' | 'end' }) => boolean` |                     |  | 1.7.68  |
| dropdownClassName | 日历面板 className           | `string`                         |                     |  | 1.0.0  |
| format            | 展示的日期格式                  | `string`                         |                     |  | 1.0.0  |
| inputReadOnly     | 输入框只读                    | `boolean`                        | false               |  | 1.0.0  |
| open              | 控制弹层展开                   | `boolean`                        | false               |  | 1.0.0  |
| picker            | 按钮类型                     | `PickerMode`                     | `date`              | `time` \| `date` \| `week` \| `month` \| `quarter` \| `year` | 1.0.0  |
| placeholder       | 输入框提示文字                  | `string                          | [string, string]`   |  |        | 1.0.0 |
| popupStyle        | 日历面板样式                   | `CSSProperties`                  | {}                  |  | 1.0.0  |
| popupRef          | 日历面板ref                  | `Ref`                            | -                   |  | 1.0.0  |
| size              | 控件大小                     | `string`                         | `middle`            | `small` `middle` `large` | 1.0.0  |
| style             | 选择器样式                    | `CSSProperties`                  | {}                  |  | 1.0.0  |
| suffixIcon        | 自定义的选择框后缀图标              | `ReactNode`                      |                     |  | 1.0.0  |
| onOk              | 点击确定按钮的回调                | `() => void`                     |                     |  | 1.0.0  |
| onOpenChange      | 弹出日历和关闭日历的回调             | `(open) => void`                 |                     |  | 1.0.0  |
| onPanelChange     | 日历面板切换的回调                | `(value, mode) => void`          |                     |  | 1.0.0  |
| getPopupContainer | 日历面板浮层渲染父节点，默认渲染到 body 上 | function(locatorNode)            | () => document.body |  | 1.6.10 |
| cellRender | 自定义单元格的内容 | (current: DateType \| number, info: { <br>originNode: ReactElement<br>date?: DateType<br>panelType: 'time' \| 'date' \| 'week' \| 'month' \| 'quarter' \| 'year'<br>range?: 'start' \| 'end'<br>subType?: 'hour' \| 'minute' \| 'second' \| '12Hours' }) => React.ReactNode |  |  | 1.7.40 |

### DatePicker

| 属性               | 说明                   | 类型                                     | 默认值 | 可选值 | 版本   |
| ------------------ | ---------------------- | ---------------------------------------- | ------ | ------ | ------ |
| defaultPickerValue | 默认面板日期           | `Date`                                   |        |        | 1.0.0 |
| defaultValue       | 默认日期               | `Date`                                   |        |        | 1.0.0 |
| renderExtraFooter  | 在面板中添加额外的页脚 | `(mode) => React.ReactNode`              |        |        | 1.0.0 |
| value              | 日期                   | `Date`                                   |        |        | 1.0.0 |
| onChange           | 时间发生变化的回调     | `(date: Date, dateString: string)=>void` |        |        | 1.0.0 |

### DatePicker[picker=date]

| 属性           | 说明             | 类型      | 默认值       | 可选值         | 版本   |
| -------------- | ---------------- | --------- | ------------ | -------------- | ------ |
| format         | 日期格式         | `string`  | `YYYY-MM-DD` |                | 1.0.0 |
| showTime       | 日期时间选择功能 | `Object   | boolean`     | `picker[time]` |        | 1.0.0 |
| showToday      | 展示“今天”按钮   | `boolean` | false        |                | 1.0.0 |
| showWeekNumber | 展示周数         | `boolean` | false        |                | 1.0.0 |
| showWeeksTitle | 展示周           | `boolean` | true         |                | 1.0.0 |

### DatePicker[picker=week]

| 属性           | 说明     | 类型      | 默认值    | 可选值 | 版本   |
| -------------- | -------- | --------- | --------- | ------ | ------ |
| format         | 日期格式 | `string`  | `gggg-wo` |        | 1.0.0 |
| showWeekNumber | 展示周数 | `boolean` | false     |        | 1.0.0 |
| showWeeksTitle | 展示周   | `boolean` | true      |        | 1.0.0 |

### DatePicker[picker=month]

| 属性   | 说明     | 类型     | 默认值    | 可选值 | 版本   |
| ------ | -------- | -------- | --------- | ------ | ------ |
| format | 日期格式 | `string` | `YYYY-MM` |        | 1.0.0 |

### DatePicker[picker=quarter]

| 属性   | 说明     | 类型     | 默认值     | 可选值 | 版本   |
| ------ | -------- | -------- | ---------- | ------ | ------ |
| format | 日期格式 | `string` | `YYYY-QQQ` |        | 1.0.0 |

### DatePicker[picker=year]

| 属性   | 说明     | 类型     | 默认值 | 可选值 | 版本   |
| ------ | -------- | -------- | ------ | ------ | ------ |
| format | 日期格式 | `string` | `YYYY` |        | 1.0.0 |

### DatePicker[picker=time]

| 属性 | 说明 | 类型 | 默认值 | 可选值 | 版本 |
| --- | --- | --- | --- | --- | --- |
| disabledHours | 禁止选择部分小时选项 | `() => number[]` |  |  | 1.0.0 |
| disabledMinutes | 禁止选择部分分钟选项 | `(selectedHour: number) => number[]` |  |  | 1.0.0 |
| disabledSeconds | 禁止选择部分秒选项 | `(selectedHour: number, selectedMinute: number) => number[]` |  |  | 1.0.0 |
| format | 日期格式 | `string` | `HH:mm:ss` |  | 1.0.0 |
| hourStep | 小时选项间隔 | `number` | `1` |  | 1.0.0 |
| minuteStep | 分钟选项间隔 | `number` | `1` |  | 1.0.0 |
| secondStep | 秒选项间隔 | `number` | `1` |  | 1.0.0 |
| showNow | 展示“此刻”按钮 | `boolean` | false |  | 1.0.0 |
| use12Hours | 使用 12 小时制，为 true 时 format 默认为 h:mm:ss a | `boolean` | false |  | 1.0.0 |

### RangePicker

| 属性 | 说明 | 类型 | 默认值 | 可选值 | 版本 |
| --- | --- | --- | --- | --- | --- |
| allowEmpty | 允许部分选择 | `[boolean, boolean]` | `YYYY` |  | 1.0.0 |
| defaultPickerValue | 默认面板日期 | `[Date, Date]` |  |  | 1.0.0 |
| defaultValue | 默认日期 | `[Date, Date]` |  |  | 1.0.0 |
| disabled | 禁用 | `[boolean, boolean]` |  |  | 1.0.0 |
| separator | 分隔符 | `React.ReactNode\|string` |  |  | 1.0.0 |
| onChange | 待选日期发生变化的回调 | `(dates: [Date, Date], dateStrings: [string, string]) => void` |  |  | 1.0.0 |

### RangePicker[picker=time]

| 属性  | 说明                 | 类型      | 默认值 | 可选值 | 版本   |
| ----- | -------------------- | --------- | ------ | ------ | ------ |
| order | 始末时间是否自动排序 | `boolean` | true   |        | 1.0.0 |

## Design Token

| 分类 | 组件token | 全局token | 默认值 |
| --- | --- | --- | --- |
| color | --kd-c-date-picker-color-background-checked | --kd-g-color-theme | #5582f3 |
|  | --kd-c-date-picker-wrapper-color-background | --kd-g-color-background | #fff |
|  | --kd-c-date-picker-input-color | --kd-g-color-text-primary | #212121 |
|  | --kd-c-date-picker-input-color-placeholder | - | #f2f2f2 |
|  | --kd-c-date-picker-input-underline-color | - | #999 |
|  | --kd-c-date-picker-input-color-border | --kd-g-color-border-strong | #d9d9d9 |
|  | --kd-c-date-picker-input-color-disabled | --kd-g-color-disabled | #b2b2b2 |
|  | --kd-c-date-picker-input-color-background | --kd-g-color-white | #fff |
|  | --kd-c-date-picker-input-color-background-disabled | --kd-g-color-background-contain-disabled | #f5f5f5 |
|  | --kd-c-date-picker-input-color-focused | --kd-g-color-text-primary | #212121 |
|  | --kd-c-date-picker-icon-color | - | #d9d9d9 |
|  | --kd-c-date-picker-icon-color-hover | - | #999 |
|  | --kd-c-date-picker-clear-color-background | --kd-g-color-background | #fff |
|  | --kd-c-date-picker-clear-color-background-hover | --kd-g-color-theme-5 | rgb(135, 173, 255) |
|  | --kd-c-date-picker-clear-color-background-focused | --kd-g-color-theme | #5582f3 |
|  | --kd-c-date-picker-container-color | --kd-g-color-text-primary | #212121 |
|  | --kd-c-date-picker-container-color-border | --kd-g-color-border-weak | #e5e5e5 |
|  | --kd-c-date-picker-container-color-background | --kd-g-color-background-2 | #f2f2f2 |
|  | --kd-c-date-picker-footer-color-background | --kd-g-color-background | #fff |
|  | --kd-c-date-picker-bar-color-bg-active | --kd-g-color-theme | #5582f3 |
|  | --kd-c-date-picker-square-item-color-selected | --kd-g-color-theme-5 | rgb(135, 173, 255) |
|  | --kd-c-date-picker-range-item-color-bg | --kd-g-color-theme-1 | rgb(242, 248, 255) |
| font | --kd-c-date-picker-container-font-size | --kd-g-font-size-small | 12px |
|  | --kd-c-date-picker-panel-font-size | --kd-g-font-size-middle | 14px |
|  | --kd-c-date-picker-small-font-size | --kd-g-font-size-small | 12px |
|  | --kd-c-date-picker-middle-font-size | --kd-g-font-size-middle | 14px |
|  | --kd-c-date-picker-large-font-size | --kd-g-font-size-large | 16px |
| radius | --kd-c-date-picker-input-radius-border | --kd-g-radius-border | 2px |
|  | --kd-c-date-picker-panel-radius-border | --kd-g-radius-border | 2px |
| sizing | --kd-c-date-picker-sizing-width | - | 230px |
|  | --kd-c-date-picker-large-sizing-height | - | 36px |
|  | --kd-c-date-picker-middle-sizing-height | - | 30px |
|  | --kd-c-date-picker-small-sizing-height | - | 20px |
|  | --kd-c-date-picker-panel-header-sizing-height | - | 36px |
| spacing | --kd-c-date-picker-small-spacing-padding-vertical | - | 4px |
|  | --kd-c-date-picker-small-spacing-padding-horizontal | - | 9px |
|  | --kd-c-date-picker-middle-spacing-padding-vertical | - | 5px |
|  | --kd-c-date-picker-middle-spacing-padding-horizontal | - | 9px |
|  | --kd-c-date-picker-large-spacing-padding-vertical | - | 8px |
|  | --kd-c-date-picker-large-spacing-padding-horizontal | - | 9px |
|  | --kd-c-date-picker-suffix-spacing-margin-left | - | 10px |
| z-index | --kd-c-date-picker-panel-z-index | --kd-g-z-index-popper | 1050 |
