---
category: Components
type: 表单
title: ColorPicker
subtitle: 颜色选择器
---

颜色选择器是一种允许用户选择色块或输入颜色色值的文本区域

## 使用场景

• 当用户需要设置对象颜色时

## API

| 属性 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- | --- |
| borderType | color-picker 输入框类型 | `underline` \| `bordered` | `bordered` | 1.7.0 |
| className | color-picker 输入框类名 | string | - | 1.7.0 |
| defaultOpen | 颜色面板展开配置 | boolean | false | 1.7.0 |
| defaultValue | 设置输入框的默认值，可以是十六进制、RGB 、HSB 、HSL 或者颜色英文名称 | string | - | 1.7.0 |
| disabled | 输入框禁用状态 | boolean | `false` | `true` `false` | 1.8.22 |
| format | 限制颜色选择器的输出格式，必须是 HEX、RGB 、HSB 、HSL 中的一种 | `HEX` \| `RGB` \| `HSB` \| `HSL` | `HEX` | 1.8.16 |
| functionalColor | 设置功能色色值，可以是十六进制、RGB 、HSB 、HSL 或者颜色英文名称 | string | - | 1.7.0 |
| functionalColorName | 设置功能色的名称 | string | #themeColor | 1.7.0 |
| historicalColor | 用户自定义的最近使用颜色，数组中支持十六进制、RGB 、HSB 、HSL 或者颜色英文名称，同时支持透明度，如:\['blue', '#0000FF', '#0000FFEE', 'RGB(0,0,255)', 'RGBA(0,0,200,0.5)', 'HSL(240,100%,50%)', 'HSLA(240,100%,50%,0.5)', 'HSB(240,100%,100%)', 'HSBA(240,100%,100%,0.5)'\] | string[] | - | 1.8.16 |
| panelFormatConfig | 配置颜色面板下拉颜色格式选项，**注意：default 的值必须是 show 中存在的值** | {show:('HEX' \| 'RGB' \| 'HSB' \| 'HSL')[], default:'HEX' \| 'RGB' \| 'HSB' \| 'HSL'} | { show: \['HEX', 'HSB', 'RGB', 'HSL'\], default: 'HEX' } | 1.8.16 |
| placeholder | 输入框内容为空时的输入提示 | string | # | 1.7.0 |
| popperClassName | 颜色选择面板的类名 | string | # | 1.8.21 |
| presetColor | 用户自定义的预设颜色，数组中支持十六进制、RGB 、HSB 、HSL 或者颜色英文名称，同时支持透明度，如:\['blue', '#0000FF', '#0000FFEE', 'RGB(0,0,255)', 'RGBA(0,0,200,0.5)', 'HSL(240,100%,50%)', 'HSLA(240,100%,50%,0.5)', 'HSB(240,100%,100%)', 'HSBA(240,100%,100%,0.5)'\] | string[] | - | 1.8.16 |
| pure | 纯色块模式 | boolean | false | 1.8.16 |
| switchName | 设置功能色开关的名称，**注意：如自定义的名称需支持国际化需要提供 internationalName** | { name: string; internationalName?: string } | { name: '跟随主题色'; internationalName:'followFunctionalColor' } | 1.7.0 |
| style | color-picker 输入框样式 | React.CSSProperties | - | 1.7.0 |
| showSwitch | 是否展示跟随功能色开关，**注意：设置了功能色才能显示跟随功能色开关** | boolean | false | 1.7.0 |
| showClear | 是否显示无颜色填充按钮 | boolean | true | 1.8.16 |
| showColorTransfer | 是否展示颜色格式转换下拉框及透明度输入框 | boolean | true | 1.7.0 |  |
| showPresetColor | 是否展示预设颜色 | boolean | true | 1.7.0 |
| showColorPickerBox | 是否展示拾色容器 | { showBox?: boolean; showHue?: boolean; showOpacity?: boolean } | { showBox: false, showHue: false, showOpacity: false } | 1.7.0 |
| suffixIcon | color-picker 输入框右侧图标(其中 rgbColor 为 RGB 格式的字符串，可以同步颜色选择面板的透明度) | (rgbColor: string) => React.ReactNode | - | 1.7.0 |
| prefixIcon | color-picker 输入框左侧图标(其中 rgbColor 为 RGB 格式的字符串，可以同步颜色选择面板的透明度) | (rgbColor: string) => React.ReactNode | - | 1.8.16 |
| value | 设置输入框的值，可以是十六进制、RGB 、HSB 、HSL 或者颜色英文名称 | string | - | 1.7.0 |
| visible | 手动控制面板显隐 | boolean | - | 1.7.35 |
| onChange | 输入框颜色值发生变化时触发的回调函数 | (inputValue: string, colorObj:{type: `HEX` \| `HSB` \| `RGB` \| `HSL`, value: string}) => void | - | 1.7.0 |
| onVisibleChange | 面板显隐的回调 | (visible: boolean) => void | - | 1.7.35 |

## ColorPickerInstance

| 属性 | 说明       | 类型           | 版本   |
| ---- | ---------- | -------------- | ------ |
| dom  | 输入框容器 | HTMLDivElement | 1.8.22 |

## Design Token

| 分类    | 组件 token                                                 | 全局 token              | 默认值             |
| ------- | ---------------------------------------------------------- | ----------------------- | ------------------ |
| color   | --kd-c-color-picker-panel-option-color-background-selected | --kd-g-color-theme-3    | rgb(227, 238, 255) |
| font    | --kd-c-color-picker-input-font-size                        | --kd-g-font-size-middle | 14px               |
|         | --kd-c-color-picker-panel-select-font-size                 | --kd-g-font-size-middle | 14px               |
|         | --kd-c-color-picker-panel-alpha-font-size                  | --kd-g-font-size-middle | 14px               |
| sizing  | --kd-c-color-picker-input-sizing-width                     | -                       | 230px              |
|         | --kd-c-color-picker-input-sizing-height                    | -                       | 28px               |
|         | --kd-c-color-picker-input-prefix-sizing-width              | -                       | 16px               |
|         | --kd-c-color-picker-input-prefix-line-sizing-width         | -                       | 1px                |
|         | --kd-c-color-picker-input-prefix-line-sizing-height        | -                       | 22.6px             |
|         | --kd-c-color-picker-input-prefix-sizing-height             | -                       | 16px               |
|         | --kd-c-color-picker-panel-sizing-width                     | -                       | 304px              |
|         | --kd-c-color-picker-panel-select-sizing-width              | -                       | 212px              |
|         | --kd-c-color-picker-panel-select-sizing-height             | -                       | 28px               |
|         | --kd-c-color-picker-panel-preset-sizing-width              | -                       | 16px               |
|         | --kd-c-color-picker-panel-preset-sizing-height             | -                       | 16px               |
|         | --kd-c-color-picker-panel-historical-sizing-width          | -                       | 16px               |
|         | --kd-c-color-picker-panel-historical-sizing-height         | -                       | 16px               |
| z-index | --kd-c-color-picker-panel-z-index                          | --kd-g-z-index-popper   | 1050               |
