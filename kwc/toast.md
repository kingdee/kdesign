---

category: Components

type: 反馈

order: 

title: toast

subtitle: 消息提示

---

用户操作后的一种反馈和确认机制。<br/>
<img src="https://youke1.picui.cn/s1/2025/11/04/690971e385d69.png" width="400px" />

## API

| 属性         | 说明                                                  | 类型   | 默认值  | 版本  |
| ------------ | ----------------------------------------------------- | ------ | ------- | ----- |
| message      | 消息内容                                              | string | -       | 1.0.0 |
| messageLinks | 设置内容超链接                                        | array  | -       | 1.0.0 |
| duration     | 自动关闭的延时，单位为秒，设为0时不自动关闭           | number | 3       | 1.0.0 |
| variant      | 消息的视觉样式变体，可选值包括error、warning、success | string | success | 1.0.0 |

## 设计变量

| 类别       | Token名称                              | 说明                 | 默认值                                          |
| ---------- | -------------------------------------- | -------------------- | ----------------------------------------------- |
| color      | --kdds-c-toast-color-success           | 成功状态文字颜色     | var(--kdds-g-color-success-1,#1BA854)           |
| color      | --kdds-c-toast-background-success      | 成功状态背景色       | var(--kdds-g-color-success-container-1,#DCFAE4) |
| color      | --kdds-c-toast-border-success          | 成功状态边框色       | var(--kdds-g-color-border-success-1,#A1E6B5)    |
| color      | --kdds-c-toast-color-warning           | 警告状态文字颜色     | var(--kdds-g-color-warning-1,#FF991C)           |
| color      | --kdds-c-toast-background-warning      | 警告状态背景色       | var(--kdds-g-color-warning-container-1,#FFF1D4) |
| color      | --kdds-c-toast-border-warning          | 警告状态边框色       | var(--kdds-g-color-border-warning-1,#FFE0A6)    |
| color      | --kdds-c-toast-color-error             | 失败状态文字颜色     | var(--kdds-g-color-error-1,#FB2323)             |
| color      | --kdds-c-toast-background-error        | 失败状态背景色       | var(--kdds-g-color-error-container-1,#FFDBE0)   |
| color      | --kdds-c-toast-border-error            | 失败状态边框色       | var(--kdds-g-color-border-error-1,#FFADB6)      |
| color      | --kdds-c-toast-link                    | 文本链接颜色         | var(--kdds-g-color-on-surface-link-1,#0E5FD8)   |
| color      | --kdds-c-toast-link-hover              | 文本链接悬停色       | var(--kdds-g-color-on-surface-link-2,#3987ED)   |
| color      | --kdds-c-toast-link-active             | 文本链接激活色       | var(--kdds-g-color-on-surface-link-3,#0041B0)   |
| typography | --kdds-c-toast-line-height             | 文字行高             | var(--kdds-g-font-lineheight-5,1.572)           |
| typography | --kdds-c-toast-font-size               | 文字大小             | var(--kdds-g-font-scale-3,0.875rem)             |
| typography | --kdds-c-toast-icon-font-size          | 图标字体大小         | var(--kdds-g-icon-sizing-3,1rem)                |
| border     | --kdds-c-toast-border-radius           | 边框圆角             | var(--kdds-g-spacing-2,0.25rem)                 |
| border     | --kdds-c-toast-border-width            | 边框宽度             | var(--kdds-g-sizing-border-1,1px)               |
| spacing    | --kdds-c-toast-prefixicon-margin-right | 前缀图标右外边距     | var(--kdds-g-spacing-4,0.5rem)                  |
| spacing    | --kdds-c-toast-padding-vertical        | 上下内边距           | var(--kdds-g-spacing-4,0.5rem)                  |
| spacing    | --kdds-c-toast-padding-horizontal      | 左右内边距           | calc(var(--kdds-g-spacing-5)-1px,0.75rem-1px)   |
| spacing    | --kdds-c-toast-gap                     | 组件之间的间距       | var(--kdds-g-spacing-6,1rem)                    |
| spacing    | --kdds-c-toast-viewport-gap            | 组件与窗口的最小宽度 | var(--kdds-g-spacing-4,0.5rem)                  |
| spacing    | --kdds-c-toast-close-margin-left       | 关闭按钮左外边距     | var(--kdds-g-spacing-5,0.75rem)                 |
| sizing     | --kdds-c-toast-sizing-min-width        | 最小宽度             | 17.5rem                                         |
| sizing     | --kdds-c-toast-sizing-max-width        | 最大宽度             | 62.5rem                                         |
| sizing     | --kdds-c-toast-sizing-max-height       | 最大高度             | 10rem                                           |