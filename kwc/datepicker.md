---
category: Components

type: 数据录入

order: 

title: datepicker

subtitle: 日期选择器

---
<img src="https://gitee.com/kingdee/kdesign/raw/main/kwc/image/date-picker.png" referrerpolicy="no-referrer" width="300px" />
## API

| 属性           | 说明                                                      | 类型    | 默认值   | 版本  |
| -------------- | --------------------------------------------------------- | ------- | -------- | ----- |
| label          | 标题                                                      |         | -        | 1.0.0 |
| disabled       | 设置日期选择器禁用状态                                    |         | false    | 1.0.0 |
| read-only      | 设置日期选择器只读状态                                    | boolean | false    | 1.0.0 |
| required       | 设置日期选择器必录状态                                    | boolean | false    | 1.0.0 |
| show-clear     | 是否展示清除按钮                                          | boolean | false    | 1.0.0 |
| value          | 值                                                        |         | -        | 1.0.0 |
| defaultvalue   | 默认值                                                    |         | -        | 1.0.0 |
| placeholder    | 为空时的提示语                                            |         | -        | 1.0.0 |
| size           | 尺寸，可选值包括 large、medium、small                     |         | medium   | 1.0.0 |
| state          | 反馈状态，可选值包括 error、success                       |         | -        | 1.0.0 |
| message        | 反馈提示语，设置state时显示                               |         | -        | 1.0.0 |
| label-position | 标题位置，可选值包括vertical、inline、hidden              |         | vertical | 1.0.0 |
| variant        | 视觉样式变体，可选值包括 underlined、outlined、borderless |         | outlined | 1.0.0 |
| default-time   | 时间选择器默认值，当 value/defaultvalue 未设置值时有效    |         | 00:00:00 | 1.0.0 |
| name           | 数据提交标识                                              | string  | -        | 1.0.0 |
| type           | 输入框的类型，可选值包括 date、datetime                   |         | date     | 1.0.0 |
| onfocus        | 获取焦点时触发                                            |         | -        | 1.0.0 |
| onblur         | 失去焦点时触发                                            |         | -        | 1.0.0 |
| onChange       | 值改变时触发                                              |         | -        | 1.0.0 |

## 设计变量

### 触发器

触发器设计变量与input一致

### 日期选择面板

