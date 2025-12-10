---
category: Components

type: 数据录入

order: 

title: switch

subtitle: 开关

---

用于两个互斥选项，用来打开或关闭选项的选择控件。
<img src="https://gitee.com/kingdee/kdesign/raw/main/kwc/image/switch.png" referrerpolicy="no-referrer" width="300px" />
## API

| 属性            | 说明                                         | 类型    | 默认值   | 版本  |
| --------------- | -------------------------------------------- | ------- | -------- | ----- |
| label           | 标题                                         | string  | -        | 1.0.0 |
| label-position  | 标题位置，可选值包括vertical、inline、hidden |         | vertical | 1.0.0 |
| name            | 数据提交标识                                 | string  | -        | 1.0.0 |
| size            | 开关的尺寸，可选值包括large、medium、small   |         | medium   | 1.0.0 |
| checked         | 当前选中状态，受控属性                       | boolean | FALSE    | 1.0.0 |
| default-checked | 初始选中状态，用于非受控模式                 | boolean | FALSE    | 1.0.0 |
| disabled        | 设置开关是否禁用                             | boolean | FALSE    | 1.0.0 |
| loading         | 设置开关加载状态                             | boolean | FALSE    | 1.0.0 |
| onChange        | 值改变时触发                                 |         | -        | 1.0.0 |

## 设计变量

