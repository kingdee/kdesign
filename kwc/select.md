---
category: Components

type: 数据录入

order: 

title: select

subtitle: 选择器

---

用于从一组预设选项中选取单个值的下拉选择器。
<img src="https://gitee.com/kingdee/kdesign/raw/main/kwc/image/select.png" referrerpolicy="no-referrer" width="300px" />
## API

### select

| 属性           | 说明                                                         | 类型    | 默认值   | 版本  |
| -------------- | ------------------------------------------------------------ | ------- | -------- | ----- |
| label          | 标题                                                         |         | -        | 1.0.0 |
| name           | 数据提交标识                                                 | string  | -        | 1.0.0 |
| disabled       | 设置选择器禁用状态                                           | boolean | FALSE    | 1.0.0 |
| read-only      | 设置选择器只读状态                                           | boolean | FALSE    | 1.0.0 |
| required       | 设置是否必录                                                 | boolean | FALSE    | 1.0.0 |
| show-clear     | 是否展示清除按钮                                             | boolean | FALSE    | 1.0.0 |
| value          | 选择器的值                                                   |         | -        | 1.0.0 |
| defaultvalue   | 选择器的默认值                                               |         | -        | 1.0.0 |
| placeholder    | 选择器为空时的提示语                                         |         | -        | 1.0.0 |
| size           | 选择器的尺寸，可选值包括 large、medium、small                |         | medium   | 1.0.0 |
| state          | 反馈状态，可选值包括 error、success                          |         | -        | 1.0.0 |
| message        | 反馈提示语，设置state时显示                                  |         | -        | 1.0.0 |
| label-position | 标题位置，可选值包括vertical、inline、hidden                 |         | vertical | 1.0.0 |
| variant        | 输入框的视觉样式变体，可选值包括 underlined、outlined、borderless |         | outlined | 1.0.0 |
| options        | 选择器可选项                                                 |         | -        | 1.0.0 |
| loading        | 加载中状态                                                   | boolean | FALSE    | 1.0.0 |
| onfocus        | 获取焦点时触发                                               |         | -        | 1.0.0 |
| onblur         | 失去焦点时触发                                               |         | -        | 1.0.0 |
| onchange       | 值改变时触发                                                 |         | -        | 1.0.0 |

### options

| 属性     | 说明             | 类型    | 默认值 | 版本  |
| -------- | ---------------- | ------- | ------ | ----- |
| label    | 选项标题         |         | -      | 1.0.0 |
| value    | 选项值           |         | -      | 1.0.0 |
| disabled | 设置选项禁用状态 | boolean | FALSE  | 1.0.0 |

## 插槽

| 名称               | 说明                             | 版本  |
| ------------------ | -------------------------------- | ----- |
| dropdownBottomSlot | 自定义下拉面板底部插槽，始终显示 | 1.0.0 |

## 设计变量

### 触发器

触发器设计变量与input一致

### 下拉面板

| 类别       | Token名称                                            | 说明                         | 默认值                                   |
| ---------- | ---------------------------------------------------- | ---------------------------- | ---------------------------------------- |
| color      | --kdds-c-select-background-disabled                  | 输入框禁用态背景色           | var(--kdds-g-color-surface-container-2)  |
| color      | --kdds-c-select-background-read-only                 | 输入框只读态背景颜色         | var(--kdds-g-color-surface-container-1)  |
| color      | --kdds-c-select-item-color                           | 下拉面板选项的默认态文字颜色 | var(--kdds-g-color-on-surface-4)         |
| color      | --kdds-c-select-item-color-active                    | 下拉面板选项的点击态文字颜色 | var(--kdds-g-color-accent-1)             |
| color      | --kdds-c-select-item-color-selected                  | 下拉面板选项的已选态文字颜色 | var(--kdds-g-color-accent-1)             |
| color      | --kdds-c-select-item-background                      | 下拉面板选项的默认态背景色   | transparent                              |
| color      | kdds-c-select-item-background-hover                  | 下拉面板选项的悬停态背景色   | var(--kdds-g-color-surface-container-2)  |
| color      | --kdds-c-select-item-background-active               | 下拉面板选项的点击态背景色   | var(--kdds-g-color-surface-container-2)  |
| color      | --kdds-c-select-item-background-selected             | 下拉面板选项的已选态背景色   | var(--kdds-g-color-accent-container-5)   |
| color      | --kdds-c-select-item-background-disabled             | 下拉面板选项的禁用态背景色   | transparent                              |
| color      | --kdds-c-select-panel-background                     | 下拉面板背景                 | var(--kdds-g-color-surface-container-1)  |
| typography | --kdds-c-select-item-font-size-small                 | 小尺寸下拉面板选项文字字号   | var(--kdds-g-font-scale-2)               |
| typography | --kdds-c-select-item-line-height-small               | 小尺寸下拉面板选项文字行高   | var(--kdds-g-font-line-height-4)         |
| typography | --kdds-c-select-item-font-size-medium                | 中尺寸下拉面板选项文字字号   | var(--kdds-g-font-scale-3)               |
| typography | --kdds-c-select-item-line-height-medium              | 中尺寸下拉面板选项文字行高   | var(--kdds-g-font-line-height-5)         |
| typography | --kdds-c-select-item-font-size-large                 | 大尺寸下拉面板选项文字字号   | var(--kdds-g-font-scale-4)               |
| typography | --kdds-c-select-item-line-height-large               | 大尺寸下拉面板选项文字行高   | var(--kdds-g-font-line-height-4)         |
| spacing    | --kdds-c-select-item-padding-vertical                | 下拉面板选项的纵向间距       | var(calc(var(--kdds-g-spacing-2) + 1px)) |
| spacing    | --kdds-c-select-option-list-sizing-max-height-small  | 下拉面板最大高度280px        | 17.5rem                                  |
| spacing    | --kdds-c-select-option-list-sizing-max-height-medium | 下拉面板最大高度320px        | 20rem                                    |
| spacing    | --kdds-c-select-option-list-sizing-max-height-large  | 下拉面板最大高度340px        | 21.25rem                                 |
