---
category: Components

type: 数据录入

order: 

title: input-number

subtitle: 数值输入框

---

用于数值输入的组件。<br/>
<img src="https://gitee.com/kingdee/kdesign/raw/main/kwc/image/input-number.png" referrerpolicy="no-referrer" width="400px" />

## API

| 属性           | 说明                                                         | 类型    | 默认值   | 版本  |
| -------------- | ------------------------------------------------------------ | ------- | -------- | ----- |
| label          | 标题                                                         |         | -        | 1.0.0 |
| name           | 数据提交标识                                                 | string  | -        | 1.0.0 |
| disabled       | 设置输入框禁用状态                                           | boolean | FALSE    | 1.0.0 |
| read-only      | 设置输入框只读状态                                           | boolean | FALSE    | 1.0.0 |
| required       | 设置是否必录                                                 | boolean | FALSE    | 1.0.0 |
| showclear      | 是否展示清除按钮                                             | boolean | FALSE    | 1.0.0 |
| value          | 输入框的值                                                   |         | -        | 1.0.0 |
| placeholder    | 输入框为空时的提示语                                         |         | -        | 1.0.0 |
| auto-complete  | 自动填充，可选值包括off、on                                  |         | off      | 1.0.0 |
| size           | 输入框的尺寸，可选值包括large、medium、small                 |         | medium   | 1.0.0 |
| state          | 反馈状态，可选值包括error、success                           |         | -        | 1.0.0 |
| message        | 反馈提示语，设置state时显示                                  |         | -        | 1.0.0 |
| label-position | 标题位置，可选值包括vertical、inline、hidden                 |         | vertical | 1.0.0 |
| variant        | 输入框的视觉样式变体，可选值包括underlined、outlined、borderless |         | outlined | 1.0.0 |
| min            | 允许输入的最小值                                             |         | -        | 1.0.0 |
| max            | 允许输入的最大值                                             |         | -        | 1.0.0 |
| precision      | 数值精度（小数点位数），0 表示仅允许输入整数                 |         | 0        | 1.0.0 |
| formatter      | 数值显示的格式                                               |         | -        | 1.0.0 |
| show-stepper   | 是否显示步进器                                               |         | FALSE    | 1.0.0 |
| stepper-style  | 步进器样式，可选值包括stepper、counter；设置为counter时variant始终为outlined |         | stepper  | 1.0.0 |
| step           | 步进器增减的步长值                                           |         | 1        | 1.0.0 |
| onfocus        | 获取焦点时触发                                               |         | -        | 1.0.0 |
| onblur         | 失去焦点时触发                                               |         | -        | 1.0.0 |
| onchange       | 值改变时触发                                                 |         | -        | 1.0.0 |

## 设计变量

设计变量与input一致。