| 类别    | Token名称                                      | 说明                     | 默认值                                           |
| ------- | ---------------------------------------------- | ------------------------ | ------------------------------------------------ |
| border  | --kdds-c-switch-track-border-radius            | 底部轨道圆角             | 100px                                            |
| border  | --kdds-c-switch-dot-border-radius              | 白色圆点圆角             | 100px                                            |
| border  | --kdds-c-switch-on-track-border-width-active   | 开-激活状态轨道宽度      | var(--kdds-g-sizing-border-2,2px)                |
| border  | --kdds-c-switch-off-track-border-width-active  | 关-激活状态轨道宽度      | var(--kdds-g-sizing-border-2,2px)                |
| color   | --kdds-c-switch-dot-color                      | 圆点默认颜色             | var(--kdds-g-color-on-surface-inverse-1,#FFFFFF) |
| color   | --kdds-c-switch-on-track-border-active         | 开-激活状态轨道边框颜色  | var(--kdds-g-color-accent-1,#5582F34D)           |
| color   | --kdds-c-switch-off-track-border-active        | 关-激活状态轨道边框颜色  | var(--kdds-g-color-on-surface-1,#B2B2B24D)       |
| color   | --kdds-c-switch-on-track-color                 | 开-轨道默认颜色          | var(--kdds-g-color-accent-1, #5582F3)            |
| color   | --kdds-c-switch-on-track-color-hover           | 开-轨道悬停颜色          | var(--kdds- g-color-accent-2, #87A9FF)           |
| color   | --kdds-c-switch-off-track-color-focus          | 开-轨道点击颜色          | var(--kdds-g-color-on-surface-1,#B2B2B2)         |
| color   | --kdds-c-switch-on-track-color-disabled        | 开-轨道禁用颜色          | var(--kdds-g-color-accent-4, #B5CAFF)            |
| color   | --kdds-c-switch-off-track-color                | 关-轨道默认颜色          | var(--kdds-g-color-on-surface-1,#B2B2B2)         |
| color   | --kdds-c-switch-off-track-color-hover          | 关-轨道悬停颜色          | var(--kdds-g-color-on-surface-2, #999999)        |
| color   | --kdds-c-switch-off-track-color-focus          | 关-轨道点击颜色          | var(--kdds-g-color-on-surface-1,#B2B2B2)         |
| color   | --kdds-c-switch-off-track-color-disabled       | 关-轨道禁用颜色          | var(--kdds-g-color-border-disabled-1,#D9D9D9)    |
| color   | --kdds-c-switch-on-loading-icon-color          | 开-加载动画图标颜色      | var(--kdds-g-color-accent-1, #5582F3)            |
| color   | --kdds-c-switch-off-loading-icon-color         | 关-加载动画图标颜色      | var(--kdds-g-color-on-surface-1,#B2B2B2)         |
| sizing  | --kdds-c-switch-track-sizing-width-small       | 小尺寸轨道宽度           | 2rem                                             |
| sizing  | --kdds-c-switch-track-sizing-height-small      | 小尺寸轨道高度           | 1rem                                             |
| sizing  | --kdds-c-switch-track-sizing-width-medium      | 中尺寸轨道宽度           | 2.5rem                                           |
| sizing  | --kdds-c-switch-track-sizing-height-medium     | 中尺寸轨道高度           | 1.25rem                                          |
| sizing  | --kdds-c-switch-track-sizing-width-large       | 大尺寸轨道宽度           | 3rem                                             |
| sizing  | --kdds-c-switch-track-sizing-height-large      | 大尺寸轨道高度           | 1.5rem                                           |
| sizing  | --kdds-c-switch-dot-sizing-width-small         | 小尺寸圆点宽度           | 0.875rem                                         |
| sizing  | --kdds-c-switch-dot-sizing-height-small        | 小尺寸圆点高度           | 0.875rem                                         |
| sizing  | --kdds-c-switch-dot-sizing-width-medium        | 中尺寸圆点宽度           | 1.125rem                                         |
| sizing  | --kdds-c-switch-dot-sizing-height-medium       | 中尺寸圆点高度           | 1.125rem                                         |
| sizing  | --kdds-c-switch-dot-sizing-width-large         | 大尺寸圆点宽度           | 1.375rem                                         |
| sizing  | --kdds-c-switch-dot-sizing-height-large        | 大尺寸圆点高度           | 1.375rem                                         |
| sizing  | --kdds-c-switch-dot-sizing-width-small-focus   | 小尺寸点击状态圆点宽度   | 1.125rem                                         |
| sizing  | --kdds-c-switch-dot-sizing-height-small-focus  | 小尺寸点击状态圆点高度   | 0.875rem                                         |
| sizing  | --kdds-c-switch-dot-sizing-width-medium-focus  | 中尺寸点击状态圆点宽度   | 1.375rem                                         |
| sizing  | --kdds-c-switch-dot-sizing-height-medium-focus | 中尺寸点击状态圆点高度   | 1.125rem                                         |
| sizing  | --kdds-c-switch-dot-sizing-width-large-focus   | 大尺寸点击状态圆点宽度   | 1.625rem                                         |
| sizing  | --kdds-c-switch-dot-sizing-height-large-focus  | 大尺寸点击状态圆点高度   | 1.375rem                                         |
| spacing | --kdds-c-switch-dot-padding-right-small        | 小尺寸圆点右间距         | 0.0625rem                                        |
| spacing | --kdds-c-switch-dot-padding-left-small         | 小尺寸圆点左间距         | 1.0625rem                                        |
| spacing | --kdds-c-switch-dot-padding-right-medium       | 中尺寸圆点右间距         | 0.0625rem                                        |
| spacing | --kdds-c-switch-dot-padding-left-medium        | 中尺寸圆点左间距         | 1.3125rem                                        |
| spacing | --kdds-c-switch-dot-padding-right-large        | 大尺寸圆点右间距         | 0.0625rem                                        |
| spacing | --kdds-c-switch-dot-padding-left-large         | 大尺寸圆点左间距         | 1.5625rem                                        |
| spacing | --kdds-c-switch-dot-padding-right-small-focus  | 小尺寸点击状态圆点右间距 | 0.0625rem                                        |
| spacing | --kdds-c-switch-dot-padding-left-small-focus   | 小尺寸点击状态圆点左间距 | 0.8125rem                                        |
| spacing | --kdds-c-switch-dot-padding-right-medium-focus | 中尺寸点击状态圆点右间距 | 0.0625rem                                        |
| spacing | --kdds-c-switch-dot-padding-left-medium-focus  | 中尺寸点击状态圆点左间距 | 1.0625rem                                        |
| spacing | --kdds-c-switch-dot-padding-right-large-focus  | 大尺寸点击状态圆点右间距 | 0.0625rem                                        |
| spacing | --kdds-c-switch-dot-padding-left-large-focus   | 大尺寸点击状态圆点左间距 | 1.3125rem                                        |