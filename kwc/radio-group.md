---

category: Components

type: 数据录入

order: 

title: radio-group

subtitle: 单选框组

---

用于从多个选项中仅选择一项的单选框组。<br/>
<img src="https://gitee.com/kingdee/kdesign/raw/main/kwc/image/radio-group.png" referrerpolicy="no-referrer" width="400px" />

## API

| 属性           | 说明                                                    | 类型    | 默认值     | 版本  |
| -------------- | ------------------------------------------------------- | ------- | ---------- | ----- |
| label          | 单选组的标题                                            |         | -          | 1.0.0 |
| disabled       | 设置整组选项禁用状态，radio-group优先级高于radio        | boolean | FALSE      | 1.0.0 |
| read-only      | 设置整组选项只读状态，radio-group 优先级高于radio       | boolean | FALSE      | 1.0.0 |
| required       | 设置是否必录                                            | boolean | FALSE      | 1.0.0 |
| label-position | 标题位置，可选值包括vertical、inline、hidden            |         | vertical   | 1.0.0 |
| state          | 反馈状态，可选值包括error                               |         | -          | 1.0.0 |
| message        | 反馈提示语，设置state时显示                             |         | -          | 1.0.0 |
| value          | 当前选中的选项值                                        |         | -          | 1.0.0 |
| defaultvalue   | 默认选中的选项值                                        |         | -          | 1.0.0 |
| name           | 数据提交标识                                            | string  | -          | 1.0.0 |
| options        | 指定可选项配置数组                                      |         | -          | 1.0.0 |
| layout         | 选项布局方式，可选值包括vertical、horizontal            |         | horizontal | 1.0.0 |
| onchange       | 当 radio-group 中任何一个单选框的选中状态发生改变时触发 |         | -          | 1.0.0 |

## 设计变量

| 类别       | Token名称                                                   | 说明               | 默认值                                   |
| ---------- | ----------------------------------------------------------- | ------------------ | ---------------------------------------- |
| color      | --kdds-c-radio-group-field-label-color                      | 默认字体色         | var(--kdds-g-color-on-surface-4,#212121) |
| color      | --kdds-c-radio-group-required-indicator-color               | 必录图标颜色       | var(--kdds-g-color-on-error-1,#FB2323)   |
| color      | --kdds-c-radio-group-supporting-text-color-error            | 字体错误色         | var(--kdds-g-color-on-error-1,#FB2323)   |
| typography | --kdds-c-radio-group-field-label-font-size                  | 字体大小           | var(--kdds-g-font-scale-2,0.875rem)      |
| typography | --kdds-c-radio-group-field-label-line-height                | 字体行高           | var(--kdds-g-font-lineheight-4,1.5)      |
| typography | --kdds-c-radio-group-required-indicator-font-size           | 必录图标大小       | var(--kdds-g-icon-sizing-1,0.5rem)       |
| typography | --kdds-c-radio-group-supporting-text-font-size-error        | 字体大小           | var(--kdds-g-font-scale-2,0.875rem)      |
| typography | --kdds-c-radio-group-supporting-text-font-line-height-error | 字体行高           | var(--kdds-g-font-lineheight-4,1.5)      |
| spacing    | --kdds-c-radio-group-field-label-margin-bottom              | 下外边距           | var(--kdds-g-spacing-2, 0.25rem)         |
| spacing    | --kdds-c-radio-group-field-label-margin-top                 | 上外边距           | var(--kdds-g-spacing-1,0.125rem)         |
| spacing    | --kdds-c-radio-group-field-label-margin-right               | 水平标题下的右间距 | var(--kdds-g-spacing-4,0.5rem)           |