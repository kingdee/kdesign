---

category: Components

type: 基础

order: 3

title: button-menu

subtitle: 按钮菜单 

---

下拉菜单组件，用户点击按钮后会显示多个可操作的菜单项。<br>
<img src="https://gitee.com/kingdee/kdesign/raw/main/kwc/image/button-menu.png" referrerpolicy="no-referrer" width="300px" />

## API

### Button-menu

| 属性              | 说明                                                         | 类型    | 默认值   | 版本  |
| ----------------- | ------------------------------------------------------------ | ------- | -------- | ----- |
| label             | 按钮内显示的文本内容                                         |         | -        | 1.0.0 |
| icon-name         | 下拉图标                                                     |         | -        | 1.0.0 |
| type              | 按钮菜单类型，可选项有dropdown、split                        |         | dropdown | 1.0.0 |
| dropdown-disabled | 设置下拉菜单禁用状态                                         | boolean | FALSE    | 1.0.0 |
| button-disabled   | 当type为split时，设置主按钮禁用状态                          | boolean | FALSE    | 1.0.0 |
| loading           | 当type为split时，设置主按钮加载状态                          | boolean | FALSE    | 1.0.0 |
| menu-alignment    | 下拉菜单相对于按钮的对齐方式，可选项包括auto、left、right、center、bottom-left、bottom-right、bottom-center |         | auto     | 1.0.0 |
| title             | 下拉按钮悬浮提示语                                           |         | -        | 1.0.0 |
| size              | 按钮的尺寸，可选值包括large、medium、small                   |         | medium   | 1.0.0 |
| variant           | 按钮的视觉样式变体，可选值包括primary、secondary、text；text仅当type为dropdown时支持 |         | primary  | 1.0.0 |
| onclick           | 当type为split时，点击主按钮时触发                            |         | -        | 1.0.0 |

### Menu-item

| 属性       | 说明                               | 类型    | 默认值 | 版本  |
| ---------- | ---------------------------------- | ------- | ------ | ----- |
| disabled   | 设置菜单项禁用状态                 | boolean | FALSE  | 1.0.0 |
| loading    | 设置菜单项加载状态                 | boolean | FALSE  | 1.0.0 |
| prefixicon | 前缀图标                           |         | -      | 1.0.0 |
| label      | 菜单项显示的文本内容               |         | -      | 1.0.0 |
| value      | 选项值                             |         | -      | 1.0.0 |
| divider    | 菜单项的分割线，默认在菜单项的下方 | boolean | FALSE  | 1.0.0 |
| onclick    | 点击菜单项时触发                   |         | -      | 1.0.0 |

## 设计变量

| 类别       | Token名称                                                 | 说明                         | 默认值                                                       |
| ---------- | --------------------------------------------------------- | ---------------------------- | ------------------------------------------------------------ |
| color      | --kdds-c-button-menu-item-color                           | 选项的文字颜色               | var(--kdds-g-color-on-surface-4)                             |
| color      | --kdds-c-button-menu-item-background-hover                | 选项的悬停背景色             | var(--kdds-g-color-surface-container-2)                      |
| color      | --kdds-c-button-menu-item-background-active               | 选项按下背景色               | var(--kdds-g-color-surface-container-2)                      |
| color      | --kdds-c-button-menu-item-color-active                    | 选项的按下文字色             | var(--kdds-g-color-on-surface-link-2)                        |
| color      | --kdds-c-button-menu-item-divider-border                  | 选项的分隔线颜色             | var(--kdds-g-color-border-1)                                 |
| color      | --kdds-c-button-menu-item-color-disabled                  | 选项的禁用文字色             | var(--kdds-g-color-disabled-1)                               |
| color      | --kdds-c-button-menu-item-loading-color                   | 选项的加载图标颜色           | var(--kdds-g-color-accent-1)                                 |
| typography | --kdds-c-button-menu-item-font-size                       | 选项的字号                   | var(--kdds-g-font-scale-3)                                   |
| typography | --kdds-c-button-menu-item-line-height                     | 选项的行高                   | var(--kdds-g-font-lineheight-4)                              |
| border     | --kdds-c-button-menu-split-first-button-border-radius     | 同类集合按钮圆角值           | var(--kdds-g-radius-border-1) 0 0 var(--kdds-g-radius-border-1) |
| border     | --kdds-c-button-menu-split-second-button-border-radius    | 同类集合按钮圆角值           | 0 var(--kdds-g-radius-border-1) var(--kdds-g-radius-border-1) 0 |
| border     | ---kdds-c-button-menu-item-divider-border-width           | 选项分隔线高度               | 1px                                                          |
| spacing    | --kdds-c-button-menu-padding-horizontal-medium            | 中尺寸左右内边距             | var(--kdds-g-spacing-4)                                      |
| spacing    | --kdds-c-button-menu-padding-horizontal-large             | 大尺寸左右内边距             | var(--kdds-g-spacing-5)                                      |
| spacing    | --kdds-c-button-menu-padding-horizontal-small             | 小尺寸左右内边距             | var(--kdds-g-spacing-4)                                      |
| spacing    | --kdds-c-button-menu-item-padding-top                     | 选项的上内边距               | var(--kdds-g-spacing-4)                                      |
| spacing    | --kdds-c-button-menu-item-padding-right                   | 选项的右内边距               | var(--kdds-g-spacing-5)                                      |
| spacing    | --kdds-c-button-menu-item-icon-margin-right               | 选项图标的右侧外间距         | var(--kdds-g-spacing-2)                                      |
| sizing     | --kdds-c-button-menu-split-second-button-sizing-min-width | 同类集合按钮图标区域最小宽度 | 24px                                                         |
