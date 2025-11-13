---
category: Components

type: 布局

order: 

title: layout

subtitle: 布局

---

布局是一种结构模板，通过定义视觉网格、间距和区域，确保应用程序之间的一致性。内容应放置于 layout-item内，只有 layout-item 可以作为 layout 的直接元素。<br/>
<img src="https://gitee.com/kingdee/kdesign/raw/main/kwc/image/layout.png" referrerpolicy="no-referrer" width="800px" />

## API

### layout

| 属性             | 说明                                                      | 类型    | 默认值 | 版本  |
| ---------------- | --------------------------------------------------------- | ------- | ------ | ----- |
| horizontal-align | 水平对齐方式，可选值包括start、center、space、spread、end | String  | start  | 1.0.0 |
| multiple-rows    | 允许子项换行                                              | boolean | FALSE  | 1.0.0 |
| pull-to-boundary | 左右负间距贴边，可选值包括small、medium、large            | String  | -      | 1.0.0 |
| vertical-align   | 垂直对齐方式，可选值包括start、center、end、stretch       | String  | start  | 1.0.0 |

### layout-item

| 属性           | 说明                                                         | 类型   | 默认值 | 版本  |
| -------------- | ------------------------------------------------------------ | ------ | ------ | ----- |
| alignment-bump | 对齐偏移到指定方向，可选值包括left、top、right、bottom       | string | -      | 1.0.0 |
| flexibility    | 伸缩策略，可选值包括auto、shrink、no-shrink、grow、no-grow、no-flex；可组合使用，例如 'auto, no-shrink' | string | -      | 1.0.0 |
| size           | 响应式栅格，所有设备下占栅格数（1–24）                       | number | -      | 1.0.0 |
| xs             | 屏幕 < 576px 响应式栅格，可为栅格数或一个包含其他属性的对象  | number | -      | 1.0.0 |
| sm             | 屏幕 ≥ 576px 响应式栅格，可为栅格数或一个包含其他属性的对象  | number | -      | 1.0.0 |
| md             | 屏幕 ≥ 768px 响应式栅格，可为栅格数或一个包含其他属性的对象  | number | -      | 1.0.0 |
| lg             | 屏幕 ≥ 992px 响应式栅格，可为栅格数或一个包含其他属性的对象  | number | -      | 1.0.0 |
| xl             | 屏幕 ≥ 1200px 响应式栅格，可为栅格数或一个包含其他属性的对象 | number | -      | 1.0.0 |
| xxl            | 屏幕 ≥ 1600px 响应式栅格，可为栅格数或一个包含其他属性的对象 | number | -      | 1.0.0 |
| padding        | 内边距，可选值包括horizontal-small, horizontal-medium, horizontal-large, around-small, around-medium, around-large | string | -      | 1.0.0 |