| 类别   | Token名称                                          | 说明                   | 默认值                                            |
| ------ | -------------------------------------------------- | ---------------------- | ------------------------------------------------- |
| color  | --kdds-c-datepicker-calendar-popup-background      | 日历面板背景色         | var(--kdds-g-color-neutral-base-100,#FFFFFF)      |
| color  | --kdds-c-datepicker-date-cells-background-disabled | 日期单元格禁用态背景色 | var(--kdds-g-color-neutral-base-96,#F5F5F5)       |
| color  | --kdds-c-datepicker-date-cells-background          | 日期单元格默认背景色   | var(--kdds-g-opacity-0,0)                         |
| color  | --kdds-c-datepicker-date-cells-background-hover    | 日期单元格悬停背景色   | var(--kdds-g-color-neutral-base-96,#F5F5F5)       |
| color  | --kdds-c-datepicker-date-cells-background-active   | 日期单元格选中背景色   | var(--kdds-g-color-accent-1,#5582F3)              |
| color  | --kdds-c-datepicker-text-label-color               | 文字默认颜色           | var(--kdds-g-color-on-surface-4,#212121)          |
| color  | --kdds-c-datepicker-text-label-color-hover         | 文字悬停颜色           | var(--kdds-g-color-on-surface-4,#212121)          |
| color  | --kdds-c-datepicker-text-label-color-active        | 文字选中颜色           | var(--kdds-g-color-neutral-base-100,#FFFFFF)      |
| color  | --kdds-c-datepicker-text-label-color-disabled      | 文字禁用颜色           | var(--kdds-g-color-neutral-base-70,#B2B2B2)       |
| color  | --kdds-c-datepicker-date-cells-other-month-color   | 非本月日期文本颜色     | var(--kdds-g-color-neutral-base-70,#B2B2B2)       |
| color  | --kdds-c-datepicker-time-cells-color               | 时间单元格默认背景色   | var(--kdds-g-opacity-0,0)                         |
| color  | --kdds-c-datepicker-time-cells-background-active   | 时间单元格选中背景色   | var(--kdds-g-color-accent-container-5,#F2F6FF)    |
| color  | --kdds-c-datepicker-time-cells-text-color-active   | 时间单元格选中文本颜色 | var(--kdds-g-color-accent-1,#5582F3)              |
| color  | --kdds-c-datepicker-header-background              | 头部区域背景色         | var(--kdds-g-color-neutral-base-98,#FAFAFA)       |
| color  | --kdds-c-datepicker-switch-color                   | 切换按钮默认色         | var(--kdds-g-color-on-surface-4,#212121)          |
| color  | --kdds-c-datepicker-switch-color-hover             | 切换按钮悬停色         | var(--kdds-g-color-accent-1,#5582F3)              |
| color  | --kdds-c-datepicker-switch-color-active            | 切换按钮点击色         | var(--kdds-g-color-accent-3,#3761CA)              |
| color  | --kdds-c-datepicker-selected-time-color            | 当前选择的时间默认色   | var(--kdds-g-color-on-surface-4,#212121)          |
| color  | --kdds-c-datepicker-icon-button-color              | 图标按钮默认色         | var(--kdds-g-color-on-surface-3,#666666)          |
| color  | --kdds-c-datepicker-icon-button-color-hover        | 图标切按钮悬停色       | var(--kdds-g-color-accent-1,#5582F3)              |
| color  | --kdds-c-datepicker-icon-button-color-active       | 图标按钮点击色         | var(--kdds-g-color-accent-3,#3761CA)              |
| color  | --kdds-c-datepicker-footer-background              | 底部区域背景色         | var(--kdds-g-color-neutral-base-100,#FFFFFF)      |
| color  | --kdds-c-datepicker-quick-date-color               | 快捷日期按钮默认色     | var(--kdds-g-color-on-surface-link-1,#0E5FD8)     |
| color  | --kdds-c-datepicker-quick-date-color-hover         | 快捷日期按钮悬停色     | var(--kdds-g-color-on-surface-link-2,#3987ed)     |
| color  | --kdds-c-datepicker-quick-date-color-disabled      | 快捷日期按钮禁用色     | var(--kdds-g-color-neutral-base-70,#B2B2B2)       |
| color  | --kdds-c-datepicker-quick-date-color-active        | 快捷日期按钮点击色     | var(--kdds-g-color-on-surface-link-3,#0041b0)     |
| color  | --kdds-c-datepicker-action-color                   | 操作按钮默认色         | var(--kdds-g-color-accent-1,#5582F3)              |
| color  | --kdds-c-datepicker-action-color-hover             | 操作按钮悬停色         | var(--kdds-g-color-accent-2,#87A9FF)              |
| color  | --kdds-c-datepicker-action-color-active            | 操作按钮点击色         | var(--kdds-g-color-accent-3,#3761CA)              |
| color  | --kdds-c-datepicker-action-color-disabled          | 操作按钮禁用色         | var(--kdds-g-color-accent-4,#B5CAFF)              |
| color  | --kdds-c-datepicker-item-divider-color             | 分割线颜色             | var(--kdds-g-color-neutral-base-85,#D9D9D9)       |
| border | --kdds-c-datepicker-calendar-popup-border-radius   | 日历面板圆角           | var(--kdds-g-radius-border-1,0.125rem)            |
| border | --kdds-c-datepicker-date-cells-border-radius       | 日期单元格圆角         | var(--kdds-g-radius-border-1,0.125rem)            |
| shadow | --kdds-c-datepicker-calendar-popup-shadow-bottom   | 日历面板投影           | var(--kdds-g-shadow-3,0 4px 15px rgba(0,0,0,0.1)) |
