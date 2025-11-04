---

category: Components

type: 数据录入

order: 

title: checkbox-group

subtitle: 复选框组

---

用于实现单选或多选功能的复选框组。<br/>
<img src="https://youke1.picui.cn/s1/2025/11/04/690971d256ca4.png" width="300px" />
## API

| 属性           | 说明                                                       | 类型    | 默认值     | 版本  |
| -------------- | ---------------------------------------------------------- | ------- | ---------- | ----- |
| label          | 多选组的标题                                               |         | -          | 1.0.0 |
| disabled       | 设置整组选项禁用状态，checkbox-group优先级高于checkbox     | boolean | FALSE      | 1.0.0 |
| read-only      | 设置整组选项只读状态，checkbox-group 优先级高于checkbox    | boolean | FALSE      | 1.0.0 |
| required       | 设置是否必录                                               | boolean | FALSE      | 1.0.0 |
| label-position | 标题位置，可选值包括vertical、inline、hidden               |         | vertical   | 1.0.0 |
| state          | 反馈状态，可选值包括error                                  |         | -          | 1.0.0 |
| message        | 反馈提示语，设置state时显示                                |         | -          | 1.0.0 |
| value          | 当前选中的选项值                                           |         | -          | 1.0.0 |
| defaultvalue   | 默认选中的选项值                                           |         | -          | 1.0.0 |
| name           | 数据提交标识                                               | string  | -          | 1.0.0 |
| options        | 指定可选项配置数组                                         |         | -          | 1.0.0 |
| layout         | 选项布局方式，可选值包括vertical、horizontal               |         | horizontal | 1.0.0 |
| onchange       | 当 checkbox-group 中任何一个复选框的选中状态发生改变时触发 |         | -          | 1.0.0 |

## 设计变量

| 类别       | Token名称                                                    | 说明               | 默认值                                   |
| ---------- | ------------------------------------------------------------ | ------------------ | ---------------------------------------- |
| color      | --kdds-c-checkbox-group-field-label-color                    | 默认字体色         | var(--kdds-g-color-on-surface-4,#212121) |
| color      | --kdds-c-checkbox-group-required-indicator-color             | 必录图标颜色       | var(--kdds-g-color-on-error-1,#FB2323)   |
| color      | --kdds-c-checkbox-group-supporting-text-color-error          | 字体错误色         | var(--kdds-g-color-on-error-1,#FB2323)   |
| spacing    | --kdds-c-checkbox-group-field-label-margin-bottom            | 下外边距           | var(--kdds-g-spacing-2, 0.25rem)         |
| spacing    | --kdds-c-checkbox-group-field-label-margin-top               | 上外边距           | var(--kdds-g-spacing-1,0.125rem)         |
| spacing    | --kdds-c-checkbox-group-field-label-margin-right             | 水平标题下的右间距 | var(--kdds-g-spacing-4,0.5rem)           |
| typography | --kdds-c-checkbox-group-field-label-font-size                | 字体大小           | var(--kdds-g-font-scale-2,0.875rem)      |
| typography | --kdds-c-checkbox-group-field-label-line-height              | 字体行高           | var(--kdds-g-font-lineheight-4,1.5)      |
| typography | --kdds-c-checkbox-group-required-indicator-font-size         | 必录图标大小       | var(--kdds-g-icon-sizing-1,0.5rem)       |
| typography | --kdds-c-checkbox-group-supporting-text-font-size-error      | 字体大小           | var(--kdds-g-font-scale-2,0.875rem)      |
| typography | --kdds-c-checkbox-group-supporting-text-font-line-height-error | 字体行高           | var(--kdds-g-font-lineheight-4,1.5)      |