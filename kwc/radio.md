---

category: Components

type: 数据录入

order: 

title: radio

subtitle: 单选框

---

可构成单选框组，供用户选择的单个选项。<br/>
<img src="https://youke1.picui.cn/s1/2025/11/04/6909a30c0f06d.png" width="200px" />

## API

| 属性            | 说明                                                         | 类型    | 默认值 | 版本  |
| --------------- | ------------------------------------------------------------ | ------- | ------ | ----- |
| label           | 选项标题                                                     | string  | -      | 1.0.0 |
| checked         | 用于指定当前单选框是否选中，是一个受控属性（在 group 中使用时无效） | boolean | FALSE  | 1.0.0 |
| default-checked | 用于设置单选框的初始选中状态，是一个非受控属性。只在首次渲染时起作用（在 group 中使用时无效） | boolean | FALSE  | 1.0.0 |
| disabled        | 设置单选框禁用状态                                           | boolean | FALSE  | 1.0.0 |
| read-only       | 设置单选框只读状态                                           | boolean | FALSE  | 1.0.0 |
| value           | 选项值                                                       |         | -      | 1.0.0 |
| onchange        | 选中状态改变时触发                                           |         | -      | 1.0.0 |

## 设计变量

| 类别       | Token名称                                 | 说明           | 默认值                                   |
| ---------- | ----------------------------------------- | -------------- | ---------------------------------------- |
| color      | --kdds-c-radio-unselected-color           | 未选中默认颜色 | var(--kdds-g-color-on-surface-3,#666666) |
| color      | --kdds-c-radio-unselected-color-hover     | 未选中悬浮颜色 | var(--kdds-g-color-accent-1,#5582F3)     |
| color      | --kdds-c-radio-unselected-color-focus     | 未选中点击颜色 | var(--kdds-g-color-accent-3,#3761CA)     |
| color      | --kdds-c-radio-unselected-color-active    | 未选中选中颜色 | var(--kdds-g-color-accent-1,#5582F3)     |
| color      | --kdds-c-radio-unselected-color-disabled  | 未选中禁用颜色 | var(--kdds-g-color-disabled-1,#B2B2B2)   |
| color      | --kdds-c-radio-unselected-color-read-only | 未选中只读颜色 | var(--kdds-g-color-disabled-1,#B2B2B2)   |
| color      | --kdds-c-radio-selected-color             | 选中默认颜色   | var(--kdds-g-color-accent-1,#5582F3)     |
| color      | --kdds-c-radio-selected-color-disabled    | 选中禁用颜色   | var(--kdds-g-color-disabled-1,#B2B2B2)   |
| color      | --kdds-c-radio-selected-color-read-only   | 选中只读颜色   | var(--kdds-g-color-disabled-1,#B2B2B2)   |
| color      | --kdds-c-radio-color                      | 文字默认色     | var(--kdds-g-color-on-surface-4,#212121) |
| color      | --kdds-c-radio-color-hover                | 文字悬停色     | var(--kdds-g-color-on-surface-4,#212121) |
| color      | --kdds-c-radio-color-active               | 文字选中色     | var(--kdds-g-color-on-surface-4,#212121) |
| color      | --kdds-c-radio-color-disabled             | 文字禁用色     | var(--kdds-g-color-disabled-1,#B2B2B2)   |
| color      | --kdds-c-radio-color-read-only            | 文字只读色     | var(--kdds-g-color-on-surface-4,#212121) |
| border     | --kdds-c-radio-border-width               | 宽边宽度       | var(--kdds-g-sizing-border-1,0.0625rem)  |
| sizing     | --kdds-c-radio-unselected-sizing          | 外圆           | var(--kdds-g-icon-sizing-3,1rem)         |
| sizing     | --kdds-c-radio-selected-sizing            | 内圆           | var(--kdds-g-icon-sizing-2,0.75rem)      |
| typography | --kdds-c-radio-label-font-size            | 字体尺寸       | var(--kdds-g-font-scale-3，0.875rem)     |
| typography | --kdds-c-radio-label-font-line-height     | 字体行高       | var(--kdds-g-font-lineheight-5,1.571)    |
| spacing    | --kdds-c-radio-icon-padding-right         | 图标右内边距   | var(--kdds-g-spacing-4,0.5rem)           |
| spacing    | --kdds-c-radio-item-padding-right         | 选项右内边距   | var(--kdds-g-spacing-6,1rem)             |
| spacing    | --kdds-c-radio-padding-vertical           | 上下内边距     | var(--kdds-g-spacing-2,0.25rem)          |